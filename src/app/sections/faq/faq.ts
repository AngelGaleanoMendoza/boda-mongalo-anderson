import { Component, computed, inject } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { I18n } from '../../i18n/i18n';

@Component({
  selector: 'app-faq',
  imports: [RevealDirective],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  private readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  protected readonly faqs = computed(() => this.i18n.w().faqs);
}
