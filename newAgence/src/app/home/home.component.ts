import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../services/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private propertiesService: PropertiesService
  ) { }

  sold = false;

  properties = [];

  ngOnInit() {
    this.propertiesService.getProperties().then( //executé si le promise est en resolve .
      (data: any) => {                                // Celui-ci passe alors en parametre la valeur du return ( ici: properties)
        console.log(data);
        this.properties = data;
      }
    ).catch(                                    //executé si le promise est en reject.
      (error) => {                              // Celui-ci passe alors en parametre la valeur du return ( ici: Prperties does not ...)
        console.log(error);
      }
    );
  }

  getSoldValue(index) {
    if (this.properties[index].sold) {
      return 'red';
    } else {
      return  'green';
    }
  }
}
