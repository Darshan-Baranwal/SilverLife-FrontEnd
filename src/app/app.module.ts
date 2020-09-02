import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { SearchComponent } from "./search/search.component";
import { SideDrawerComponent } from "./side-drawer/side-drawer.component";
import { BannerComponent } from "./home/banner/banner.component";
import { CategoryComponent } from "./category/category.component";
import { CategoryCardComponent } from "./category/category-card/category-card.component";
import { AdvisoryComponent } from "./advisory/advisory.component";
import { ItemListComponent } from "./item-list/item-list.component";
import { ItemListHeaderComponent } from "./item-list/item-list-header/item-list-header.component";
import { ItemComponent } from "./item-list/item/item.component";
import { ReviewTrackingComponent } from "./review-tracking/review-tracking.component";
import { QualitiesComponent } from "./qualities/qualities.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginRegisterComponent } from "./login-register/login-register.component";
import { MajorCategoriesComponent } from "./major-categories/major-categories.component";
import { SeasonalBannerComponent } from "./seasonal-banner/seasonal-banner.component";
import { AccountComponent } from "./account/account.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { PopularComponent } from "./popular/popular.component";
import { SaleComponent } from "./sale/sale.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { SubCategoryComponent } from "./category/sub-category/sub-category.component";
import { AutoCloseDirective } from "./auto-close.directive";
import { HttpClientModule } from "@angular/common/http";
import { SilverlifeService } from "./silverlife.service";
import { ContactMailComponent } from "./contact-mail/contact-mail.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { OrderConfirmationComponent } from "./order-confirmation/order-confirmation.component";
import { BlogComponent } from "./blog/blog.component";
import { ItemOverviewComponent } from "./item-list/item-overview/item-overview.component";
import { NgMarqueeModule } from "ng-marquee";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FirebaseApiService } from "./firebase-api.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductUploadComponent } from "./product-upload/product-upload.component";
import { SubcategoriesModalComponent } from "./subcategories-modal/subcategories-modal.component";
import { CategoriesModalComponent } from './categories-modal/categories-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    SearchComponent,
    SideDrawerComponent,
    BannerComponent,
    CategoryComponent,
    CategoryCardComponent,
    AdvisoryComponent,
    ItemListComponent,
    ItemListHeaderComponent,
    ItemComponent,
    ReviewTrackingComponent,
    QualitiesComponent,
    FooterComponent,
    LoginRegisterComponent,
    MajorCategoriesComponent,
    SeasonalBannerComponent,
    AccountComponent,
    ShoppingCartComponent,
    ProductDetailComponent,
    PopularComponent,
    SaleComponent,
    AboutUsComponent,
    SubCategoryComponent,
    AutoCloseDirective,
    ContactMailComponent,
    UserDetailsComponent,
    OrderConfirmationComponent,
    BlogComponent,
    ItemOverviewComponent,
    ProductUploadComponent,
    SubcategoriesModalComponent,
    CategoriesModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgMarqueeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [SilverlifeService, FirebaseApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
