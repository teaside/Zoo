import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../shared/services/animal.service';
import { Animal } from '../../shared/models/animal.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  asd: any;
  animals: Animal[];
  
  constructor(private animalservice: AnimalService) { }

  ngOnInit() {
    this.getAnimals();
  }
  getAnimals() {
    this.animalservice.getAnimals()
    .subscribe(data => {
      this.animals = JSON.parse(data['_body']);
    });
  }

}
