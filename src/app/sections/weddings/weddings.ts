import { Component } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-weddings',
  imports: [RevealDirective],
  templateUrl: './weddings.html',
  styleUrl: './weddings.css',
})
export class Weddings {
  protected readonly t = WEDDING.twoWeddings;
}
