import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment.prod' 
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService implements OnInit {

  public animals;
  
  constructor(
    private http: Http
  ) { }

  ngOnInit() {
    // this.getAnimals();
  }


  getAnimals() {
    try{
      return this.http.get(`${environment.apiUrl}/animals`);
    }
    catch(err) {
      console.log('err: ', err);
    }
  }
  

  getAnimalById (id: string) {
    try{
      return this.http.get(`${environment.apiUrl}/animals/${id}`);
    }
    catch(err) {
      console.log('err: ', err);
    }
  }


  addAnimal(animal: Animal) {    
    try{
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      return this.http.post(`${environment.apiUrl}/animals/`, JSON.stringify(animal), new RequestOptions({headers: header}));
    } 
    catch(err) {
      console.log('err: ', err);
    }
  }


  updateAnimal(animal: Animal) {    
    try{
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      return this.http.put(`${environment.apiUrl}/animals/${animal.id}`, JSON.stringify(animal), new RequestOptions({headers: header}));
    } 
    catch(err) {
      console.log('err: ', err);
    }
  }


  deleteAnimal(id) {    
    try{
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      return this.http.delete(`${environment.apiUrl}/animals/${id}`);
    } 
    catch(err) {
      console.log('err: ', err);
    }
  }

  getAnimalByLogin (name: string) {
    try{
      return this.http.get(`${environment.apiUrl}/animals/${name}`);
    }
    catch(err) {
      console.log('err: ', err);
    }
  }
}
