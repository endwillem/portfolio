import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login';
@Component({
  selector: 'app-home',
  imports: [LoginComponent],
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {}
