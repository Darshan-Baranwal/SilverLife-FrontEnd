import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SilverlifeService } from "../silverlife.service";
import { validateNewPassword } from "../shared/constants";
import { FirebaseApiService } from "../firebase-api.service";
import { takeUntil, mergeMap, map, first } from "rxjs/operators";
import { Subject } from "rxjs";
import { IUser } from "../iuser.model";
import { Router } from "@angular/router";
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  changePassword: FormGroup;
  constructor(
    private service: SilverlifeService,
    public fireBaseAPi: FirebaseApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.changePassword = new FormGroup({
      email: new FormControl(
        this.service.loggedInUser.email,
        Validators.required
      ),
      oldPwd: new FormControl("", Validators.required),
      newPwd: new FormControl("", [
        Validators.required,
        validateNewPassword.bind(this),
      ]),
    });
  }
  changePwd() {
    this.service.loggedInUser.password = this.changePassword.get(
      "oldPwd"
    ).value;
    this.fireBaseAPi
      .loginUser(this.service.loggedInUser)
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
            alert("User/Password is not correct");
          } else {
            const newuser: IUser = {
              ...this.service.loggedInUser,
              password: this.changePassword.get("newPwd").value,
            };
            this.fireBaseAPi
              .updateUser(newuser)
              .then((res) => {
                alert("Password changed succesfully");
                this.router.navigate(["account/login"]);
              })
              .catch((rej) => {
                alert("Password failed to change");
              });
            return users;
          }
        })
      )
      .subscribe((data) => console.log(data));
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
