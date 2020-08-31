import { IProduct } from "./ProductModel";

export interface CartProducts {
  userId: string;
  cartProducts: IProduct[];
  cartId?: string;
}
