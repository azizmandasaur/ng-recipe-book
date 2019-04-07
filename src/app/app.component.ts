import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature: string = 'recipe';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    firebase.initializeApp({
      apiKey: "AIzaSyD10N6I1NbToFsOAB9Xw39QM8TIdySR4BI",
      authDomain: "ng-recipe-book-7c060.firebaseapp.com"
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
