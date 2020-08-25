import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertiesService } from '../services/properties.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // 1) et 2)
  public properties: any[];
  constructor(private propServ: PropertiesService) { }

  // 3)
  propertiesSubscription: Subscription;

  title = 'Ma super agence';
  isDisabled = false;
  dateNow = new Date();

  // 1) Code avec une Promise
  // ngOnInit() {
  //   this.propServ.getProperties().then(
  //     (data: any) => {
  //       this.properties = data;
  //       console.log(data);
  //     }
  //   ).catch(
  //     (error) => {
  //     console.log(error);
  //     }
  //   );
  // }

  // 2) Coder avec un Observable
  // ngOnInit() {
  //   this.propServ.getProperties().subscribe(
  //     (data: any) => {
  //       this.properties = data;
  //     },
  //     (error) => {
  //       console.error(error);
  //     },
  //     () => {
  //       console.log('Observable complete');
  //     }
  //   )
  // }

  // 3) Coder avec un Subject
  ngOnInit() {
    this.propertiesSubscription = this.propServ.propertiesSubject.subscribe(
      (data: any) => {
        this.properties = data;
      }
    );
    this.propServ.emitProperties();
  }

  ngOnDestroy() {
    this.propServ.propertiesSubject.unsubscribe();
  }
  //

  getSoldValue(i) {
    if (this.properties[i].sold === true) {
      return 'red';
    } else {
      return 'green';
    }
  }
}
