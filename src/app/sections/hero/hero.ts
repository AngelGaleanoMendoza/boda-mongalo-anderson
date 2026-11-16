import { Component, inject } from '@angular/core';
import { WEDDING_DATES } from '../../shared/format';
import { WeddingLabel } from '../../shared/wedding-label';
import { I18n } from '../../i18n/i18n';

@Component({
  selector: 'app-hero',
  imports: [WeddingLabel],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  private readonly i18n = inject(I18n);
  protected readonly w = this.i18n.w;
  protected readonly t = this.i18n.t;
  protected readonly weddings = WEDDING_DATES;
}
