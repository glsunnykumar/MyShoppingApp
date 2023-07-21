import { Component, OnInit } from '@angular/core';
import { AuthService } from '@riti/users';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html',
    styles: []
})
export class SidebarComponent implements OnInit {

    constructor(private authService : AuthService){

    }
    ngOnInit(): void {
      console.log('sidebar');
    }

    logOut(){
      this.authService.logtout();
    }
}
