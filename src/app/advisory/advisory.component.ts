import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { SilverlifeService } from '../silverlife.service';

@Component({
  selector: 'app-advisory',
  templateUrl: './advisory.component.html',
  styleUrls: ['./advisory.component.scss']
})
export class AdvisoryComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject();
  @ViewChild('advisory', {static: false}) advisory: ElementRef;
  advisories: {name: string}[];
  constructor(private http: HttpClient, private service: SilverlifeService) { }

  ngOnInit(): void {
    this.http.get<{articles: {name: string}[]}>('../assets/JsonData/Articles.json')
    .pipe(
        map((response) => {
            return response.articles;
        }
    ),
    catchError(err => { return of(err)})
    ).subscribe(data => {
      this.advisories = data;
    });
  }
  ngAfterViewInit() {
    this.service.focusToAdvisory.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (data === 'advisory') {
        setTimeout(() => {
          //this.advisory.nativeElement.focus();
          document.getElementById("advisory").scrollIntoView({block: "start",behavior: "smooth"});
        }, 1000);
      }
    });
}
ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
}
