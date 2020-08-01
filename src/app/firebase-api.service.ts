import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  constructor(private firestore: AngularFirestore) { }
  getUser() {
    return this.firestore.collection('user').snapshotChanges();
  }
    createUser(policy: Policy){
  return this.firestore.collection('policies').add(policy);
}
}
