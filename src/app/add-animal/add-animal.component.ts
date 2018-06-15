import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../shared/services/animal.service';
import { Animal } from '../shared/models/animal.model';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimalComponent implements OnInit {

  constructor(private animalService: AnimalService) { }

  ngOnInit() {
  }
  addAnimal(id, name, login, password) {
    this.animalService.addAnimal(new Animal(id, name, login, password))
    .subscribe(data => console.log(data));
  }
}
