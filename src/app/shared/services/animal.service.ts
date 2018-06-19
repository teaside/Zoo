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


  createUser(login) {
    try{
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      return this.http.post(`${environment.apiUrl}/user`, JSON.stringify(login), new RequestOptions({headers: header}));
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

  getAnimals() {
    try{
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append("Authorization", "Bearer " + this.authService.getToken());
      let requestOptions = new RequestOptions({headers: header} );
      return this.http.get(`${environment.apiUrl}/${this.authService.getuserId()}/animals`, requestOptions);
    }
    catch(err) {
      console.log('err: ', err);
    }
  }
  

  getAnimalByName (name: string) {
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


  addAnimal(name: string) {    
    try{
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append("Authorization", "Bearer " + this.authService.getToken());
      let requestOptions = new RequestOptions({headers: header, params: new URLSearchParams} );
      return this.http.post(`${environment.apiUrl}/${this.authService.getuserId()}/animals`, JSON.stringify({name: name}), requestOptions);
    } 
    catch(err) {
      console.log('err: ', err);
    }
  }


  updateAnimal(id, name) {    
    try{
      // console.log(animal);
      
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append("Authorization", "Bearer " + this.authService.getToken());
      let requestOptions = new RequestOptions({headers: header, params: new URLSearchParams} );
      return this.http.put(`${environment.apiUrl}/animals/${id}`, JSON.stringify(new Animal(id, name, this.authService.getuserId())), requestOptions);
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

  // getAnimalByLogin (name: string) {
  //   try{
  //     let header = new Headers();
  //     header.append('Content-Type', 'application/json');
  //     header.append("Authorization", "Bearer " + this.authService.getToken());
  //     let requestOptions = new RequestOptions({headers: header, params: new URLSearchParams} );
  //     return this.http.get(`${environment.apiUrl}/animals/${name}`, requestOptions);
  //   }
  //   catch(err) {
  //     console.log('err: ', err);
  //   }
  // }
}
