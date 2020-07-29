import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

   constructor(private fb: Facebook, private storage: NativeStorage ) { }

  // constructor() { }
  ngOnInit() {
  }

  loginWithFacebook(): void {
    this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => {
   console.log('Logged into Facebook!', res);
   this.fb.api('me?fields=email', [])
   .then(async profil => {
     let email: string = profil.email;
     this.utilisateur = {
       contact : email,
       type: 'email',
       avatar:"",
       username: ""
     }
     await this.storage.setItem('Utilisateur', this.utilisateur);
     await this.storage.setItem('IsLoggedIn', true);
     //
     let url : string = `$(environmnt.api.url)/Utilisateurs`;
     this.http.post(url, this.utilisateur)
     .subscribe(user => {
       // naviguer vers la page d'accueil
     })
   })
  })
  .catch(e => console.log('Error logging into Facebook', e));
  }

}

