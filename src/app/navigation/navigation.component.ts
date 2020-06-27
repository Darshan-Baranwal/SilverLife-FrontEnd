import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SilverlifeService } from '../silverlife.service';
import { filter } from 'rxjs/operators';
import { IProduct } from '../item-list/ProductModel';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  openCloseSearchModal: boolean = false;
  @Output() toggleDrawer = new EventEmitter<void>();
  newAddedProduct: IProduct;
  toggleNewItemAddedToCartModal: boolean = false;
  constructor(private router: Router, public service: SilverlifeService) { }

  ngOnInit(): void {
    this.service.informCartInNavigation.pipe(filter(data => !!data))
    .subscribe(data => {
      this.newAddedProduct = null;
      this.newAddedProduct = data;
      this.toggleNewItemAddedToCartModal = true;
      setTimeout(() => {
        this.toggleNewItemAddedToCartModal = false;
      }, 1500);
    })
  }
  navigateTo(routerLink) {
    this.router.navigate([routerLink]);
  }
  openDrawer() {
    this.toggleDrawer.emit();
  }
}
