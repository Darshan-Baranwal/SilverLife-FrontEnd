import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PRODUCT_TYPE } from "../shared/constants";
import { switchMap, map, filter, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { zip, of, combineLatest } from "rxjs";
import { SubCategory } from "../category/sub-category/SubcategoryModel";
@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
})
export class ItemListComponent implements OnInit {
  @Input() header;
  @Input() hideAllNewLink = true;
  showAdvisories = false;
  productTypeForFilter: string;
  categoryInfoObj: any = {};
  productList;
  overviewOfSubcategory: SubCategory;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
              .get("../assets/Products/Products.json")
              .pipe(catchError((err) => of(err))),
            this.http
              .get("../assets/SubCategories/SubCategories.json")
              .pipe(catchError((err) => of(err))),
          ]);
        }),
        map(([category, products, subcategories]) => {
          this.overviewOfSubcategory = subcategories.subCategories.filter(
            (v) => v.id === 3
          )[0];
          console.log(this.overviewOfSubcategory);
          //return products.products.filter(v => v.subCategoryId === category[0].params.subcategory);
          return products.products.filter((v) => v.subCategoryId === 3);
        }),
        catchError((err) => of(err))
      )
      .subscribe((data) => {
        this.productList = data;
        console.log(data);
      });
  }
  openProductDetailPage(productId: string) {
    this.router.navigate(["product-detail", productId]);
  }
}
