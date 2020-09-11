import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { switchMap, map, filter, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { of, combineLatest } from "rxjs";
import { SubCategory } from "../category/sub-category/SubcategoryModel";
import { IProduct } from "./ProductModel";
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
  @Input() searchedProduct;
  searchedProductDetails: {
    categoryId: "";
    subcategoryId: "";
    searchedText: "";
  };
  showAdvisories = false;
  categoryInfoObj: any = {};
  productList: IProduct[];
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
          filter(
            (params: any) =>
              !!params &&
              (this.searchedProduct
                ? !!params.params.searchedText
                : !!params.params.category)
          ),
          switchMap((params: any) => {
            this.categoryInfoObj = { ...params };
            this.searchedProductDetails = { ...params.params };
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
          switchMap(([category, products, subcategories]) => {
            this.overviewOfSubcategory = subcategories.subCategories.filter(
              (v) =>
                v.categoryId === !!this.searchedProduct
                  ? category[0].params.categoryId
                  : category[0].params.category
            )[0];
            return of(
              products.products.filter((v) => {
                const id = !!this.searchedProduct
                  ? !!category[0].params.subcategoryId
                    ? category[0].params.subcategoryId
                    : v.subCategoryId
                  : category[0].params.subcategory;
                return v.subCategoryId === parseInt(id);
              })
            );
            //return products.products.filter((v) => v.subCategoryId === 3);
          }),
          catchError((err) => of(err))
        )
        .subscribe((data: IProduct[]) => {
          this.productList = !!this.searchedProduct
            ? data.filter((v) => {
                return (
                  v.name
                    .toLocaleLowerCase()
                    .includes(
                      this.searchedProductDetails.searchedText.toLocaleLowerCase()
                    ) ||
                  v.overview
                    .toLocaleLowerCase()
                    .includes(
                      this.searchedProductDetails.searchedText.toLocaleLowerCase()
                    )
                );
              })
            : data;
        });
    }
  }
  openProductDetailPage(productId: string) {
    this.router.navigate(["product-detail", productId]);
  }
}
