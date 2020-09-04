import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'newAgence';

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCQR-a9u8Q-x6sx9wPc-fKIPSr1XiNRVaw',
      authDomain: 'newagence-e0244.firebaseapp.com',
      databaseURL: 'https://newagence-e0244.firebaseio.com',
      projectId: 'newagence-e0244',
      storageBucket: 'newagence-e0244.appspot.com',
      messagingSenderId: '1092626725552',
      appId: '1:1092626725552:web:c6090eb9a6afdb391fd975',
      measurementId: 'G-W13XT3BSEG'
    };
    firebase.initializeApp(firebaseConfig);
  }
}
