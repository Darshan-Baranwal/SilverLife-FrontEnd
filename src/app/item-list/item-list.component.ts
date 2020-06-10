import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  openProductDetailPage(productId: string) {
    this.router.navigate(['product-detail', productId]);
  }

}
