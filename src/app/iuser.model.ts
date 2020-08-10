import { Time } from "@angular/common";

export interface IUser {
  address?: string;
  date_created?: Time;
  email: string;
  first_name?: string;
  is_forgot_pwd?: string;
  last_name?: string;
  mobile?: string;
  password: string;
  payment_mode?: string;
  role?: string;
  user_name?: string;
  id?: string;
}
