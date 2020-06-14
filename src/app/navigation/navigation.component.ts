import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  openCloseSearchModal: boolean = false;
  @Output() toggleDrawer = new EventEmitter<void>();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateTo(routerLink) {
    this.router.navigate([routerLink]);
  }
  openDrawer() {
    this.toggleDrawer.emit();
  }
}
