import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute) { }
  productId: string;
  ngOnInit(): void {
    
    this.productId = this.activateRoute.snapshot.paramMap.get('id');
    console.log(this.productId);
  }

}
