import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {
  map, catchError,
} from "rxjs/operators";
import { of } from 'rxjs';
import { ICategory } from './CategoryModel';
import { Router } from '@angular/router';
import { SilverlifeService } from '../silverlife.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  toggleSubCategoryList: boolean = false;
  categories:ICategory[]=[];
  selectedCategory: ICategory;
  constructor(private http: HttpClient, private router: Router, private service: SilverlifeService) { }

  ngOnInit(): void {
    this.http.get('../assets/Cards/Categories.json')
    .pipe(
        map((response: Response) => {
            return response;
        }
    ), catchError(err => {console.log(err); return of(err)})
    ).subscribe(data => {
      this.categories = data.categories;
    })
  }  
  openSubCategoryList(category: ICategory) {
    this.selectedCategory = category;
    this.toggleSubCategoryList = !this.toggleSubCategoryList;
  }
  navigateToProductListpage(subcategory) {
    this.service.navigateToProductListpage("item-list", undefined,  this.selectedCategory, subcategory);
  }
}
