import { Component, OnInit } from '@angular/core';
import { SilverlifeService } from '../silverlife.service';
import {Router} from '@angular/router';
import '../../assets/js/smtp.js';
declare let Email: any;
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(public service: SilverlifeService, private router: Router) { }

  ngOnInit(): void {
  }

  proceedToOrder() {
    this.sendEmail().then( message => {
      this.router.navigate(['/order-successful']);
    });

  }
  sendEmail() {

    return Email.send({

      Host : "smtp.elasticemail.com",

      Username : 'only4apps15@gmail.com',

      Password : '5A8CD76F9586056401874BD1E558CD5B6F05',

      To : 'goeldiksha94@gmail.com',

      From : 'only4apps15@gmail.com',

      Subject : "Test Mail",

      Body :`
      <div class="OrderConfirmation">
  <div>
      <img class="success" src="Images/success.png">
  </div>
  <h2>Your order has been confirmed!</h2>
  <h4>Below are order details</h4>
  <div>
  <div class="details">
      <div class="detailsRow">
          <div class="rightBorder">Order Number</div>
          <div>110022333</div>
      </div>
      <div class="detailsRow">
          <div class="rightBorder">Order Date</div>
          <div>24 June 2020</div>
      </div>
      <div class="detailsRow">
          <div class="rightBorder">Expected Delivery Date</div>
          <div>1 July 2020</div>
      </div>
      <div class="detailsRow">
          <div class="rightBorder">Total Amount</div>
          <div>Rs ${this.service.cartTotalAmount}</div>
      </div>
  </div>
</div>
      `
          });

      }
}
