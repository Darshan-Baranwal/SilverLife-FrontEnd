import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-advisory',
  templateUrl: './advisory.component.html',
  styleUrls: ['./advisory.component.scss']
})
export class AdvisoryComponent implements OnInit {
  advisories: {name: "Aging in Place"}[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{articles: {name: "Aging in Place"}[]}>('../assets/JsonData/Articles.json')
    .pipe(
        map((response) => {
            return response.articles;
        }
    ),
    catchError(err => {console.log(err); return of(err)})
    ).subscribe(data => {
      this.advisories = data;
    })
  }

}
