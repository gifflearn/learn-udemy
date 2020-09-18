import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from '../interfaces/property';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class PropertiesService {

  properties: Property[] = [
    // {
    //   title: 'Ma super maison',
    //   category: 'Maison',
    //   surface: '100',
    //   rooms: '',
    //   description: '',
    //   price:  '',
    //   sold: true
    // },
    // {
    //   title: 'Bel appart',
    //   category: 'Appartement',
    //   surface: '',
    //   rooms: '5',
    //   description: '',
    //   price: '',
    //   sold: false
    // },
    // {
    //   title: 'Belle villa',
    //   category: 'Maison',
    //   surface: '',
    //   rooms: '',
    //   description: '',
    //   price: '',
    //   sold: true
    // }
  ];

  // 3)
  // Subject est un type d'Observable
  propertiesSubject = new Subject<Property[]>();

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

 saveProperties() {
   firebase.database().ref('/properties').set(this.properties);
 }
 getProperties() {
   firebase.database().ref('/properties').on('value', (data) => {
     this.properties = data.val() ? data.val() : [];
     this.emitProperties();
   });
 }

 createProperty(property: Property) {
   this.properties.push(property);
   this.saveProperties();
   this.emitProperties();
 }

 deleteProperty(index) {
  this.properties.splice(index, 1);
  this.saveProperties();
  this.emitProperties();
 }

 updateProperty(property: Property, index) {
  // Premiere façon de faire
  // this.properties[index] = property;
  // this.saveProperties();
  // this.emitProperties();
  //
  // deuxieme facon de faire
  firebase.database().ref('/properties/' + index).update(property).catch(
    (error) => {
      console.error(error);
    }
  );
 }

 uploadFile(file: File) {
    return new Promise (
      (resolve, reject) => {
        const uniqueId = Date.now().toString();
        const filename = uniqueId + file.name;
        const upload = firebase.storage().ref().child('images/properties/' + filename).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement ...');
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {
           upload.snapshot.ref.getDownloadURL().then(
             (downLoadUrl) => {
               resolve(downLoadUrl);
             }
           );
          }
          );
      }
    );
 }

 removeFile(fileLink: string) {
    if (fileLink) {
      const storageRef = firebase.storage().refFromURL(fileLink);
      storageRef.delete().then(
        () => {
          console.log('file deleted');
          }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
    }
  }

  getSingleProperty(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/properties/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

}
