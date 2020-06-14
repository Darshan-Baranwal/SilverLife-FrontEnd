import { Injectable } from '@angular/core';
import { ICategory } from './category/CategoryModel';
import { Router } from '@angular/router';
import { CATEGORY_QUERY_PARAMETER } from './shared/constants';

@Injectable({
  providedIn: 'root'
})
export class SilverlifeService {

  constructor(private router: Router) { }
  navigateToProductListpage(routeLink: string, majorCategory, category:ICategory, subcategory) {
    const queryParams = CATEGORY_QUERY_PARAMETER.query;
    queryParams.queryParams.majorCategory = majorCategory;
    queryParams.queryParams.category = category?.name;
    queryParams.queryParams.subcategory = subcategory?.name;
    this.router.navigate([routeLink], queryParams);
  }
}
