import { Component, OnInit } from "@angular/core";
import "../../assets/js/smtp.js";
import { APP_MAIL } from "../mail-constants.js";
declare let Email: any;
@Component({
  selector: "app-contact-mail",
  templateUrl: "./contact-mail.component.html",
  styleUrls: ["./contact-mail.component.scss"],
})
export class ContactMailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    //this.sendEmail();
  }
  sendEmail() {
    Email.send({
      Host: "smtp.elasticemail.com",

      Username: APP_MAIL.Username,

      Password: APP_MAIL.Password,

      To: "goeldiksha94@gmail.com",

      From: APP_MAIL.Username,

      Subject: "Test Mail",

      Body: `
      <i>This is sent as a feedback from my resume page.</i> 
      <br/> 
      <b>Name: </b> Darshan<br /> <b>Email: </b>Test Mailm<br />
      <b> This is the test mail from elastic mail...kafi der dhundne k bad free ka mail server mila lets see kitna accurate rehta 
      hai</b>
      
      `,
    }).then((message) => {
      alert(message);
    });
  }
}
