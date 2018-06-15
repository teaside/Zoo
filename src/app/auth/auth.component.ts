import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AnimalService } from '../shared/services/animal.service';
import { Animal } from '../shared/models/animal.model';
import { Jsonp } from '@angular/http';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  animals: Animal[];
  constructor(
    private animalService: AnimalService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  checkAnimal(login, password) {
    try {
      this.animalService.login({login: login, password: password})
      .subscribe(data => {
        const body = JSON.parse(data['_body']);
        const token = body["token"];
        if(token !== "The animal with this login isn't exist" && token !== "Wrong password") {
          this.authService.login(login, token);
          this.router.navigate(['/main']);
        }
        else {

        }
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}
