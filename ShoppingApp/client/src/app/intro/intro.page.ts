import { Component, OnInit } from '@angular/core';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
//import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Utilisateur } from 'src/models/utilisateur-interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../models/environments';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  utilisateur = {} as Utilisateur;

   constructor(private storage: Storage, private http: HttpClient, private navCtrl: NavController ) { }

  // constructor() { }
  ngOnInit() {
  }

  makeString(longueur: Number): string {
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < longueur; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }

    return outString;
  }

  loginWithFacebook(): void {
      console.log('Logged into Facebook!');
      let result = this.makeString(4);
      this.utilisateur = {
        contact : result + '.jf@gmail.com',
        type: 'email',
        avatar: '',
        username: ''
      };
      // stocker en local
      this.storage.set('Utilisateur', JSON.stringify(this.utilisateur));
      this.storage.get('Utilisateur').then( res => console.log(res));
      this.storage.set('IsLoggedIn', 'true');
      this.storage.get('IsLoggedIn').then( res => console.log(res))
      // stocker dans mongodb
      //
      const url: string = `${environment.api_url}/Utilisateurs`;
      this.http.post(url, this.utilisateur)
          .subscribe(user => {
            // naviguer vers la page d'accueil
            // this.navCtrl.navigateForward('/home');
            this.navCtrl.navigateRoot('/home')
            console.log('Naviguer',user);
          });
    }

  // loginWithFacebook(): void {
  //   console.log('click Facebook');
  //   this.fb.login(['public_profile', 'user_friends', 'email'])
  //   .then((res: FacebookLoginResponse) => {
  //       console.log('Logged into Facebook!', res);
  //       this.fb.api('me?fields=email', [])
  //           .then(async profil => {
  //                 let email: string = profil.email;
  //                 this.utilisateur = {
  //                   contact : email,
  //                   type: 'email',
  //                   avatar:"",
  //                   username: ""
  //                 }
  //                 await this.storage.setItem('Utilisateur', this.utilisateur);
  //                 await this.storage.setItem('IsLoggedIn', true);
  //                 // stocker dans mongodb
  //                 let url: string = `$(environment.api_url)/Utilisateurs`;
  //                 this.http.post(url, this.utilisateur)
  //                 .subscribe(user => {
  //                   // naviguer vers la page d'accueil
  //                 })
  //           })
  //   })
  //   .catch(e => console.log('Error logging into Facebook', e));
  //   }

}

