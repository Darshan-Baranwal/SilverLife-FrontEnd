import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { ICategory } from "../category/CategoryModel";

@Component({
  selector: "app-categories-modal",
  templateUrl: "./categories-modal.component.html",
  styleUrls: ["./categories-modal.component.scss"],
})
export class CategoriesModalComponent implements OnInit {
  @Input() categories: ICategory[];
  @Input() modal: boolean;
  @Output() openSubCategory: EventEmitter<ICategory> = new EventEmitter<
    ICategory
  >();
  @Output() toggleCategoryModal = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {
    if (this.modal === true) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
    }
  }
}
