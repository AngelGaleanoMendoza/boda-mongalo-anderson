import { Component, inject } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { I18n } from '../../i18n/i18n';

@Component({
  selector: 'app-welcome',
  imports: [RevealDirective],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  private readonly i18n = inject(I18n);
  protected readonly w = this.i18n.w;
  protected readonly t = this.i18n.t;
}
