import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { switchMap, map, filter, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { of, combineLatest } from "rxjs";
import { SubCategory } from "../category/sub-category/SubcategoryModel";
@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
})
export class ItemListComponent implements OnInit {
  @Input() header;
  @Input() hideAllNewLink = true;
  @Input() isPopular: boolean | undefined;
  @Input() isSale: boolean | undefined;
  showAdvisories = false;
  categoryInfoObj: any = {};
  productList;
  overviewOfSubcategory: SubCategory;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!!this.isPopular || !!this.isSale) {
      this.http
        .get("../assets/JsonData/Products.json")
        .pipe(catchError((err) => of(err)))
        .subscribe((data) => {
          if (this.isPopular != undefined) {
            this.productList = data.products.filter((v) => v.isPopular);
          } else {
            this.productList = data.products.filter((v) => v.isSale);
          }
        });
    } else {
      this.activatedRoute.queryParamMap
        .pipe(
          filter((params: any) => !!params && !!params.params.category),
          switchMap((params: any) => {
            this.categoryInfoObj = { ...params };
            return combineLatest([of(this.categoryInfoObj)]);
          }),
          switchMap((category: any) => {
            return combineLatest([
              of(category),
              this.http
                .get("../assets/JsonData/Products.json")
                .pipe(catchError((err) => of(err))),
              this.http
                .get("../assets/JsonData/SubCategories.json")
                .pipe(catchError((err) => of(err))),
            ]);
          }),
          map(([category, products, subcategories]) => {
            this.overviewOfSubcategory = subcategories.subCategories.filter(
              (v) => v.categoryId === category[0].params.category
            )[0];
            return products.products.filter(
              (v) => v.subCategoryId == category[0].params.subcategory
            );
            //return products.products.filter((v) => v.subCategoryId === 3);
          }),
          catchError((err) => of(err))
        )
        .subscribe((data) => {
          this.productList = data;
        });
    }
  }
  openProductDetailPage(productId: string) {
    this.router.navigate(["product-detail", productId]);
  }
}
