import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SilverLife';
  toggleSideDrawer: boolean = false;
  @ViewChild('mainContainer', {static: false}) mainContainer;
  toggleDrawerForSideDrawer(event) {
    this.toggleSideDrawer = !this.toggleSideDrawer;
  }
}
