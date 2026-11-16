import { Component } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-travel',
  imports: [RevealDirective],
  templateUrl: './travel.html',
  styleUrl: './travel.css',
})
export class Travel {
  protected readonly guides = WEDDING.travel;

  /** "+505 8926-8202" -> "tel:+50589268202" */
  protected tel(phone: string): string {
    return 'tel:' + phone.replace(/[^\d+]/g, '');
  }
}
