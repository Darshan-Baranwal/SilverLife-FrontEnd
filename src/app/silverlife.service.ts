import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { DateUtils } from "./dateUtils";
import { ICategory } from "./category/CategoryModel";
import { SubCategory } from "./category/sub-category/SubcategoryModel";
import { FirebaseApiService } from "./firebase-api.service";
import { IMail } from "./imail.model";
import { IOrder } from "./iorder-details.model";
import { CartProducts } from "./item-list/CartProducts.model";
import { IProduct } from "./item-list/ProductModel";
import { IUserAddress } from "./iuser-address.model";
import { IUser } from "./iuser.model";
import { APP_MAIL } from "./mail-constants";
import {
  CATEGORY_QUERY_PARAMETER,
  DELIVERY_DURATION,
  SUCCESS_IMAGE_BASE64,
} from "./shared/constants";

declare let Email: any;
@Injectable({
  providedIn: "root",
})
export class SilverlifeService {
  informCartInNavigation = new BehaviorSubject<IProduct>(null);
  focusToAdvisory = new BehaviorSubject<string>(null);
  showCategoryListModalForMobile = new BehaviorSubject<string>(null);
  cartList: CartProducts = {
    cartProducts: [],
    userId: "",
    cartId: "",
  };
  cartTotalAmount: number;
  loggedInUser: IUser = null;
  loggedInUserAddress: IUserAddress[] = null;
  selectedAddress: IUserAddress = null;
  orderDetails: IOrder = null;
  sendUserDetail = new BehaviorSubject<IUser>(null);
  razorPayOptions;
  constructor(private router: Router, private firestore: FirebaseApiService) {}
  createRazorPayOptions() {
    this.razorPayOptions = {
      key: "rzp_test_IGXsulglXEg9sa",
      amount: "50000",
      currency: "INR",
      name: "Gauze",
      description: "Test Transaction",
      handler: (response) => {
        this.razorPayResponseHandler(response);
      },
      prefill: {
        name: this.loggedInUser ? this.loggedInUser.user_name : "",
        email: this.loggedInUser ? this.loggedInUser.email : "",
        contact: this.loggedInUser ? this.loggedInUser.mobile : "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#df2241",
      },
    };
  }
  razorPayResponseHandler(response) {
    this.orderDetails.paymentDetails = response;

    this.saveOrderDetails();
  }
  saveOrderDetails() {
    this.firestore
      .saveOrderDetails(this.orderDetails)
      .then((res) => {
        this.orderDetails.id = res.id;
        const mailConfig: IMail = {
          To: this.loggedInUser ? this.loggedInUser.email : "",
          From: "only4apps15@gmail.com",
          Subject: "Silver Life new Order",
          Body: this.getMailBody(),
        };
        this.sendMail(mailConfig).then((message) => {
          this.cartList.cartProducts = [];
          this.cartList.userId = this.loggedInUser.id;
          sessionStorage.setItem("userCartList", JSON.stringify(this.cartList));
          this.router.navigate(["/order-successful"]);
        });
      })
      .catch((rej) => {
        alert("Order Not placed");
      });
  }
  navigateToProductListpage(
    routeLink: string,
    majorCategory,
    category: ICategory,
    subcategory: SubCategory
  ) {
    const queryParams = CATEGORY_QUERY_PARAMETER.query;
    queryParams.queryParams.majorCategory = majorCategory;
    queryParams.queryParams.category = category?.id;
    queryParams.queryParams.subcategory = subcategory?.id;
    this.router.navigate([routeLink], queryParams);
  }
  sendMail(mail: IMail) {
    mail = { ...mail, ...APP_MAIL };
    return Email.send(mail);
  }
  logout() {
    this.sendUserDetail.next(null);
    this.loggedInUser = null;
    this.cartList = {
      cartProducts: [],
      userId: "",
    };
    sessionStorage.setItem("userCartList", JSON.stringify(this.cartList));
    this.router.navigate(["/home"]);
  }

  getMailBody() {
    const productDetailsHTML = this.orderDetails.product_details.reduce(
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
<img src=${
      SUCCESS_IMAGE_BASE64.successSrc.src
    } alt="Success Image" class = "success">
  </div>
  <div>
  <div class="details">
      <div class="detailsRow">
          <div class="rightBorder">Order Number</div>
          <div>${this.orderDetails.id}</div>
      </div>
      <div class="detailsRow">
          <div class="rightBorder">Products Details</div>
      </div>
      ${productDetailsHTML}
      <div class="detailsRow">
          <div class="rightBorder">Order Date</div>
          <div>${DateUtils.getDateInfoFromString(
            this.orderDetails.order_date_time
          )}</div>
      </div>
      <div class="detailsRow">
          <div class="rightBorder">Expected Delivery Date</div>
          <div>${DateUtils.getLaterDateFromString(
            DELIVERY_DURATION.deliveryDays
          )}</div>
      </div>
      <div class="detailsRow">
          <div class="rightBorder">Total Amount</div>
          <div>Rs ${this.cartTotalAmount}</div>
      </div>
  </div>
</div>
<div>
<a href="https://silverlife.herokuapp.com/">Continue Shopping</a>
</div>
      `;
  }
}
