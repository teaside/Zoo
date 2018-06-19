import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../shared/services/animal.service';
import { Router } from '@angular/router';
// import { AnimalService } from '../shared/services/animal.service';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimalComponent implements OnInit {

  constructor(
    private animalService: AnimalService,
    private router: Router) { }

  ngOnInit() {
  }
  addAnimal(name) {
    this.animalService.addAnimal(name)
    .subscribe(data => {
      console.log(data)
      this.router.navigate(['/main'])
    });
  }
}
