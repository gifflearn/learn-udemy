import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Property } from '../interfaces/property';
// import { resolve } from 'dns';
// import { timingSafeEqual } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] =[
    {
      title: "Ma super maison",
      category: 'Maison',
      surface:'100',
      rooms:'',
      description:'',
      price:'',
      sold: true
    },
    {
      title: "Bel appart",
      category: 'Appartement',
      surface:'',
      rooms:'5',
      description:'',
      price:'',
      sold: false
    },
    {
      title: "Belle villa",
      category: 'Maison',
      surface:'',
      rooms:'',
      description:'',
      price:'',
      sold: true
    }
  ];

  propertiesSubject = new Subject<Property[]>() ;

  constructor() { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }


  createProperty(property: Property){

    this.properties.push(property);
  }

  deleteProperty(index){
    this.properties.splice(index,1);
    this.emitProperties();
  }

  updateProperty(property:Property,index){
    this.properties[index]=property;
    this.emitProperties;
  }

  getProperties() {
    // Code pour utiliser une promise
    // return new Promise(
    //   (resolve,reject) => {
    //     if (this.properties && this.properties.length > 0) {
    //         resolve(this.properties);
    //     } else {
    //       const serv_error = new Error('Properties does not exist or is empty');
    //       reject(serv_error);
    //     }
    //   }
    // );

    // Code pour utiliser un Observable
    // return new Observable((observer) => {
    //   if (this.properties && this.properties.length > 0) {
    //     observer.next(this.properties);
    //     observer.complete();
    //   } else {
    //     const error = new Error('Properties does not exist or is empty');
    //     observer.error(error);
    //   }
    // });

  }
}
