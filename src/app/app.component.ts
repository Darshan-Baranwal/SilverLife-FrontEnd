import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { UrlStateService } from "./url-state.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "SilverLife";
  toggleSideDrawer: boolean = false;
  previousUrl: string = null;
  currentUrl: string = null;
  @ViewChild("mainContainer", { static: false }) mainContainer;
  toggleDrawerForSideDrawer(event) {
    this.toggleSideDrawer = !this.toggleSideDrawer;
  }
  constructor(private router: Router, private urlService: UrlStateService) {}
  ngOnInit() {
    this.getPreviousUrl();
  }
  getPreviousUrl() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        this.urlService.previousUrls.push(this.previousUrl);
        this.urlService.previousUrls.push(this.currentUrl);
        if (this.urlService.previousUrls.length > 4) {
          this.urlService.previousUrls.shift();
          this.urlService.previousUrls.shift();
        }
        this.urlService.setPreviousUrl(this.previousUrl);
      });
  }
  navigateTo() {
    alert("navigate working");
  }
}
