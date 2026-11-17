import { Component, computed, inject } from '@angular/core';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { I18n } from '../../i18n/i18n';

@Component({
  selector: 'app-gifts',
  imports: [Icon, RevealDirective],
  templateUrl: './gifts.html',
  styleUrl: './gifts.css',
})
export class Gifts {
  private readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  protected readonly gifts = computed(() => this.i18n.w().gifts);
}
