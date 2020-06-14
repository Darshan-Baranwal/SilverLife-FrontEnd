import { Component, OnInit } from '@angular/core';
import { SilverlifeService } from '../silverlife.service';

@Component({
  selector: 'app-major-categories',
  templateUrl: './major-categories.component.html',
  styleUrls: ['./major-categories.component.scss']
})
export class MajorCategoriesComponent implements OnInit {

  constructor(public service: SilverlifeService) { }

  ngOnInit(): void {
  }

}
