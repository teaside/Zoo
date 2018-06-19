import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../shared/services/animal.service';
import { Animal } from '../../shared/models/animal.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  animals: Animal[];
  show:boolean = false;
  constructor(private animalservice: AnimalService) { }

  ngOnInit() {
    this.getAnimals();
  }
  getAnimals() {
    this.animalservice.getAnimals()
    .subscribe(data => {
      this.animals = JSON.parse(data['_body']);
      this.show = this.animals.length > 0 ? true : false; 
    });
  }

}
