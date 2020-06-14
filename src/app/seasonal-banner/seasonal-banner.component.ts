import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seasonal-banner',
  templateUrl: './seasonal-banner.component.html',
  styleUrls: ['./seasonal-banner.component.scss']
})
export class SeasonalBannerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateToProductList() {
    this.router.navigate(["item-list", "seasonal-items"]);
  }

}
