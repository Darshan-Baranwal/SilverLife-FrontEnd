import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { IUser } from "./iuser.model";
import { map, flatMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FirebaseApiService {
  constructor(private firestore: AngularFirestore) {}
  getUser() {
    return this.firestore.collection("user").snapshotChanges();
  }
  createUser(user: IUser) {
    return this.firestore.collection("user").add(user);
  }

  loginUser(user: IUser) {
    return this.firestore
      .collection("user", (ref) =>
        ref
          .where("email", "==", user.email)
          .where("password", "==", user.password)
      )
      .valueChanges();
  }
}
