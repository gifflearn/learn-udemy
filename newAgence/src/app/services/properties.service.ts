import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PropertiesService {

  properties = [
    {
      title: 'Ma super maison',
      category: 'Maison',
      surface: '100',
      rooms: '',
      description: '',
      price:  '',
      sold: true
    },
    {
      title: 'Bel appart',
      category: 'Appartement',
      surface: '',
      rooms: '5',
      description: '',
      price: '',
      sold: false
    },
    {
      title: 'Belle villa',
      category: 'Maison',
      surface: '',
      rooms: '',
      description: '',
      price: '',
      sold: true
    }
  ];

  // 3)
  // Subject est un type d'Observable
  propertiesSubject = new Subject<any[]>();

  constructor() {}


  // Trois façons de coder le passage de données
  // ( voir code correspondant dans dans Home.component.ts )
  //
  // 1) code avec une Promise
  //
  // getProperties() {
  //   return new Promise(
  //     (resolve, reject) => {
  //       if (this.properties && this.properties.length > 0) {
  //           resolve(this.properties);
  //       } else {
  //           const error = new Error('Properties does not exist or is empty');
  //           reject(error);
  //       }
  //     }
  //   );
  // }

  // 2 )Code avec un observable
  //
  // getProperties() {
  //   return new Observable( (observer) => {
  //     if (this.properties && this.properties.length > 0) {
  //       observer.next(this.properties);
  //       observer.complete();
  //     } else {
  //       const error = new Error('Properties does not exist or is empty');
  //       observer.error(error);
  //     }
  //   });
  //
  // }

  // 3 )Code avec un Subject
 emitProperties() { // Cette function est à lancer à l'endroit de la subscription ( cf home component ou admin-properties component)
    this.propertiesSubject.next(this.properties);  // Si properties change alors l'info est envoyée
 }

 getProperties() {

 }

 createProperty(property) {
   this.properties.push(property);
 }

 deleteProperty(index) {
  this.properties.splice(index, 1);
  this.emitProperties();
 }

}
