import { Component } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { AnimalService } from './shared/services/animal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: AnimalService) {}
  title = 'app';

  startedClass = false;
  completedClass = false;
  preventAbuse = false;

  onStarted() {
    this.startedClass = true;
    setTimeout(() => {
      this.startedClass = false;
    }, 800);
  }

  onCompleted() {
    this.completedClass = true;
    setTimeout(() => {
      this.completedClass = false;
    }, 800);
  }

  testHttp() {
    this.preventAbuse = true;
    this.http.getAnimals().subscribe(res => {
      console.log(res);
      setTimeout(() => {
        this.preventAbuse = false;
      }, 800);
    });
  }
}
