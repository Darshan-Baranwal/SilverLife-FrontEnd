import { Component, OnInit } from "@angular/core";
import { SilverlifeService } from "../silverlife.service";

@Component({
  selector: "app-order-confirmation",
  templateUrl: "./order-confirmation.component.html",
  styleUrls: ["./order-confirmation.component.scss"],
})
export class OrderConfirmationComponent implements OnInit {
  base64textString: string;
  constructor(public service: SilverlifeService) {}

  ngOnInit(): void {}
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
    this.base64textString = 'data:image/png;base64,' + btoa(e.target.result);
    console.log(btoa(binaryString));
  }
}
