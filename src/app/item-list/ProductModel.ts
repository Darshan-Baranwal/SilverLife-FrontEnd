export interface IProduct {
  id?: number;
  name?: string;
  subCategoryId?: number;
  price?: number;
  imgAddress?: string;
  details?: string;
  isSale?: boolean;
  isPopular?: boolean;
  salePercent?: string;
  selectedCount?: number;
  product_detail?: IProductDetail;
}

export interface IProductDetail {
  overview?: string;
  usage?: string;
  specification?: string;
  precaution?: string;
}
