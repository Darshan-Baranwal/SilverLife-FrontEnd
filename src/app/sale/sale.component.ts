import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sale",
  templateUrl: "./sale.component.html",
  styleUrls: ["./sale.component.scss"],
})
export class SaleComponent implements OnInit {
  isSale: boolean;
  constructor() {}

  ngOnInit(): void {
    this.isSale = true;
  }
}
