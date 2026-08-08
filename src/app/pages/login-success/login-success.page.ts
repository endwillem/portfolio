import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login-success',
  imports: [],
  templateUrl: './login-success.page.html',
  styleUrl: './login-success.page.scss',
})
export class LoginSuccessPage {
  private authService = inject(AuthService);
}
