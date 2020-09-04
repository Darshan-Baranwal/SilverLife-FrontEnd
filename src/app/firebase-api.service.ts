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
  forgotPwd(email: string) {
    return this.firestore
      .collection("user", (ref) => ref.where("email", "==", email))
      .snapshotChanges();
  }
  updateUser(user: IUser) {
    return this.firestore.doc("user/" + user.id).set(user);
  }
  updateUserProfile(user: IUser) {
    return this.firestore.collection("user").doc(user.id).update({
      user_name: user.user_name,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      mobile: user.mobile,
    });
  }
  getUserAddressInfo(id: string) {
    return this.firestore
      .collection("user_address", (ref) => ref.where("user_id", "==", id))
      .snapshotChanges();
  }
  saveOrderDetails(order: IOrder) {
    return this.firestore.collection("order").add(order);
  }

  updateCart(cartItems: CartProducts) {
    return this.firestore
      .doc("user_cartList/" + cartItems.cartId)
      .set(cartItems);
  }
  addUserInCartTable(cartItems: CartProducts) {
    return this.firestore.collection("user_cartList").add(cartItems);
  }
  getAllCartList(id: string) {
    return this.firestore
      .collection("user_cartList", (ref) => ref.where("userId", "==", id))
      .snapshotChanges();
  }
  getAllOrderList(userId: string) {
    return this.firestore
      .collection("order", (ref) =>
        ref.where("user_details.user_id", "==", userId)
      )
      .snapshotChanges();
  }
}
