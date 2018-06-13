import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../shared/services/animal.service';

import { Animal } from '../../shared/models/animal.model';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  // id: string;
  animals: Animal[];

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService
  ) { }

  ngOnInit() {
    this.getAnimal();
  }

  getAnimal() {
    this.animalService.getAnimalById(this.route.snapshot.params['id'])
    .subscribe(data => {
      this.animals = JSON.parse(data['_body']);
      console.log('animals ', this.animals);
    });
  }

  update(id, name, login, password) {
    this.animalService.updateAnimal(new Animal(id, name, login, password))
    .subscribe(data => console.log(data));
  }
  
  add(id, name, login, password) {
    this.animalService.addAnimal(new Animal(id, name, login, password))
    .subscribe(data => console.log(data));
  }
  delete(id) {
    this.animalService.deleteAnimal(id)
    .subscribe(data => console.log(data));
  }

}
