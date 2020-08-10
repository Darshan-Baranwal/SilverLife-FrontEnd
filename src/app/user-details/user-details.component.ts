import { Component, OnInit } from "@angular/core";
import { SilverlifeService } from "../silverlife.service";
import { Router } from "@angular/router";
import "../../assets/js/smtp.js";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FirebaseApiService } from "../firebase-api.service";
import { tap, map } from "rxjs/operators";
import { IUserAddress } from "../iuser-address.model";
declare let Email: any;
@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"],
})
export class UserDetailsComponent implements OnInit {
  userDetails: FormGroup;
  userPayment: FormControl;
  newAddressSelected: boolean = false;
  constructor(
    public service: SilverlifeService,
    private router: Router,
    private firestore: FirebaseApiService
  ) {}

  ngOnInit(): void {
    this.userDetails = new FormGroup({
      first_name: new FormControl(
        { value: "", disabled: !this.newAddressSelected },
        Validators.required
      ),
      last_name: new FormControl({
        value: "",
        disabled: !this.newAddressSelected,
      }),
      mobile: new FormControl(
        { value: "", disabled: !this.newAddressSelected },
        Validators.required
      ),
      email: new FormControl(
        { value: "", disabled: !this.newAddressSelected },
        Validators.required
      ),
      address: new FormGroup({
        house_building: new FormControl(
          { value: "", disabled: !this.newAddressSelected },
          Validators.required
        ),
        road_area_colony: new FormControl(
          { value: "", disabled: !this.newAddressSelected },
          Validators.required
        ),
        city: new FormControl(
          { value: "", disabled: !this.newAddressSelected },
          Validators.required
        ),
        state: new FormControl(
          { value: "", disabled: !this.newAddressSelected },
          Validators.required
        ),
        pincode: new FormControl(
          { value: "", disabled: !this.newAddressSelected },
          Validators.required
        ),
      }),
    });
    this.userPayment = new FormControl("", Validators.required);

    if (!!this.service.loggedInUser) {
      this.firestore
        .getUserAddressInfo(this.service.loggedInUser.id)
        .pipe(
          map((data) => {
            return data.map((e) => {
              return {
                id: e.payload.doc.id,
                data: e.payload.doc.data(),
              };
            });
          }),
          tap((data: any) => {
            this.service.loggedInUserAddress = data.map((v) => {
              v.data.user_id = v.id;
              return v.data;
            });
            console.log(this.service.loggedInUserAddress);
          })
        )
        .subscribe();
    }
  }
  selectStoredAddress(selectedAddressIndex: number) {
    this.service.selectedAddress = this.service.loggedInUserAddress[
      selectedAddressIndex
    ];
    this.newAddressSelected = false;
    this.setFormValuesAndDisableState();
  }

  openNewAddress() {
    this.newAddressSelected = true;
    this.service.selectedAddress = null;
    this.setFormValuesAndDisableState();
  }

  setFormValuesAndDisableState() {
    this.userDetails.setValue({
      first_name: this.newAddressSelected
        ? ""
        : this.service.selectedAddress.first_name,
      last_name: this.newAddressSelected
        ? ""
        : this.service.selectedAddress.last_name,
      mobile: this.newAddressSelected
        ? ""
        : this.service.selectedAddress.mobile,
      email: this.newAddressSelected ? "" : this.service.selectedAddress.email,
      address: {
        house_building: this.newAddressSelected
          ? ""
          : this.service.selectedAddress.address.house_building,
        road_area_colony: this.newAddressSelected
          ? ""
          : this.service.selectedAddress.address.road_area_colony,
        city: this.newAddressSelected
          ? ""
          : this.service.selectedAddress.address.city,
        state: this.newAddressSelected
          ? ""
          : this.service.selectedAddress.address.state,
        pincode: this.newAddressSelected
          ? ""
          : this.service.selectedAddress.address.pincode,
      },
    });
    if (!this.newAddressSelected) {
      this.userDetails.disable();
    } else {
      this.userDetails.enable();
    }
  }
  proceedToOrder() {
    console.log(this.userPayment.value);
    // this.sendEmail().then((message) => {
    //   this.router.navigate(["/order-successful"]);
    // });
  }
  submitBillingInfo() {
    console.log({
      ...this.userDetails.value,
      user_id: this.service.loggedInUser.id,
    });
    this.firestore
      .createUserAddress({
        ...this.userDetails.value,
        user_id: this.service.loggedInUser.id,
      })
      .then((res) => {})
      .catch((rej) => alert("Adding Billing address fails. Please try again"));
  }
  sendEmail() {
    return Email.send({
      Host: "smtp.elasticemail.com",

      Username: "only4apps15@gmail.com",

      Password: "5A8CD76F9586056401874BD1E558CD5B6F05",

      To: "goeldiksha94@gmail.com",

      From: "only4apps15@gmail.com",

      Subject: "Test Mail",

      Body: `
      <div class="OrderConfirmation">
  <div>
      <img class="success" src="Images/success.png">
  </div>
  <h2>Your order has been confirmed!</h2>
  <h4>Below are order details</h4>
  <div>
  <div class="details">
      <div class="detailsRow">
          <div class="rightBorder">Order Number</div>
          <div>110022333</div>
      </div>
      <div class="detailsRow">
          <div class="rightBorder">Order Date</div>
          <div>24 June 2020</div>
      </div>
      <div class="detailsRow">
          <div class="rightBorder">Expected Delivery Date</div>
          <div>1 July 2020</div>
      </div>
      <div class="detailsRow">
          <div class="rightBorder">Total Amount</div>
          <div>Rs ${this.service.cartTotalAmount}</div>
      </div>
  </div>
</div>
      `,
    });
  }
}
