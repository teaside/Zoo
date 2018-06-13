import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AnimalService } from '../shared/services/animal.service';
import { Animal } from '../shared/models/animal.model';
import { Jsonp } from '@angular/http';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  animals: Animal[];
  constructor(
    private animalService: AnimalService,
  private router: Router) { }

  ngOnInit() {
    let asd = window.localStorage.getItem('authenticated');
    if (asd != null)
    {
      this.router.navigate(['/main']);
    }
  }

  checkAnimal(login, password) {
    this.animalService.getAnimals()
    .subscribe(data => {
      this.animals = JSON.parse(data['_body']);
      console.log('animals ', this.animals);
    });
    try {
      let obj = this.animals.find(o => o.login === login && o.password === password);
      if (obj) {
        window.localStorage.setItem('authenticated', JSON.stringify(true));
        this.router.navigate(['/main']);
      }
    }
    catch (err) {
      console.log(err);
    }
    
    // console.log(false);
    // return false
  }
}
