import { Component, computed, inject } from '@angular/core';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { I18n } from '../../i18n/i18n';

@Component({
  selector: 'app-schedule',
  imports: [Icon, RevealDirective],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class Schedule {
  private readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  protected readonly w = this.i18n.w;
  protected readonly items = computed(() => this.i18n.w().schedule);
}
