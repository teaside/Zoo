import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../shared/services/animal.service';

import { Animal } from '../../shared/models/animal.model';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  // id: string;
  animal: Animal = {_id:"", name: "", userId: ""};

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAnimal();
  }

  getAnimal() {
    this.animalService.getAnimalByName(this.route.snapshot.params.name)
    .subscribe(data => {
      this.animal = JSON.parse(data['_body']);
      console.log("gotten animals: ",this.animal);
    });
  }

  update(id, name) {
    this.animalService.updateAnimal(id, name)
    .subscribe(data => {
      console.log(data);
      this.router.navigate(['/main'])
    });
  }
  
  delete(id) {
    this.animalService.deleteAnimal(id)
    .subscribe(data => {
      console.log(data);
      this.router.navigate(['/main'])
    });
  }

}
