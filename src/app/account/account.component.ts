import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {}

  registerUser() {
    this.firestore
      .collection("user")
      .snapshotChanges()
      .subscribe((data) => {
        console.log(data.map(e => {
            return {
              id: e.payload.doc.id,
              data: e.payload.doc.data()
            };
          }
        ));
      });
  }
}
