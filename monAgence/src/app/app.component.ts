import { Component } from '@angular/core';
import * as firebase from 'firebase';  // en prod n'impoter que les composants necessaires

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'monAgence';

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyDF8I4-8BTyUEJwthhpO5f5Lk05a9Iey34",
      authDomain: "monagence-48d3a.firebaseapp.com",
      databaseURL: 'https://monagence-48d3a.firebaseio.com',
      projectId: "monagence-48d3a",
      storageBucket: "monagence-48d3a.appspot.com",
      messagingSenderId: "701050053579",
      appId: "1:701050053579:web:691066b4cc24d24a5acc4e"
    };
    firebase.initializeApp(firebaseConfig);
  }


}
