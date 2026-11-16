import { Component, computed, inject } from '@angular/core';
import { I18n } from '../../i18n/i18n';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-travel',
  imports: [RevealDirective],
  templateUrl: './travel.html',
  styleUrl: './travel.css',
})
export class Travel {
  private readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  protected readonly guides = computed(() => this.i18n.w().travel);

  /** "+505 8926-8202" -> "tel:+50589268202" */
  protected tel(phone: string): string {
    return 'tel:' + phone.replace(/[^\d+]/g, '');
  }
}
