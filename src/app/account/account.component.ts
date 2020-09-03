import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { SilverlifeService } from "../silverlife.service";
@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    public service: SilverlifeService
  ) {}
  ngOnInit() {
    this.router.navigate(["login"], { relativeTo: this.activateRoute });
  }
}
