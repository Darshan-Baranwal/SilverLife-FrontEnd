import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { tap, switchMap, filter } from "rxjs/operators";

@Component({
  selector: "app-searched-product",
  templateUrl: "./searched-product.component.html",
  styleUrls: ["./searched-product.component.scss"],
})
export class SearchedProductComponent implements OnInit {
  searchedProduct = true;
  constructor() {}

  ngOnInit(): void {}
}
