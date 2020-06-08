import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SearchComponent } from './search/search.component';
import { SideDrawerComponent } from './side-drawer/side-drawer.component';
import { BannerComponent } from './home/banner/banner.component';
import { CategoryComponent } from './category/category.component';
import { CategoryCardComponent } from './category/category-card/category-card.component';
import { AdvisoryComponent } from './advisory/advisory.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemListHeaderComponent } from './item-list/item-list-header/item-list-header.component';
import { ItemComponent } from './item-list/item/item.component';
import { ReviewTrackingComponent } from './review-tracking/review-tracking.component';
import { QualitiesComponent } from './qualities/qualities.component';
import { FooterComponent } from './footer/footer.component';
import { LoginRegisterComponent } from './login-register/login-register.component';

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
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
