import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);

  email = '';
  error = '';
  user$ = this.authService.user$;

  constructor() {
    this.authService.user$.subscribe((user) => {
      console.log(user);
    });
  }

  async login() {
    try {
      await this.authService.sendLoginLink(this.email);
      alert('Loginlink is verzonden naar je e-mailadres! (check de spamfolder)');
    } catch (err: any) {
      this.error = err.message;
    }
  }

  logout() {
    this.authService.logout();
  }
}
