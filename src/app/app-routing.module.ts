import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PopularComponent } from './popular/popular.component';
import { SaleComponent } from './sale/sale.component';


const routes: Routes = [
  {path: 'account', component: AccountComponent},
  {path: 'home', component: HomeComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'popular', component: PopularComponent},
  {path: 'sale', component: SaleComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
