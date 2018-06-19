import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../shared/services/animal.service';
import { Animal } from '../shared/models/animal.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private animalService: AnimalService) { }

  ngOnInit() {
  }
  addAnimal(login, password) {
    this.animalService.createUser({login: login, password: password})
    .subscribe(data => console.log(data));
  }
}
