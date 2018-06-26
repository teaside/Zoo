import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AnimalService } from '../../shared/services/animal.service';
import { Animal } from '../../shared/models/animal.model';
import { Router } from '@angular/router';
import { fromEvent, of } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { PagerService } from '../../shared/services/pager.service';

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

  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  constructor(
    private animalservice: AnimalService,
    private router: Router,
    private pagerService: PagerService
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

  setPage(page: number) {
    console.log(123);
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // get current page of items
    console.log('page', page);
    // console.log(' this.pager.endIndex + 1',  this.pager.endIndex + 1);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

  getAnimals() {
    this.preloader = true;
    this.animalservice.getAnimals()
    .subscribe(data => {
      // this.animals = JSON.parse(data['_body']);
      this.allItems = JSON.parse(data['_body']);
      this.setPage(1);
      this.preloader = false;
      // this.show = this.animals.length > 0 ? false : true; 
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
