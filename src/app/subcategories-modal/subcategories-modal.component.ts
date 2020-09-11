import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { ICategory } from "../category/CategoryModel";
import { HttpClient } from "@angular/common/http";
import { SubCategory } from "../category/sub-category/SubcategoryModel";
import { map, filter, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { SilverlifeService } from "../silverlife.service";

@Component({
  selector: "app-subcategories-modal",
  templateUrl: "./subcategories-modal.component.html",
  styleUrls: ["./subcategories-modal.component.scss"],
})
export class SubcategoriesModalComponent implements OnInit {
  @Input() selectedCategory: ICategory;
  selectedCategorySubCategories: SubCategory[] = [];
  @Output() toggleSubCategoryModal: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  constructor(private http: HttpClient, private service: SilverlifeService) {}

  ngOnInit(): void {
    this.getSubcategories();
  }
  getSubcategories() {
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
          return of(err);
        })
      )
      .subscribe((data) => {
        this.selectedCategorySubCategories = data.filter(
          (v: SubCategory) => v.categoryId === this.selectedCategory.id
        );
      });
  }
  navigateToProductListpage(subcategory: SubCategory) {
    this.toggleSubCategoryModal.emit();
    this.service.navigateToProductListpage(
      "item-list",
      undefined,
      this.selectedCategory,
      subcategory
    );
  }
}
