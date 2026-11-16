import {
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { LangToggle } from '../../shared/lang-toggle';
import { I18n } from '../../i18n/i18n';

/**
 * Portada de entrada, animación y canción de fondo.
 * Los navegadores no permiten que una página suene sin que la persona toque algo,
 * así que la canción arranca al tocar "Open invitation" y sigue sonando,
 * en bucle, mientras se recorre la página.
 */
@Component({
  selector: 'app-music',
  imports: [LangToggle],
  templateUrl: './music.html',
  styleUrl: './music.css',
})
export class Music {
  private readonly i18n = inject(I18n);
  protected readonly w = this.i18n.w;
  protected readonly t = this.i18n.t;
  protected readonly introBackground =
    'linear-gradient(rgba(36, 43, 30, 0.72), rgba(36, 43, 30, 0.86)), url(images/hero-movil.jpg)';

  /** 'card' = portada con el botón · 'film' = animación · 'done' = página. */
  protected readonly stage = signal<'card' | 'film' | 'done'>('card');
  protected readonly leaving = signal(false);
  protected readonly videoSrc = signal('');

  protected readonly playing = signal(false);
  /** El navegador bloqueó el arranque: se pide tocar ▶. */
  protected readonly hint = signal(false);

  private readonly audio = viewChild.required<ElementRef<HTMLAudioElement>>('audio');

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('is-locked', this.stage() !== 'done');
    });
    inject(DestroyRef).onDestroy(() => this.audio().nativeElement.pause());
  }

  /** Toque en "Open invitation" o "Enter without music". */
  open(withMusic: boolean): void {
    if (withMusic) this.play();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      this.finish();
      return;
    }
    const portrait = window.innerHeight > window.innerWidth;
    const suffix = this.i18n.lang() === 'es' ? '-es' : '';
    this.videoSrc.set(`video/intro-${portrait ? 'portrait' : 'landscape'}${suffix}.mp4`);
    this.stage.set('film');
  }

  /** Al terminar (o saltar) la animación, se desvanece y aparece la página. */
  finish(): void {
    if (this.leaving()) return;
    this.leaving.set(true);
    setTimeout(() => this.stage.set('done'), 700);
  }

  toggle(): void {
    if (this.playing()) this.audio().nativeElement.pause();
    else this.play();
  }

  /** Eventos del elemento <audio>: el botón refleja lo que de verdad está sonando. */
  protected onPlaying(): void {
    this.playing.set(true);
    this.hint.set(false);
  }

  protected onPaused(): void {
    this.playing.set(false);
  }

  private play(): void {
    this.audio()
      .nativeElement.play()
      .catch(() => this.hint.set(true));
  }
}
