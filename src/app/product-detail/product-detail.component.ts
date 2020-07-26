import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SilverlifeService } from "../silverlife.service";
import { filter, switchMap, catchError, map } from "rxjs/operators";
import { combineLatest, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IProduct } from "../item-list/ProductModel";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  count: number;
  productDetail: IProduct;
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
        map(([params, products]) => {
          //return products.products.filter(v => v.subCategoryId === category[0].params.subcategory);
          return products.products.filter((v) => v.id == params[0].get("id"));
        }),
        catchError((err) => of(err))
      )
      .subscribe((data) => {
        this.productDetail = data[0];
        console.log(data);
      });
  }
  changeProductCount(action: number) {
    if (this.count + action !== 0) {
      this.count += action;
    }
  }
  addTocart() {
    this.service.cartList.push({
      name: "sample product",
      selectedCount: this.count,
    });
    this.service.informCartInNavigation.next({
      name: "sample product",
      selectedCount: this.count,
    });
    this.router.navigate(["/shopping-cart"]);
  }
}
