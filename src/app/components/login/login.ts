import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  user = this.authService.user;
  email = '';
  error = signal('');

  constructor() {}

  async login() {
    try {
      await this.authService.sendLoginLink(this.email);
      alert('Loginlink is verzonden naar je e-mailadres! (check de spamfolder)');
    } catch (err: any) {
      this.error.set(err.message);
    }
  }

  logout() {
    this.authService.logout();
  }
}
