import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AnimalService } from '../../shared/services/animal.service';
import { Animal } from '../../shared/models/animal.model';
import { Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import {Observable} from 'rxjs';
import {DebounceDirective} from '../../shared/directives/debounce.directive';
import { fromEvent, of } from 'rxjs';
import { switchMap, map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @ViewChild('myInput') el:ElementRef;

  preloader = false;
  
  animals: Animal[];
  show:boolean = false;//if animals-
  constructor(
    private animalservice: AnimalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAnimals();

    const obs = fromEvent(this.el.nativeElement, 'keyup')
    .pipe (
        map((e:any) => {
          return e.target.value;
        }), 
        debounceTime(500),
        ); 
        obs.subscribe(() => this.search(this.el.nativeElement.value) );
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

  search(substr) {
    this.preloader = true;
    this.animalservice.search(substr)
    .subscribe(data => {
      console.log(data);
      this.animals = JSON.parse(data['_body']);
      this.preloader = false;
      this.show = this.animals.length > 0 ? false : true; 
    });

  }

}
