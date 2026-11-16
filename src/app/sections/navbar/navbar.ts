import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { LangToggle } from '../../shared/lang-toggle';
import { I18n } from '../../i18n/i18n';

const SECTIONS = ['home', 'story', 'weddings', 'schedule', 'details', 'travel', 'gallery', 'faq', 'gifts'] as const;

@Component({
  selector: 'app-navbar',
  imports: [LangToggle],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly w = WEDDING;
  protected readonly t = inject(I18n).t;
  protected readonly scrolled = signal(false);
  protected readonly open = signal(false);

  protected readonly links = computed(() =>
    SECTIONS.map((id) => ({ href: `#${id}`, label: this.t().nav[id] })),
  );

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
