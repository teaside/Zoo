import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { environment } from '../../../environments/environment.prod' 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }

  createUser(user) {
    try{
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      console.log('user.email',user.email);
      return this.http.post(`${environment.apiUrl}/user`, JSON.stringify(user), new RequestOptions({headers: header}));
    }
    catch(err) {
      console.log('err: ', err);
    }
  }

  isEmailExists(email) {
    try{
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      return this.http.get(`${environment.apiUrl}/email/${email}`, new RequestOptions({headers: header}));
    }
    catch(err) {
      console.log('err: ', err);
    }
  }

  login(login) {
    try{
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      return this.http.post(`${environment.apiUrl}/login`, JSON.stringify(login), new RequestOptions({headers: header}));
    }
    catch(err) {
      console.log('err: ', err);
    }
  }
}
