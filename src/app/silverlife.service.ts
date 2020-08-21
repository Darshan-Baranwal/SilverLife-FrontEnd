import { Injectable } from "@angular/core";
import { ICategory } from "./category/CategoryModel";
import { Router } from "@angular/router";
import { CATEGORY_QUERY_PARAMETER } from "./shared/constants";
import { SubCategory } from "./category/sub-category/SubcategoryModel";
import { IProduct } from "./item-list/ProductModel";
import { BehaviorSubject } from "rxjs";
import { IUser } from "./iuser.model";
import { IUserAddress } from "./iuser-address.model";
import { IOrder } from "./iorder-details.model";
import { CartProducts } from "./item-list/CartProducts.model";

@Injectable({
  providedIn: "root",
})
export class SilverlifeService {
  informCartInNavigation = new BehaviorSubject<IProduct>(null);
  cartList: CartProducts = {
    cartProducts: [],
    userId: "",
  };
  cartTotalAmount: number;
  loggedInUser: IUser = null;
  loggedInUserAddress: IUserAddress[] = null;
  selectedAddress: IUserAddress = null;
  orderDetails: IOrder = null;
  sendUserDetail = new BehaviorSubject<IUser>(null);
  constructor(private router: Router) {}
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
}
