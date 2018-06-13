import { Injectable } from '@angular/core';
import { Animal } from '../models/animal.model';

import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  login(animal: Animal) {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }

  isLoggedOn(): boolean {
    return this.isAuthenticated;
  }

  checkUser(login, password) {
    // return this.
  }
}


