import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { SilverlifeService } from "../silverlife.service";
import { filter, map, catchError } from "rxjs/operators";
import { IProduct } from "../item-list/ProductModel";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { ICategory } from "../category/CategoryModel";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  openCloseSearchModal: boolean = false;
  categories: ICategory[] = [];
  selectedCategory: ICategory;
  isCategoryHovered: boolean = false;
  isCategoryClickedFromMobile = false;
  @Output() toggleDrawer = new EventEmitter<void>();
  newAddedProduct: IProduct;
  toggleNewItemAddedToCartModal: boolean = false;
  toggleSubCategoryList: boolean = false;
  constructor(
    private router: Router,
    public service: SilverlifeService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCartInfo();
    this.getCategoriesList();
    this.getCategoryModalForMobile();
    this.isCategoryClickedFromMobile = false;
    this.isCategoryHovered = false;
  }
  toggleCategoryModal() {
    this.isCategoryClickedFromMobile = false;
    document.body.style.position = "";
    document.body.style.top = "";
  }
  getCategoryModalForMobile() {
    this.service.showCategoryListModalForMobile.subscribe((data) => {
      this.isCategoryClickedFromMobile = true;
    });
  }
  getCategoriesList() {
    this.http
      .get("../assets/JsonData/Categories.json")
      .pipe(
        map((response: Response) => {
          return response;
        }),
        catchError((err) => {
          return of(err);
        })
      )
      .subscribe((data) => {
        this.categories = data.categories;
      });
  }
  getCartInfo() {
    this.service.informCartInNavigation
      .pipe(filter((data) => !!data))
      .subscribe((data) => {
        this.newAddedProduct = null;
        this.newAddedProduct = data;
        this.toggleNewItemAddedToCartModal = true;
        setTimeout(() => {
          this.toggleNewItemAddedToCartModal = false;
        }, 1500);
      });
  }
  navigateTo(routerLink) {
    this.router.navigate([routerLink]);
    this.service.focusToAdvisory.next("");
  }
  openDrawer() {
    this.toggleDrawer.emit();
  }
  logout() {
    this.service.sendUserDetail.next(null);
    this.service.loggedInUser = null;
    this.service.cartList = {
      cartProducts: [],
      userId: "",
    };
    sessionStorage.setItem(
      "userCartList",
      JSON.stringify(this.service.cartList)
    );
    this.router.navigate(["/home"]);
  }
  openSubCategory(selectedCategory: ICategory) {
    this.isCategoryClickedFromMobile = false;
    this.selectedCategory = selectedCategory;
    this.toggleSubCategoryList = !this.toggleSubCategoryList;
  }
  focusToAdvisory() {
    this.router.navigate(["/home"]);
    this.service.focusToAdvisory.next("advisory");
  }
}
