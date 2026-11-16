import { Component, inject, input } from '@angular/core';
import { I18n } from '../i18n/i18n';

/** "US Wedding" en inglés, "Boda US" en español (la sigla en mayúsculas, la palabra en cursiva). */
@Component({
  selector: 'app-wedding-label',
  template: `
    <span class="sr-only">{{ i18n.weddingName(code()) }}</span>
    <span aria-hidden="true">
      @if (i18n.t().codeFirst) {
        <b class="code">{{ code() }}</b> {{ i18n.t().wedding }}
      } @else {
        {{ i18n.t().wedding }} <b class="code code--after">{{ code() }}</b>
      }
    </span>
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class WeddingLabel {
  protected readonly i18n = inject(I18n);
  readonly code = input.required<string>();
}
