import { Component, OnInit, Input } from "@angular/core";
import { IProductDetail } from "../ProductModel";

@Component({
  selector: "app-item-overview",
  templateUrl: "./item-overview.component.html",
  styleUrls: ["./item-overview.component.scss"],
})
export class ItemOverviewComponent implements OnInit {
  @Input() details;
  selectedHeading: string;
  constructor() {}

  ngOnInit(): void {
    this.selectedHeading = "overview";
  }
  showDetail(selected: string) {
    this.selectedHeading = selected;
  }
}
