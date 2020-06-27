import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertiesService } from '../services/properties.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {


  constructor(private propertiesService : PropertiesService  ) { }


  properties=[];
  propertiesSubsription: Subscription;

  ngOnInit(): void {
    // Code pour utiliser une promise
    //
    // this.propertiesService.getProperties().then(
    //   (datala: any) => {
    //     console.log(datala);
    //     this.properties = datala;
    //   }
    // ).catch(
    //   (error_ici)=> {
    //     console.log(error_ici);
    //   }
    // )

    // Code pour utiliser un observable
    // this.propertiesService.getProperties().subscribe(
    //   (data_ob : any) => {
    //     this.properties = data_ob;
    //   },
    //   (error) => {
    //     console.log(error);
    //   },
    //   () => {
    //     console.log('Observable complete');
    //   }
    // )}

    this.propertiesSubsription = this.propertiesService.propertiesSubject.subscribe(
        (data_ob : any) => {
          this.properties = data_ob;
      });

    this.propertiesService.emitProperties();
    }

    ngOnDestroy(){
      this.propertiesSubsription.unsubscribe;
    }


    getSoldValue(index){
      if (this.properties[index].sold) {
        return 'red';
      } else {
        return 'green';
      }
    }

}
