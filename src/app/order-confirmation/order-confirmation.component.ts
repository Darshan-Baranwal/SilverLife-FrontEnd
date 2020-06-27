import { Component, OnInit } from '@angular/core';
import {SilverlifeService} from '../silverlife.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {

  constructor(public service: SilverlifeService) { }

  ngOnInit(): void {
  }

}
