import { Injectable } from '@angular/core';
import { Animal } from '../models/animal.model';

import { Http, Headers, RequestOptions } from '@angular/http';
import { assertNotNull, isNull } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) {}

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/auth']);
  }
  
  login(email, userId, token) {
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('token', token);
  }
  getEmail():string{
    return sessionStorage.getItem('email');
  }
  getToken():string {
    return sessionStorage.getItem('token');
  }
  getuserId():string {
    return sessionStorage.getItem('userId');
  }

  isLogged(): boolean {
    return sessionStorage.getItem('token') !== null;
  }

}


