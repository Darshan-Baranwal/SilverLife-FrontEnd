export enum PRODUCT_TYPE {
  SeasonalBanner = "seasonal-items",
}
const query = {
  queryParams: { majorCategory: "popular", category: null, subcategory: null },
};

export const CATEGORY_QUERY_PARAMETER = {
  query,
};
const successSrc = {
  src:
    "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",
};
export const SUCCESS_IMAGE_BASE64 = {
  successSrc,
};
