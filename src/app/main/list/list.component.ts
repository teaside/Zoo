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
  itemsCount = 0;
  lastSearch = '';
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
    this.preloader = true;
    this.animalservice.getPagesCount(10)
      .subscribe(data => {
        console.log('getPagesCount', data['_body']);
        this.itemsCount = data['_body'];
        this.animalservice.getPage(1, 10)
          .subscribe(data2 => {
            this.allItems = JSON.parse(data2['_body']);
            console.log('this.allItems', this.allItems);
            // console.log('animals', data2['_body']);
            this.setPage(1);
          });
      });
    // this.getAnimals();
    const obs = fromEvent(this.el.nativeElement, 'keyup')
    .pipe (
        map((e:any) => {
          return e.target.value;
        }), 
        debounceTime(500),
    ); 
    obs.subscribe(() => this.search(this.el.nativeElement.value,  this.pager.startIndex,  this.pager.endIndex) );
  }

  setPage(page: number) {
    this.preloader = true;
    this.pager = this.pagerService.getPager(this.itemsCount, page);

    console.log('this.pager.startIndex', this.pager.startIndex);
    console.log('this.pager.endIndex', this.pager.endIndex)
    // console.log('(this.pager.startIndex', this.pager.startIndex);
    // this.animalservice.getPage((this.pager.endIndex + 1 - this.pager.startIndex) / 10, 10)
  if(this.el.nativeElement.value === '')
  {
    //если первый раз вызываем после поиска, то устанавливаем на первую страницу
    this.lastSearch = "";
    //вызываем поиск передаем старт(current) и енд(current+10) с сабстр но без параметров
    this.animalservice.getPage(this.pager.startIndex, this.pager.endIndex + 1)
    .subscribe(data => {
      this.allItems = JSON.parse(data['_body']);
      // console.log('this.allItems', this.allItems);
      this.pagedItems = this.allItems;
      this.preloader = false;
    });
  }
  else {
    if (this.lastSearch !== this.el.nativeElement.value) {
        //переустанавливаем падинг
        //вызываем поиск передаем старт(1) и енд(10) с сабстр и устанавливаем первую страницу

      } else {
        //вызываем и передаем старт(current) и енд(current+10) с сабстр
    }
  }
    

    
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
      // this.getAnimals();
    });
  }

  search(substr, startIndex, endIndex) {
     this.el.nativeElement.value
    this.preloader = true;
    this.animalservice.search(substr, 10)
    .subscribe(data => {
      console.log(data);
      this.animals = JSON.parse(data['_body']);
      this.preloader = false;
      this.show = this.animals.length > 0 ? false : true; 
    });
  }

}
