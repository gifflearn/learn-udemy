import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  signiUpUser(email:string,password:string){
    return new Promise (
      (resolve,reject) => {
        firebase.auth().createUserWithEmailAndPassword(email,password).then(
          () => {
            console.log('Connecté');
            resolve();
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );

  }
}
