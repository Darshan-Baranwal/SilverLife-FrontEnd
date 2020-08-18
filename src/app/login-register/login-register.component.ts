import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  AfterViewInit,
} from "@angular/core";
import { FirebaseApiService } from "../firebase-api.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { IUser } from "../iuser.model";
import {
  map,
  filter,
  switchMap,
  takeUntil,
  flatMap,
  tap,
} from "rxjs/operators";
import { of, Subject, Subscription } from "rxjs";
import { SilverlifeService } from "../silverlife.service";
import { validateConfirmPassword } from "../shared/constants";
import { UrlStateService } from "../url-state.service";

@Component({
  selector: "app-login-register",
  templateUrl: "./login-register.component.html",
  styleUrls: ["./login-register.component.scss"],
})
export class LoginRegisterComponent
  implements OnInit, OnDestroy, AfterViewInit {
  subscriptionObj: Subscription;
  isLogin: boolean = false;
  loginRegisterForm: FormGroup;
  usersList = [];
  destroy$ = new Subject();
  previousUrl: string = null;
  currentUrl: string = null;
  constructor(
    private router: Router,
    public fireBaseAPi: FirebaseApiService,
    public activateRoute: ActivatedRoute,
    public service: SilverlifeService,
    public urlService: UrlStateService
  ) {}
  ngOnInit(): void {
    this.loginRegisterForm = new FormGroup({
      userName: new FormControl(""),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", [
        validateConfirmPassword.bind(this),
      ]),
      phoneNumber: new FormControl("", Validators.pattern("^[0-9_-]{10,12}")),
    });
    this.activateRoute.data.pipe().subscribe((data) => {
      this.isLogin = data.activatedTab == "login" ? true : false;
      if (!this.isLogin) {
        this.loginRegisterForm
          .get("userName")
          .setValidators(Validators.required);
      } else {
        this.loginRegisterForm.get("userName").setValidators(null);
        this.loginRegisterForm.get("confirmPassword").setValidators(null);
      }
    });

    this.loginRegisterForm.get("phoneNumber").valueChanges.subscribe((data) => {
      if ((data + "").split("").length > 10)
        this.loginRegisterForm.patchValue({
          phoneNumber: (data + "").split("").slice(0, 10).join(""),
        });
    });
  }

  ngAfterViewInit() {
    //this.loginUser();
  }
  loginRegisterUser() {
    if (this.isLogin) {
      this.loginUser();
    } else {
      this.registerUser();
    }
  }
  registerUser() {
    this.subscriptionObj = this.fireBaseAPi
      .getUser()
      .pipe(
        takeUntil(this.destroy$),
        map((data) => {
          return data.map((e) => {
            return {
              id: e.payload.doc.id,
              data: e.payload.doc.data(),
            };
          });
        }),
        map((data: any) => {
          return data.filter((v) => {
            return v.data.email === this.loginRegisterForm.value.email;
          });
        }),
        tap((data) => {
          if (data.length > 0) {
            if (this.subscriptionObj) this.subscriptionObj.unsubscribe();
            alert("Email id is duplicate");
            this.loginRegisterForm.get("email").setValue("");
          } else {
            if (this.subscriptionObj) this.subscriptionObj.unsubscribe();
            this.fireBaseAPi
              .createUser({
                first_name: this.loginRegisterForm.value.userName,
                email: this.loginRegisterForm.value.email,
                password: this.loginRegisterForm.value.password,
                mobile: this.loginRegisterForm.value.phoneNumber,
              })
              .then((res) => {
                alert("user registered successfully");
                this.router.navigate(["../login"], {
                  relativeTo: this.activateRoute,
                });
                this.isLogin = true;
              })
              .catch((rej) => alert("rejected " + rej));
          }
        })
      )
      .subscribe();
  }
  loginUser() {
    const user: IUser = {
      email: this.loginRegisterForm.value.email,
      password: this.loginRegisterForm.value.password,
    };
    this.fireBaseAPi
      .loginUser(user)
      .pipe(
        takeUntil(this.destroy$),
        map((data) => {
          return data.map((e) => {
            return {
              id: e.payload.doc.id,
              data: e.payload.doc.data(),
            };
          });
        }),
        switchMap((users: any) => {
          if (users.length === 0) {
            alert("User not exist Please register");
          } else {
            this.service.loggedInUser = {
              ...users[0].data,
              id: users[0].id,
              password: "",
            };

            this.router.navigate([this.urlService.previousUrls[0]]);
            this.service.sendUserDetail.next(this.service.loggedInUser);
          }
          return users;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.subscriptionObj) this.subscriptionObj.unsubscribe();
  }
}
