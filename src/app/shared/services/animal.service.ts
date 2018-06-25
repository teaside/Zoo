import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment.prod' 
import { Animal } from '../models/animal.model';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

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

  getAnimals() {
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append("Authorization", "Bearer " + this.authService.getToken());
      let requestOptions = new RequestOptions({headers: header} );
      return this.http.get(`${environment.apiUrl}/${this.authService.getuserId()}/animals`, requestOptions);
    }
    
  

  getAnimalById (id: string) {
    console.log('getAnimalById ', id);
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append("Authorization", "Bearer " + this.authService.getToken());
      let requestOptions = new RequestOptions({headers: header, params: new URLSearchParams} );
      return this.http.get(`${environment.apiUrl}/animal/${id}/${this.authService.getuserId()}`, requestOptions);
    }
    


  addAnimal(name: string) {    
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append("Authorization", "Bearer " + this.authService.getToken());
      let requestOptions = new RequestOptions({headers: header, params: new URLSearchParams} );
      return this.http.post(`${environment.apiUrl}/${this.authService.getuserId()}/animals`, JSON.stringify({name: name}), requestOptions);
  }


  updateAnimal(id, name) {          
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append("Authorization", "Bearer " + this.authService.getToken());
      let requestOptions = new RequestOptions({headers: header, params: new URLSearchParams} );
      return this.http.put(`${environment.apiUrl}/animals/${id}`, JSON.stringify(new Animal(id, name, this.authService.getuserId())), requestOptions);
  }


  deleteAnimal(id) {    
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append("Authorization", "Bearer " + this.authService.getToken());
      let requestOptions = new RequestOptions({headers: header, params: new URLSearchParams} );
      return this.http.delete(`${environment.apiUrl}/animals/${id}`, requestOptions);
  }

  search(substr: string) {
    // console.log('substr',substr);
    
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append("Authorization", "Bearer " + this.authService.getToken());
    let requestOptions = new RequestOptions({headers: header, params: new URLSearchParams} );
    if(substr == '') {
      return this.http.get(`${environment.apiUrl}/${this.authService.getuserId()}/animals`, requestOptions);
    }
    return this.http.get(`${environment.apiUrl}/animalsSearch/${substr}/${this.authService.getuserId()}`, requestOptions);
  }
}
