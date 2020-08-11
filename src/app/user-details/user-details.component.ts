import { Component, OnInit } from "@angular/core";
import { SilverlifeService } from "../silverlife.service";
import { Router } from "@angular/router";
import "../../assets/js/smtp.js";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FirebaseApiService } from "../firebase-api.service";
import { tap, map } from "rxjs/operators";
import { IUserAddress } from "../iuser-address.model";
import { IOrder } from "../iorder-details.model";
import { SUCCESS_IMAGE_BASE64 } from "../shared/constants";
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
  successImageSrc = SUCCESS_IMAGE_BASE64.successSrc.src;
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
    this.service.orderDetails = {
      user_details: this.service.selectedAddress,
      product_details: this.service.cartList,
      payment_mode: this.userPayment.value,
      total_price: this.getTotalProductAmount(),
      order_date_time: new Date(),
    };
    console.log(this.service.orderDetails);
    this.firestore
      .saveOrderDetails(this.service.orderDetails)
      .then((res) => {
        this.service.orderDetails.id = res.id;
        this.sendEmail().then((message) => {
          this.router.navigate(["/order-successful"]);
        });
      })
      .catch((rej) => {
        alert("Order Not placed");
      });
  }
  getTotalProductAmount(): number {
    return this.service.cartList.reduce((a, v) => {
      a = a + v.selectedCount * v.price;
      return a;
    }, 0);
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

      Body: this.getMailBody(),
    });
  }
  getMailBody() {
    const productDetailsHTML = this.service.orderDetails.product_details.reduce(
      (a, v) => {
        a =
          a +
          `<div class="detailsRow">
        <div class="rightBorder"> ${v.name} </div>
          <div>Price: ${v.selectedCount} * ${v.price} Rs = ${
            v.price * v.selectedCount
          } Rs </div>
            </div>`;
        return a;
      },
      ""
    );
    return `
      <style>
.OrderConfirmation{
  position: relative;
  top:150px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  align-content: center;
  text-align: center;
  height: 600px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.success{
  height: 150px;
  width: 150px;
}

.details{
  border: 1px solid grey;
  width: 500px;
  margin: 0 auto;
}

.detailsRow{
  height: 30px;
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.detailsRow div{
  text-align: left;
  padding: 0 20px;
  width: 50%;
  margin: auto;
}

.rightBorder{
  border-right: 1px solid grey;
}

h2,h4{
  margin-top: 5px;
}

.ContnuShpg{
margin-top: 10px;
width: 200px;
font-size: 20px;
}
</style>
<div class="OrderConfirmation">
  <h2>Your order has been confirmed!</h2>
  <h4>Below are order details</h4>
  <div>
<img src=${this.successImageSrc} alt="Success Image" class = "success">
  </div>
  <div>
  <div class="details">
      <div class="detailsRow">
          <div class="rightBorder">Order Number</div>
          <div>${this.service.orderDetails.id}</div>
      </div>
      <div class="detailsRow">
          <div class="rightBorder">Products Details</div>
      </div>
      ${productDetailsHTML}
      <div class="detailsRow">
          <div class="rightBorder">Order Date</div>
          <div>${this.service.orderDetails.order_date_time.toLocaleDateString()}</div>
      </div>
      <div class="detailsRow">
          <div class="rightBorder">Expected Delivery Date</div>
          <div>${new Date(
            new Date().getTime() + 5 * 24 * 60 * 60 * 1000
          ).toLocaleDateString()}</div>
      </div>
      <div class="detailsRow">
          <div class="rightBorder">Total Amount</div>
          <div>Rs ${this.service.cartTotalAmount}</div>
      </div>
  </div>
</div>
<div>
<a href="https://silverlife.herokuapp.com/">Continue Shopping</a>
</div>
      `;
  }
}
