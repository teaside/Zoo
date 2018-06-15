import { Injectable } from '@angular/core';
import { Animal } from '../models/animal.model';

import { Http, Headers, RequestOptions } from '@angular/http';
import { assertNotNull, isNull } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logout() {
    sessionStorage.clear();
  }
  
  login(login, token) {
    sessionStorage.setItem('login', login);
    sessionStorage.setItem('token', token);
  }
  getToken():string {
    return sessionStorage.getItem('token');
  }

  isLogged(): boolean {
    return sessionStorage.getItem('token') !== null;
  }

}


