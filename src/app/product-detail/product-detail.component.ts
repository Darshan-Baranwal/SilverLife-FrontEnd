import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SilverlifeService } from '../silverlife.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  count: number;
  constructor(private activateRoute: ActivatedRoute, public service: SilverlifeService) { }
  productId: string;
  ngOnInit(): void {
    this.count = 1;
    this.productId = this.activateRoute.snapshot.paramMap.get('id');
    console.log(this.productId);
  }
  changeProductCount(action: number) {
    if((this.count + action)!==0){
      this.count+=action;
    }
  }
  addTocart() {
    this.service.cartList.push({name: "sample product", selectedCount: this.count});
    this.service.informCartInNavigation.next({name: "sample product", selectedCount: this.count});
  }
}
