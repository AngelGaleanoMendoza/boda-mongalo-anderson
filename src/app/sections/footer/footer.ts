import { Component, inject } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { WEDDING_DATES } from '../../shared/format';
import { I18n } from '../../i18n/i18n';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly w = WEDDING;
  protected readonly t = inject(I18n).t;
  protected readonly date = WEDDING_DATES.map((w) => w.dateText).join(' · ');
}
