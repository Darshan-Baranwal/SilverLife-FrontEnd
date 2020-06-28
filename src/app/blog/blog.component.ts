import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit {
  blogName: string;

  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.blogName = this.activateRoute.snapshot.paramMap.get("id");
    if (this.blogName == undefined) {
      this.blogName = "Blog section";
      console.log("show all blog");
    }
  }
}
