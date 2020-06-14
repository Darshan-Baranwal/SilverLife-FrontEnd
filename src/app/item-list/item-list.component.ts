import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {PRODUCT_TYPE} from '../shared/constants'
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input() header;
  @Input() hideAllNewLink;
  showAdvisories: boolean= false;
  productTypeForFilter: string;
  categoryInfoObj={};
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      (params) => {
        this.categoryInfoObj = {...params};
        //@ts-ignore
        console.log(this.categoryInfoObj.params);
      }
    )
  }
  openProductDetailPage(productId: string) {
    this.router.navigate(['product-detail', productId]);
  }

}
