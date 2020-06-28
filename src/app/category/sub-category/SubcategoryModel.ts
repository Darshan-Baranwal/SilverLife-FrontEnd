import { IProductDetail } from "src/app/item-list/ProductModel";

export interface SubCategory {
  id: number;
  name: string;
  overview: string;
  usage: string;
  specification: string;
  categoryId: number;
  subcategory_detail: IProductDetail;
}
