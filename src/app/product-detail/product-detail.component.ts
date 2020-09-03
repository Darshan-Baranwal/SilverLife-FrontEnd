import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SilverlifeService } from '../silverlife.service';
import { filter, switchMap, catchError, map, tap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../item-list/ProductModel';
import { FirebaseApiService } from '../firebase-api.service';
import { CartProducts } from '../item-list/CartProducts.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  count: number;
  productDetail: IProduct;
  productVariants: IProduct[] = [];
  selectedVarianted: IProduct;
  btnText = 'Add to Cart';
  constructor(
    private activateRoute: ActivatedRoute,
    public service: SilverlifeService,
    private router: Router,
    private http: HttpClient,
    private firestore: FirebaseApiService
  ) {}
  productId: string;
  ngOnInit(): void {
    this.count = 1;
    this.productId = this.activateRoute.snapshot.paramMap.get('id');
    this.activateRoute.paramMap
      .pipe(
        filter((params: any) => !!params && !!params.get('id')),
        switchMap((params: any) => {
          return combineLatest([of(params)]);
        }),
        switchMap((params: any) => {
          return combineLatest([
            of(params),
            this.http
              .get('../assets/JsonData/Products.json')
              .pipe(catchError((err) => of(err))),
          ]);
        }),

        map(([params, products]: [any, { [key: string]: IProduct[] }]) => {
          // return products.products.filter(v => v.subCategoryId === category[0].params.subcategory);
          const selectedProduct: IProduct = products.products.filter(
            (v) => v.id == params[0].get('id')
          )[0];
          this.selectedVarianted = selectedProduct;
          if (selectedProduct.hasVariant) {
            this.productVariants = products.products.filter(
              (v) => v.hasVariant && v.variantId === selectedProduct.variantId
            );
          }
          return selectedProduct;
        }),
        catchError((err) => of(err))
      )
      .subscribe((data) => {
        this.productDetail = data;
      });
  }
  changeProductCount(action: number) {
    if (this.productDetail.selectedCount + action !== 0) {
      this.productDetail.selectedCount += action;
    }
  }
  addGOTocart() {
    if (this.btnText === 'Add to Cart') {
      if (!this.service.loggedInUser) {
        this.router.navigate(['/account']);
      } else {
        this.getCartSaved().then((res) => {
          console.log(res);
          this.firestore
            .getAllCartList(this.service.loggedInUser.id)
            .pipe(
              map((data) => {
                return data.map((e) => {
                  return {
                    id: e.payload.doc.id,
                    data: e.payload.doc.data(),
                  };
                });
              })
            )
            .subscribe((data: any) => {
              console.log(data);
              this.service.cartList = data[0].data;
              this.service.cartList.cartId = data[0].id;
              this.service.informCartInNavigation.next(this.productDetail);
            });
        });
      }
      this.btnText = 'Go to Cart';
    } else {
      this.btnText = 'Add to Cart';
      this.router.navigate(['/shopping-cart']);
    }
  }

  getCartSaved(): Promise<any> {
    if (!!this.service.cartList) {
      this.service.cartList.cartProducts.push(this.productDetail);
    }
    return !this.service.cartList
      ? this.firestore.addUserInCartTable({
          cartProducts: [this.productDetail],
          userId: this.service.loggedInUser.id,
        })
      : this.firestore.updateCart(this.service.cartList);
  }
  loadSelelectedVariant(selectedProduct: IProduct) {
    this.productDetail = this.selectedVarianted;
  }
}
