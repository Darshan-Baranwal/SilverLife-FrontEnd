import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError, filter } from "rxjs/operators";
import { of } from "rxjs";
import { ICategory } from "./CategoryModel";
import { Router } from "@angular/router";
import { SilverlifeService } from "../silverlife.service";
import { SubCategory } from "./sub-category/SubcategoryModel";
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  toggleSubCategoryList: boolean = false;
  categories: ICategory[] = [];
  selectedCategorySubCategories: SubCategory[];
  selectedCategory: ICategory;
  constructor(
    private http: HttpClient,
    private router: Router,
    private service: SilverlifeService
  ) {}

  ngOnInit(): void {
    this.http
      .get("../assets/JsonData/Categories.json")
      .pipe(
        map((response: Response) => {
          return response;
        }),
        catchError((err) => {
          console.log(err);
          return of(err);
        })
      )
      .subscribe((data) => {
        this.categories = data.categories;
      });
  }
  openSubCategoryList(category: ICategory) {
    this.selectedCategory = category;
    this.http
      .get<{ subCategories: SubCategory[] }>(
        "../assets/JsonData/SubCategories.json"
      )
      .pipe(
        map((response) => {
          return response.subCategories;
        }),
        filter((data) => !!data),
        catchError((err) => {
          console.log(err);
          return of(err);
        })
      )
      .subscribe((data) => {
        this.selectedCategorySubCategories = data.filter(
          (v: SubCategory) => v.categoryId === category.id
        );
      });
    this.toggleSubCategoryList = !this.toggleSubCategoryList;
  }
  navigateToProductListpage(subcategory: SubCategory) {
    this.service.navigateToProductListpage(
      "item-list",
      undefined,
      this.selectedCategory,
      subcategory
    );
  }
}
