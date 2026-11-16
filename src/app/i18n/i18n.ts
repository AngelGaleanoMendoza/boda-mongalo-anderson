import { Injectable, computed, effect, signal } from '@angular/core';
import { WEDDING, WeddingEvent } from '../wedding.config';
import { UI } from './ui';
import { CONTENT_ES } from './content-es';

export type Lang = 'en' | 'es';

/** Quita los tipos literales (`'Hola'` -> `string`) para que la traducción encaje. */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { readonly [K in keyof T]: Widen<T[K]> }
          : T;

/** Partes de `WEDDING` que tienen texto y se traducen. */
type TextKeys =
  | 'welcome'
  | 'introQuote'
  | 'story'
  | 'twoWeddings'
  | 'details'
  | 'travel'
  | 'faqs'
  | 'schedule'
  | 'gifts';

export type Content = Widen<Pick<typeof WEDDING, TextKeys>>;
export type Wedding = Content & Omit<typeof WEDDING, TextKeys>;
export type Ui = Widen<(typeof UI)['en']>;

// Error de compilación si al español le falta (o le sobra) algún texto de la interfaz.
const UI_ES_CHECK: Ui = UI.es;
void UI_ES_CHECK;

const STORAGE_KEY = 'wedding-lang';
const LOCALES: Record<Lang, string> = { en: 'en-US', es: 'es-NI' };

function savedLang(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'en' || v === 'es') return v;
  } catch {
    /* sin almacenamiento: usamos el idioma por defecto */
  }
  return 'en';
}

/** Idioma de la página. El botón EN | ES lo cambia y se recuerda en el navegador. */
@Injectable({ providedIn: 'root' })
export class I18n {
  readonly lang = signal<Lang>(savedLang());

  /** Datos de la boda con los textos en el idioma elegido. */
  readonly w = computed<Wedding>(() =>
    this.lang() === 'es' ? { ...WEDDING, ...CONTENT_ES } : WEDDING,
  );

  /** Textos de la interfaz en el idioma elegido. */
  readonly t = computed<Ui>(() => UI[this.lang()]);

  readonly locale = computed(() => LOCALES[this.lang()]);

  constructor() {
    effect(() => {
      const lang = this.lang();
      document.documentElement.lang = lang;
      document.title = this.t().docTitle;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* sin almacenamiento */
      }
    });
  }

  toggle(): void {
    this.lang.update((l) => (l === 'en' ? 'es' : 'en'));
  }

  /** "January 27, 2027" / "27 de enero de 2027", en la hora del lugar de la boda. */
  longDate(date: Date, timeZone: string = WEDDING.timeZone): string {
    return new Intl.DateTimeFormat(this.locale(), {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone,
    }).format(date);
  }

  /** Nombre accesible de una boda: "US Wedding" / "Boda US". */
  weddingName(code: string): string {
    const t = this.t();
    return t.codeFirst ? `${code} ${t.wedding}` : `${t.wedding} ${code}`;
  }
}

export type { WeddingEvent };
