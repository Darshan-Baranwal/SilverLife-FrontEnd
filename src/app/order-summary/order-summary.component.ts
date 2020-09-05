import { Component, OnInit, OnDestroy } from "@angular/core";
import { IOrder } from "../iorder-details.model";
import { FirebaseApiService } from "../firebase-api.service";
import { SilverlifeService } from "../silverlife.service";
import { takeUntil, map } from "rxjs/operators";
import { Subject } from "rxjs";
import { DateUtils } from '../dateUtils';

@Component({
  selector: "app-order-summary",
  templateUrl: "./order-summary.component.html",
  styleUrls: ["./order-summary.component.scss"],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  orderItems: IOrder[];
  destroy$ = new Subject();
  dateUtils = DateUtils;
  constructor(
    private fireBaseApi: FirebaseApiService,
    private service: SilverlifeService
  ) {}

  ngOnInit(): void {
    this.fireBaseApi
      .getAllOrderList(this.service.loggedInUser.id)
      .pipe(
        takeUntil(this.destroy$),
        map((data: any) => {
          return data.map((e) => {
            const order = {
              ...e.payload.doc.data(),
              id: e.payload.doc.id,
            };
            return order;
          });
        })
      )
      .subscribe((data: IOrder[]) => {
        this.orderItems = data;
        console.log(data);
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
