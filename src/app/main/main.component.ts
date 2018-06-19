import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  title = 'app';
  constructor(
    private authService: AuthService
  ) {}
  logout() {
    this.authService.logout();
  }
}
