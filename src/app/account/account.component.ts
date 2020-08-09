import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  isLoginSelected: boolean = true;
  constructor(private router: Router, private activateRoute: ActivatedRoute) {}
  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((data: NavigationEnd) => {
        this.isLoginSelected = data.url.split("/").includes("login");
      });
    this.router.navigate(["login"], { relativeTo: this.activateRoute });
  }
  routeTo(isLogin: boolean) {
    this.isLoginSelected = isLogin;
    if (isLogin) {
      this.router.navigate(["login"], { relativeTo: this.activateRoute });
    } else {
      this.router.navigate(["register"], { relativeTo: this.activateRoute });
    }
  }
}
