import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../shared/services/animal.service';

import { Animal } from '../../shared/models/animal.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  // id: string;
  animal: Animal = {_id:"", name: "", userId: ""};
  preloader = false;

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.getAnimal();
  }

  getAnimal() {
    this.preloader = true;
    this.animalService.getAnimalById(this.route.snapshot.params.id)
    .subscribe(data => {
      this.animal = JSON.parse(data['_body']);
      this.preloader = false;
      console.log("gotten animals: ",this.animal);
    });
  }

  update(id, name) {
    this.preloader = true;
    this.animalService.updateAnimal(this.route.snapshot.params.id, name)
    .subscribe(data => {
      console.log(data);
      this.preloader = false;
      this.router.navigate(['/main'])
    });
  }

  back() {
    this.location.back();
  }

}
