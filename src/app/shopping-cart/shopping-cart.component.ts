import { Component, OnInit, ViewChild } from "@angular/core";
import { IProduct } from "../item-list/ProductModel";
import { SilverlifeService } from "../silverlife.service";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
})
export class ShoppingCartComponent implements OnInit {
  calculateTotalAmount: number;
  deliveryFee: number;
  constructor(public service: SilverlifeService, 
              private router: Router,
              private http: HttpClient) {}

  ngOnInit(): void {
    this.getTotalProductAmount();
    this.deliveryFee = 200;
    this.getProductList();
  }

  getProductList() {
    return this.http
    .get("../assets/JsonData/Products.json")
    .pipe(catchError((err) => of(err)))
    .subscribe((data) => {
      this.service.cartList.cartProducts = this.service.cartList.cartProducts.map(v => {
      return {...data.products.find((data) => data.id == v.id), selectedCount: v.selectedCount};
      });
    });
  }
  changeProductCount(product: IProduct, action: number) {
    if (product.selectedCount + action !== 0) {
      product.selectedCount += action;
    }
  }

  getTotalProductAmount(): number {
    return this.service.cartList.cartProducts.reduce((a, v) => {
      a = a + v.selectedCount * v.price;
      return a;
    }, 0);
  }

  removeProduct(product: IProduct) {
    this.service.cartList = {
      ...this.service.cartList,
      cartProducts: this.service.cartList.cartProducts.filter(
        (v) => v.id !== product.id
      ),
    };
  }
  navigateToUserInfoPage() {
    this.service.cartTotalAmount = this.getTotalAmount();
    if (!!this.service.loggedInUser) {
      this.router.navigate(["/user-details"]);
    } else {
      this.router.navigate(["/account"]);
    }
  }

  getTotalAmount() {
    return this.getTotalProductAmount() + this.deliveryFee;
  }
}
