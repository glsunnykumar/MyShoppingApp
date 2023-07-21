import { Component, OnInit } from "@angular/core";
import { UserService } from "@riti/users";

@Component({
  selector: "myshop-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "my-shopping-app";
  constructor(private userService :UserService){}

  ngOnInit(): void {
    console.log('initializing the app session');
    this.userService.initAppSession();
  }

}
