export enum PRODUCT_TYPE {
    SeasonalBanner = "seasonal-items"
}
const query = { queryParams: { 'majorCategory': 'popular', 'category': 'not-cheap', 'subcategory':  ''} };

export const CATEGORY_QUERY_PARAMETER = {
    query
}