import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../shared/services/animal.service';
import { Animal } from '../shared/models/animal.model';
import { UserService } from '../shared/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  loginStatus = '';
  passwordStatus = '';

  form: FormGroup;
  passwordLength:number = 6;


  constructor(
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
  }

  ngOnInit() {
    window['aaa'] = this;
  }

  addUser(form: FormGroup,) {
    if(this.form.valid){
      console.log('+');
      // this.userService.createUser({
      //   email: form.controls.email.value,
      //   name: form.controls.name.value,
      //   password: form.controls.password1.value}
      // )
      // .subscribe(data => console.log(data));
    }
    else {
      
      // const asd = this.form.controls.email.errors.forbidden;
      // console.log(asd);
      // if (!this.form.controls.email.valid)
      //   this.loginStatus = "User with this email is already registered"
      // this.showError(this.form);
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

  showError(form: FormGroup) {
    console.log(form);
    // let res;
    // if(form.hasError('forbidden')) {
    //   res.email.isExist = 'User with this email already exists';
    // } else res.email.isExist = null;
    // if(form.controls.email.valid) {
    //   res.email.valid = 'User with this email already exists';
    // } else res.email.valid = null;
    // // if(form.controls.email.valid)
    // console.log(res);
  }
  back() {
    this.location.back();
  }
 }
