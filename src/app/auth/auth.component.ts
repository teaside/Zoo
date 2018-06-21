import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AnimalService } from '../shared/services/animal.service';
import { Animal } from '../shared/models/animal.model';

import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error = '';
  animals: Animal[];
  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  checkUser(login, password) {
    try {
      this.userService.login({login: login, password: password})
      .subscribe(data => {
        const body = JSON.parse(data['_body']);
        const token = body["token"];
        const userId = body["userId"];
        console.log("userId", userId);
        if(token !== "The user with this login isn't exist" && token !== "Wrong password") {
          this.authService.login(login, userId, token);
          this.router.navigate(['/main']);
        }
        else {
          if (token == "The user with this login isn't exist") {
            this.error = token;
          }
          else if (token == "Wrong password") {
            this.error = token;
          }
        }
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}
