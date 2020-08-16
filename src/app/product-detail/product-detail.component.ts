import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SilverlifeService } from "../silverlife.service";
import { filter, switchMap, catchError, map, tap } from "rxjs/operators";
import { combineLatest, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IProduct } from "../item-list/ProductModel";
import { Key } from "protractor";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  count: number;
  productDetail: IProduct;
  productVariants: IProduct[] = [];
  selectedVarianted: IProduct;
  btnText: string = "Add to Cart";
  constructor(
    private activateRoute: ActivatedRoute,
    public service: SilverlifeService,
    private router: Router,
    private http: HttpClient
  ) {}
  productId: string;
  ngOnInit(): void {
    this.count = 1;
    this.productId = this.activateRoute.snapshot.paramMap.get("id");
    console.log(this.productId);
    this.activateRoute.paramMap
      .pipe(
        filter((params: any) => !!params && !!params.get("id")),
        switchMap((params: any) => {
          return combineLatest([of(params)]);
        }),
        switchMap((params: any) => {
          return combineLatest([
            of(params),
            this.http
              .get("../assets/JsonData/Products.json")
              .pipe(catchError((err) => of(err))),
          ]);
        }),

        map(([params, products]: [any, { [key: string]: IProduct[] }]) => {
          //return products.products.filter(v => v.subCategoryId === category[0].params.subcategory);
          const selectedProduct: IProduct = products.products.filter(
            (v) => v.id == params[0].get("id")
          )[0];
          this.selectedVarianted = selectedProduct;
          if (selectedProduct.hasVariant) {
            this.productVariants = products.products.filter(
              (v) => v.hasVariant && v.variantId === selectedProduct.variantId
            );
          }
          return selectedProduct;
        }),
        catchError((err) => of(err))
      )
      .subscribe((data) => {
        this.productDetail = data;
        console.log(data);
        console.log(this.productVariants);
      });
  }
  changeProductCount(action: number) {
    if (this.count + action !== 0) {
      this.count += action;
    }
  }
  addGOTocart() {
    this.service.cartList.push(this.productDetail);
    this.service.informCartInNavigation.next(this.productDetail);
    if (this.btnText === "Add to Cart") {
      this.btnText = "Go to Cart";
    } else {
      this.btnText = "Add to Cart";
      this.router.navigate(["/shopping-cart"]);
    }
  }

  loadSelelectedVariant(selectedProduct: IProduct) {
    this.productDetail = this.selectedVarianted;
  }
}
