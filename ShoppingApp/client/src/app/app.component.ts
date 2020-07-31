import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { categories } from 'src/models/category';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  categories: any[];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.categories = categories;
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      const loggedIn =  await this.storage.get('IsLoggedIn')
      this.statusBar.styleDefault();
      if (loggedIn) {
        console.log('Déja connecté');
        this.navCtrl.navigateRoot('/home');
      }
      this.splashScreen.hide();
    });
  }

  showCategory(catTitle: string ) {
    this.navCtrl.navigateForward('/category');
    console.log('catTitle : ', catTitle);
  }

  goTo(route: string) {
    console.log('Route :  ', route);
    this.navCtrl.navigateForward(`/${route}`);
  }
}
