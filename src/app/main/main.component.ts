import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  title = 'app';
  constructor(
    private authService: AuthService,
    private location: Location
  ) {}
  logout() {
    this.authService.logout();
  }
  back() {
    this.location.back();
  }
}
