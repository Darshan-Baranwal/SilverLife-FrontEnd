import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { FirebaseApiService } from "../firebase-api.service";
import { SilverlifeService } from "../silverlife.service";
import { IUser } from "../iuser.model";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  constructor(
    private fireBaseAPi: FirebaseApiService,
    public service: SilverlifeService
  ) {}

  ngOnInit(): void {
    if (!!this.service.loggedInUser) this.createForm();
  }
  createForm() {
    this.editProfileForm = new FormGroup({
      user_name: new FormControl(
        this.service.loggedInUser.user_name,
        Validators.required
      ),
      first_name: new FormControl(
        this.service.loggedInUser.first_name,
        Validators.required
      ),
      last_name: new FormControl(
        this.service.loggedInUser.last_name,
        Validators.required
      ),
      email: new FormControl(
        this.service.loggedInUser.email,
        Validators.required
      ),
      mobile: new FormControl(
        this.service.loggedInUser.mobile,
        Validators.pattern("^[0-9_-]{10,12}")
      ),
    });
  }
  editProfile() {
    const newuser: IUser = {
      ...this.service.loggedInUser,
      ...this.editProfileForm.value,
    };
    this.fireBaseAPi
      .updateUserProfile(newuser)
      .then((res) => {
        alert("Profile updated succesfully");
      })
      .catch((rej) => {
        alert("Profile fail to update");
      });
  }
}
