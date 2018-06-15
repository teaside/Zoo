import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment.prod' 
import { Animal } from '../models/animal.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalService implements OnInit {

  public animals;
  
  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  ngOnInit() {

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

  getAnimals() {
    try{
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append("Authorization", "Bearer " + this.authService.getToken());
      let requestOptions = new RequestOptions({headers: header, params: new URLSearchParams} );
      return this.http.get(`${environment.apiUrl}/animals`, requestOptions);
    }
    catch(err) {
      console.log('err: ', err);
    }
  }
  

  getAnimalById (id: string) {
    try{
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append("Authorization", "Bearer " + this.authService.getToken());
      let requestOptions = new RequestOptions({headers: header, params: new URLSearchParams} );
      return this.http.get(`${environment.apiUrl}/animals/${id}`, requestOptions);
    }
    catch(err) {
      console.log('err: ', err);
    }
  }


  addAnimal(animal: Animal) {    
    try{
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append("Authorization", "Bearer " + this.authService.getToken());
      let requestOptions = new RequestOptions({headers: header, params: new URLSearchParams} );
      return this.http.post(`${environment.apiUrl}/animals/`, JSON.stringify(animal), requestOptions);
    } 
    catch(err) {
      console.log('err: ', err);
    }
  }


  updateAnimal(animal: Animal) {    
    try{
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append("Authorization", "Bearer " + this.authService.getToken());
      let requestOptions = new RequestOptions({headers: header, params: new URLSearchParams} );
      return this.http.put(`${environment.apiUrl}/animals/${animal.id}`, JSON.stringify(animal), requestOptions);
    } 
    catch(err) {
      console.log('err: ', err);
    }
  }


  deleteAnimal(id) {    
    try{
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append("Authorization", "Bearer " + this.authService.getToken());
      let requestOptions = new RequestOptions({headers: header, params: new URLSearchParams} );
      return this.http.delete(`${environment.apiUrl}/animals/${id}`, requestOptions);
    } 
    catch(err) {
      console.log('err: ', err);
    }
  }

  getAnimalByLogin (name: string) {
    try{
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append("Authorization", "Bearer " + this.authService.getToken());
      let requestOptions = new RequestOptions({headers: header, params: new URLSearchParams} );
      return this.http.get(`${environment.apiUrl}/animals/${name}`, requestOptions);
    }
    catch(err) {
      console.log('err: ', err);
    }
  }
}
