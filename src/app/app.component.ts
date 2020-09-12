import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { UrlStateService } from "./url-state.service";
import { SilverlifeService } from "./silverlife.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "SilverLife";
  toggleSideDrawer = false;
  previousUrl: string = null;
  currentUrl: string = null;
  logoutClicked = false;
  @ViewChild("mainContainer", { static: false }) mainContainer;
  toggleDrawerForSideDrawer(event) {
    this.toggleSideDrawer = !this.toggleSideDrawer;
  }
  constructor(
    private router: Router,
    private urlService: UrlStateService,
    public service: SilverlifeService
  ) {}
  ngOnInit() {
    if (sessionStorage.getItem("userInfo")) {
      this.restoreAfterReload();
    }
    this.getPreviousUrl();
  }
  getPreviousUrl() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        this.urlService.previousUrls = JSON.parse(
          sessionStorage.getItem("previousUrls")
        );
        this.urlService.previousUrls.push(this.previousUrl);
        this.urlService.previousUrls.push(this.currentUrl);

        if (this.urlService.previousUrls.length > 4) {
          this.urlService.previousUrls.shift();
          this.urlService.previousUrls.shift();
        }
        this.urlService.setPreviousUrl(this.previousUrl);
        sessionStorage.setItem(
          "previousUrls",
          JSON.stringify(this.urlService.previousUrls)
        );
      });
  }
  actionSignSignOut() {
    this.toggleSideDrawer = false;
    if (!!this.service.loggedInUser) {
      this.logoutClicked = !this.logoutClicked;
    }
  }
  navigateTo() {
    alert("navigate working");
  }

  restoreAfterReload() {
    this.service.loggedInUser = JSON.parse(sessionStorage.getItem("userInfo"));
    this.service.cartList = JSON.parse(sessionStorage.getItem("userCartList"));
    if (JSON.parse(sessionStorage.getItem("previousUrls")) !== null) {
      this.urlService.previousUrls = JSON.parse(
        sessionStorage.getItem("previousUrls")
      );
    }
    this.service.sendUserDetail.next(this.service.loggedInUser);
  }
  listItemClicked(listItemName: string) {
    this.toggleSideDrawer = false;
    if (listItemName === "blog") {
      setTimeout(() => {
        this.service.focusToAdvisory.next("advisory");
        this.router.navigate(["/home"]);
      }, 10);
    } else if (listItemName === "category") {
      this.service.showCategoryListModalForMobile.next("category");
    }
  }
}
