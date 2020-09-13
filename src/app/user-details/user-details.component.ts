import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { map, tap } from "rxjs/operators";
import "../../assets/js/smtp.js";
import { FirebaseApiService } from "../firebase-api.service";
import { SilverlifeService } from "../silverlife.service";
declare var Razorpay: any;
@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"],
})
export class UserDetailsComponent implements OnInit {
  userDetails: FormGroup;
  userPayment: FormControl;
  newAddressSelected = false;
  @ViewChild("firstNameInput", { static: false }) firstNameInput;
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
            // undefined on no user address
            this.service.loggedInUserAddress = data.map((v) => {
              v.data.address.id = v.id;
              return v.data;
            });
            this.showFirstAddress();
          })
        )
        .subscribe();
    }
  }
  showFirstAddress() {
    this.service.selectedAddress = this.service.loggedInUserAddress[0];
    this.newAddressSelected = false;
    if (this.service.loggedInUserAddress.length === 0) {
      this.newAddressSelected = true;
    }
    this.setFormValuesAndDisableState();
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
    this.firstNameInput.nativeElement.focus();
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
    this.createOrderDetailsObj();
    if (this.userPayment.value === "pod") {
      this.service.saveOrderDetails();
    } else {
      this.service.createRazorPayOptions();
      const rzp1 = new Razorpay(this.service.razorPayOptions);
      rzp1.open();
    }
  }

  createOrderDetailsObj() {
    this.service.orderDetails = {
      user_details: this.service.selectedAddress,
      product_details: this.service.cartList.cartProducts,
      payment_mode: this.userPayment.value,
      total_price: this.getTotalProductAmount(),
      order_date_time: new Date().toString(),
    };
  }
  getTotalProductAmount(): number {
    return this.service.cartList.cartProducts.reduce((a, v) => {
      a = a + v.selectedCount * v.price;
      return a;
    }, 0);
  }
  submitBillingInfo() {
    this.firestore
      .createUserAddress({
        ...this.userDetails.value,
        user_id: this.service.loggedInUser.id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((rej) => alert("Adding Billing address fails. Please try again"));
  }
}
