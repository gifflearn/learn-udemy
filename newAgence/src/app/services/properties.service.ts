import { Injectable } from '@angular/core';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties = [
    {title : 'Ma super Maison',
    category: 'Maison',
    sold: true},
    {title : 'Petit Appartement',
    category: 'Appartement',
    sold: false},
    {title : 'Belle villa',
    category: 'Maison',
    sold: true}
  ];

  constructor() { }

  getProperties() {

    return new Promise(
      // tslint:disable-next-line: no-shadowed-variable
      (resolve , reject) => {
        if (this.properties && this.properties.length > 0) {
          resolve(this.properties);
        } else {
          const error = new Error('Properties does not exist or is empty');
          reject(error);
        }
      }

    );
  }
  
}
