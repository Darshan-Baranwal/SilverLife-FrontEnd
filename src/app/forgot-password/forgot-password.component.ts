import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FirebaseApiService } from "../firebase-api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SilverlifeService } from "../silverlife.service";
import { takeUntil, map, mergeMap, first } from "rxjs/operators";
import { Subject } from "rxjs";
import { IMail } from "../imail.model";
import { IUser } from "../iuser.model";
import { USER_DEFAULT_PWD } from "../mail-constants";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPassword: FormGroup;
  destroy$ = new Subject();
  constructor(
    public fireBaseAPi: FirebaseApiService,
    public activateRoute: ActivatedRoute,
    public service: SilverlifeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPassword = new FormGroup({
      userName: new FormControl(""),
      email: new FormControl("", Validators.required),
    });
  }
  forgotPwd() {
    console.log(this.forgotPassword.get("email").value);
    this.checkIfEmailIdExist();
  }
  checkIfEmailIdExist() {
    this.fireBaseAPi
      .forgotPwd(this.forgotPassword.get("email").value)
      .pipe(
        first(),
        takeUntil(this.destroy$),
        map((data) => {
          return data.map((e) => {
            return {
              id: e.payload.doc.id,
              data: e.payload.doc.data(),
            };
          });
        }),
        mergeMap((users: any) => {
          if (users.length === 0) {
            alert("Email not exist, enter correct email address");
          } else {
            this.sendNewPassword(users[0]);
            return users;
          }
        })
      )
      .subscribe();
  }
  sendNewPassword(user) {
    const mail: IMail = {
      To: "goeldiksha94@gmail.com",
      From: "only4apps15@gmail.com",
      Subject: "Test Mail",
      Body: this.getMailBody(),
    };
    this.service
      .sendMail(mail)
      .then((message) => {
        const newuser: IUser = {
          ...user.data,
          password: USER_DEFAULT_PWD.pwd,
          is_forgot_pwd: true,
          id: user.id,
        };
        this.fireBaseAPi
          .updatePwd(newuser)
          .then((res) => {
            this.router.navigate(["account/login"]);
            alert("Mail send succesfully");
          })
          .catch((rej) => {
            alert("Failed to send mail");
          });
      })
      .catch((rej) => {
        alert("Failed to send mail");
      });
  }
  getMailBody() {
    const body = `<h2>Your trial Password is ${USER_DEFAULT_PWD.pwd}</h2>
<a href="http://localhost:4200/account/login">Click to login</a>
<h3>For your password we request to Change your password once you logged in.</h3>
    `;
    return body;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
