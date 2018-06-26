import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { fromEvent, of } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  loginStatus = '';
  passwordStatus = '';

  @ViewChild('emailInput') el:ElementRef;

  form: FormGroup;
  passwordLength:number = 6;

  preloader = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private location: Location ) {
      this.createForm();
     }


  createForm() {
    this.form = this.fb.group({
      email: ['dima.rikunov@mail.ru', [Validators.required, Validators.email], this.forbiddenEmails.bind(this)],
      name: ['', Validators.required],
      password1: ['', [Validators.required, Validators.minLength(this.passwordLength)]],
      password2: ['', [Validators.required, Validators.minLength(this.passwordLength)], this.isSamePasswords.bind(this)]
    });
    this.form.valueChanges
    .pipe(
      debounceTime(500)
    );
  }

  ngOnInit() {
    window['aaa'] = this;
  }

  addUser(form: FormGroup) {
    if(this.form.valid) {
      // console.log('+');
      this.preloader = true;
      this.userService.createUser({
        email: form.controls.email.value,
        name: form.controls.name.value,
        password: form.controls.password1.value}
      )
      .subscribe(data => {
        console.log(data);
        this.preloader = false;
        this.router.navigate(['/auth']);
      });
    }
    else {

    }
  }

  invalidField(email, form) {
    return form.controls[email].valid;
  }

  isSamePasswords(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.form.controls.password1.value == this.form.controls.password2.value)
        resolve(true);
    });
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.isEmailExists(control.value)
        .subscribe(data => {
          const isExists = JSON.parse(data['_body']);
          if(isExists) {
            
            resolve({forbidden:true});
          }
          else {
            resolve(null);
          }
        });
    });

  }

  back() {
    this.location.back();
  }
 }
