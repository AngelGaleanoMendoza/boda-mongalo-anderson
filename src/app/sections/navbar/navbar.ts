import { Component, HostListener, signal } from '@angular/core';
import { WEDDING } from '../../wedding.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly w = WEDDING;
  protected readonly scrolled = signal(false);
  protected readonly open = signal(false);

  protected readonly links = [
    { href: '#home', label: 'Home' },
    { href: '#story', label: 'Our Story' },
    { href: '#weddings', label: 'Weddings' },
    { href: '#schedule', label: 'Schedule' },
    { href: '#details', label: 'Details' },
    { href: '#travel', label: 'Travel' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#faq', label: 'FAQ' },
    { href: '#gifts', label: 'Registry' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  @HostListener('document:keydown.escape')
  close(): void {
    this.open.set(false);
  }

  toggle(): void {
    this.open.update((v) => !v);
  }
}
