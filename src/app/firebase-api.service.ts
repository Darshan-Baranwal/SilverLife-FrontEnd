import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { IUser } from "./iuser.model";
import { IUserAddress } from "./iuser-address.model";
import { IOrder } from "./iorder-details.model";
import { CartProducts } from "./item-list/CartProducts.model";

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
    return this.firestore
      .collection("user_address", (ref) => ref.where("user_id", "==", id))
      .snapshotChanges();
  }
  saveOrderDetails(order: IOrder) {
    return this.firestore.collection("order").add(order);
  }

  updateCart(cartItems: CartProducts, userId: string) {
    return this.firestore
      .doc("user_cartList/" + userId)
      .update({ cartProducts: cartItems.cartProducts });
  }
  getAllCartList(id) {
    return this.firestore
      .collection("user_cartList", (ref) => ref.where("userId", "==", id))
      .snapshotChanges();
  }
}
