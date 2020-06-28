import { Component, OnInit, Input } from "@angular/core";
import { SubCategory } from "src/app/category/sub-category/SubcategoryModel";

@Component({
  selector: "app-item-list-header",
  templateUrl: "./item-list-header.component.html",
  styleUrls: ["./item-list-header.component.scss"],
})
export class ItemListHeaderComponent implements OnInit {
  @Input() header: string;
  @Input() hideAllNewLink;
  constructor() {}

  ngOnInit(): void {}
}
