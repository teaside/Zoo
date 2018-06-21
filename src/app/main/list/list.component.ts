import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../shared/services/animal.service';
import { Animal } from '../../shared/models/animal.model';
import { Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  preloader = false;
  
  animals: Animal[];
  show:boolean = false;
  constructor(
    private animalservice: AnimalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAnimals();
    this.show = false;
  }
  getAnimals() {
    this.preloader = true;
    this.animalservice.getAnimals()
    .subscribe(data => {
      this.animals = JSON.parse(data['_body']);
      this.preloader = false;
      this.show = this.animals.length > 0 ? false : true; 
    });
  }
  delete(id) {
    this.preloader = true;
    this.animals = [];
    this.animalservice.deleteAnimal(id)
    .subscribe(data => {
      console.log(data);
      this.getAnimals();
    });
  }

}
