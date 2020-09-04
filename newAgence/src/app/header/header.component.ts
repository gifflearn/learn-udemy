import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Ma super agence' ;
  isLoggedIn = false;
  dateNow = new Date();

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (userSession) => {
          if (userSession) {
            console.log('UserSession ',userSession);
            this.isLoggedIn = true;
            // console.log('Connecté !!!!!!');
          } else {
            this.isLoggedIn = false;
            // console.log('Non connecté !!');
          }
      }
    )
  }

  onSignOut() {
    this.authenticationService.signOutUser();
  }
}
