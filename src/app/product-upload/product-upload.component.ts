import { Component, OnInit } from "@angular/core";
import * as ProductJson from "../../assets/JsonData/Products.json";
@Component({
  selector: "app-product-upload",
  templateUrl: "./product-upload.component.html",
  styleUrls: ["./product-upload.component.scss"],
})
export class ProductUploadComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log(ProductJson.default.products);
  }
}
