import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { HomeComponent } from "./home/home.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { PopularComponent } from "./popular/popular.component";
import { SaleComponent } from "./sale/sale.component";
import { CategoryComponent } from "./category/category.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ItemListComponent } from "./item-list/item-list.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { OrderConfirmationComponent } from "./order-confirmation/order-confirmation.component";
import { BlogComponent } from "./blog/blog.component";

const routes: Routes = [
  { path: "account", component: AccountComponent },
  { path: "home", component: HomeComponent },
  { path: "shopping-cart", component: ShoppingCartComponent },
  { path: "product-detail/:id", component: ProductDetailComponent },
  { path: "popular", component: PopularComponent },
  { path: "sale", component: SaleComponent },
  { path: "categories", component: CategoryComponent },
  { path: "aboutUs", component: AboutUsComponent },
  { path: "item-list", component: ItemListComponent },
  { path: "user-details", component: UserDetailsComponent },
  { path: "order-successful", component: OrderConfirmationComponent },
  { path: "blog/:id", component: BlogComponent, pathMatch: "full" },
  { path: "blog", component: BlogComponent, pathMatch: "full" },
  { path: "", pathMatch: "full", redirectTo: "home" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
