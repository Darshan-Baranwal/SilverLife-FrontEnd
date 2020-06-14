import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  toggleSubCategoryList: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  openSubCategoryList() {
    this.toggleSubCategoryList = !this.toggleSubCategoryList;
  }
  closeModal() {
    this.toggleSubCategoryList = false;
  }
}
