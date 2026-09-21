import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // Optioneel: pas de naam/tabs aan naar wens
  buttons = [
    { label: 'home', path: '/home' },
    { label: 'contact', path: '/contact' },
  ];
}
