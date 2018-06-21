import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../shared/services/animal.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
// import { AnimalService } from '../shared/services/animal.service';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimalComponent implements OnInit {

  preloader = false;

  constructor(
    private animalService: AnimalService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
  }

  addAnimal(name) {
    this.preloader = true;
    this.animalService.addAnimal(name)
    .subscribe(data => {
      console.log(data)
      this.preloader = false;
      this.router.navigate(['/main']);
    });
  }

  back() {
    this.location.back();
  }

}
