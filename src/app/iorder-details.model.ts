import { IUserAddress } from "./iuser-address.model";
import { IProduct } from "./item-list/ProductModel";

export interface IOrder {
  id?: string;
  user_details: IUserAddress;
  product_details: IProduct[];
  total_price: number;
  payment_mode: string;
  order_date_time: string;
}
