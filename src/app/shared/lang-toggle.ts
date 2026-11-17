import { Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n';

/** Botón EN | ES. Cambia toda la página de idioma. */
@Component({
  selector: 'app-lang-toggle',
  template: `
    <button
      type="button"
      class="lang"
      (click)="i18n.toggle()"
      [attr.aria-label]="i18n.t().switchTo"
      [attr.lang]="i18n.lang() === 'en' ? 'es' : 'en'"
    >
      <span [class.on]="i18n.lang() === 'en'">EN</span>
      <i aria-hidden="true"></i>
      <span [class.on]="i18n.lang() === 'es'">ES</span>
    </button>
  `,
  styles: `
    .lang {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 32px;
      padding: 0 12px;
      border: 1px solid currentColor;
      border-radius: 999px;
      background: transparent;
      color: inherit;
      font-family: var(--font-sans);
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.16em;
      cursor: pointer;
      opacity: 0.9;
    }
    .lang:hover {
      opacity: 1;
    }
    .lang span {
      opacity: 0.55;
      transition: opacity 0.2s var(--ease);
    }
    .lang span.on {
      opacity: 1;
      font-weight: 600;
    }
    .lang i {
      display: block;
      width: 1px;
      height: 12px;
      background: currentColor;
      opacity: 0.5;
    }
  `,
})
export class LangToggle {
  protected readonly i18n = inject(I18n);
}
