import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { WEDDING_DATES } from '../../shared/format';
import { WeddingLabel } from '../../shared/wedding-label';
import { I18n } from '../../i18n/i18n';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

@Component({
  selector: 'app-countdown',
  imports: [WeddingLabel],
  templateUrl: './countdown.html',
  styleUrl: './countdown.css',
})
export class Countdown {
  private readonly now = signal(Date.now());
  private readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;

  /** Una cuenta regresiva por boda (EE. UU. y Nicaragua). */
  protected readonly events = computed(() =>
    WEDDING_DATES.map((wedding) => {
      const diff = wedding.date.getTime() - this.now();
      const ms = Math.max(diff, 0);
      const file = wedding.calendar + (this.i18n.lang() === 'es' ? '-es' : '');
      return {
        ...wedding,
        /** Evento con avisos (lo genera `npm run calendar`). */
        ics: `calendar/${file}.ics`,
        qr: `calendar/qr-${file}.svg`,
        /** true once the wedding day has passed. */
        married: diff <= 0,
        daysMarried: Math.floor(-diff / DAY),
        units: [
          Math.floor(ms / DAY),
          Math.floor((ms % DAY) / HOUR),
          Math.floor((ms % HOUR) / MINUTE),
          Math.floor((ms % MINUTE) / SECOND),
        ].map((value, i) => ({ value, label: this.t().units[i] })),
      };
    }),
  );

  constructor() {
    const id = setInterval(() => this.now.set(Date.now()), SECOND);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
