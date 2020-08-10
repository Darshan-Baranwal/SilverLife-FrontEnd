import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { IUser } from "./iuser.model";
import { map, flatMap } from "rxjs/operators";
import { IUserAddress } from "./iuser-address.model";

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

  createUserAddress(userAddress: IUserAddress) {
    return this.firestore.collection("user_address").add(userAddress);
  }

  loginUser(user: IUser) {
    return this.firestore
      .collection("user", (ref) =>
        ref
          .where("email", "==", user.email)
          .where("password", "==", user.password)
      )
      .snapshotChanges();
  }
  getUserAddressInfo(id: string) {
    return this.firestore.collection("user_address", ref => ref.where("user_id", "==", id)).snapshotChanges();
  }
}
