import { Component, computed, inject } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { WEDDING_DATES } from '../../shared/format';
import { RevealDirective } from '../../shared/reveal.directive';
import { WeddingLabel } from '../../shared/wedding-label';
import { I18n } from '../../i18n/i18n';

@Component({
  selector: 'app-save-the-date',
  imports: [RevealDirective, WeddingLabel],
  templateUrl: './save-the-date.html',
  styleUrl: './save-the-date.css',
})
export class SaveTheDate {
  private readonly i18n = inject(I18n);
  protected readonly w = this.i18n.w;
  protected readonly t = this.i18n.t;
  protected readonly weddings = WEDDING_DATES;
  protected readonly deadline = computed(() => this.i18n.longDate(WEDDING.rsvpDeadline));
}
