import { Component, computed, inject } from '@angular/core';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { WeddingLabel } from '../../shared/wedding-label';
import { I18n } from '../../i18n/i18n';

@Component({
  selector: 'app-venues',
  imports: [Icon, RevealDirective, WeddingLabel],
  templateUrl: './venues.html',
  styleUrl: './venues.css',
})
export class Venues {
  private readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  protected readonly details = computed(() => this.i18n.w().details);
}
