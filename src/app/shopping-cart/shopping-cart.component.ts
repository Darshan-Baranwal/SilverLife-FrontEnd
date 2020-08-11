import { Component, OnInit, ViewChild } from "@angular/core";
import { IProduct } from "../item-list/ProductModel";
import { SilverlifeService } from "../silverlife.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
})
export class ShoppingCartComponent implements OnInit {
  cartProductList: IProduct[] = [];
  calculateTotalAmount: number;
  deliveryFee: number;
  constructor(public service: SilverlifeService, private router: Router) {}

  ngOnInit(): void {
    this.cartProductList = [
      {
        id: 12,
        name: "Medical Tape - 3 inch",
        subCategoryId: 4,
        price: 500,
        imgAddress: "",
        details: "",
        isSale: false,
        isPopular: false,
        salePercent: "",
        selectedCount: 4,
        overview: "Tape of Tapes",
      },
    ];
    this.service.cartList = this.cartProductList;
    this.getTotalProductAmount();
    this.deliveryFee = 200;
  }
  changeProductCount(product: IProduct, action: number) {
    if (product.selectedCount + action !== 0) {
      product.selectedCount += action;
    }
  }

  getTotalProductAmount(): number {
    return this.cartProductList.reduce((a, v) => {
      a = a + v.selectedCount * v.price;
      return a;
    }, 0);
  }

  removeProduct(product: IProduct) {
    this.cartProductList = this.cartProductList.filter(
      (v) => v.id !== product.id
    );
  }
  navigateToUserInfoPage() {
    this.service.cartTotalAmount = this.getTotalAmount();
    this.router.navigate(["/user-details"]);
  }

  getTotalAmount() {
    return this.getTotalProductAmount() + this.deliveryFee;
  }
}
