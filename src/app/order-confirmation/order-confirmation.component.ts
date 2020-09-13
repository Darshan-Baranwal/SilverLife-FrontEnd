import { Component, OnInit } from "@angular/core";
import { SilverlifeService } from "../silverlife.service";
import { LocationStrategy } from "@angular/common";
import { DateUtils } from "../dateUtils";
import { DELIVERY_DURATION } from "../shared/constants";
import { Router } from "@angular/router";

@Component({
  selector: "app-order-confirmation",
  templateUrl: "./order-confirmation.component.html",
  styleUrls: ["./order-confirmation.component.scss"],
})
export class OrderConfirmationComponent implements OnInit {
  base64textString: string;
  dateUtils = DateUtils;
  deliverydays = DELIVERY_DURATION.deliveryDays;
  constructor(
    public service: SilverlifeService,
    private location: LocationStrategy,
    private router: Router
  ) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  ngOnInit(): void {
    if (!this.service.orderDetails) {
      this.router.navigate(["/home"]);
    }
  }
  openfile(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
    debugger;
  }

  _handleReaderLoaded(e) {
    var binaryString = e.target.result;
    this.base64textString = "data:image/png;base64," + btoa(e.target.result);
  }
}
