import { Component, computed, inject } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { WeddingLabel } from '../../shared/wedding-label';
import { I18n } from '../../i18n/i18n';

@Component({
  selector: 'app-weddings',
  imports: [RevealDirective, WeddingLabel],
  templateUrl: './weddings.html',
  styleUrl: './weddings.css',
})
export class Weddings {
  private readonly i18n = inject(I18n);
  protected readonly ui = this.i18n.t;
  protected readonly t = computed(() => this.i18n.w().twoWeddings);
}
