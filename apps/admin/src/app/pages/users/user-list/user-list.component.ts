import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User ,UserService} from '@riti/users';
import {ConfirmationService, MessageService } from 'primeng/api';


@Component({
    selector: 'admin-user-list',
    templateUrl: './user-list.component.html',
    styles: []
})
export class UserListComponent implements OnInit {
    users : User[] =[];

    constructor(private userService:UserService,
        private messageService: MessageService,
        private confirmationService:ConfirmationService,
        private router: Router
        ){
       
    }

    ngOnInit(): void {
        this.getUsers();
    }

    onEdit(userId :string){
        this.router.navigateByUrl(`users/form/${userId}`);
   }

   onDelete(userId : string){
    this.confirmationService.confirm({
        target: event.target,
        message: 'Are you sure that you want to Delete this user?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.userService.deleteUser(userId).subscribe({
                next: ()=>{
                    this.messageService.add({ severity: 'success', summary: 'User', detail: 'user deleted Succesfully' });
                    this.getUsers();
                },
                error: ()=>{this.messageService.add({ severity: 'error', summary: 'error', detail: 'user not deleted' });}
             });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
    });



   }

   private getUsers(){
       this.userService.getUsers().subscribe(users =>{
       
           this.users = users;
       })
   }

   getCountryName(countryKey: string) {
    this.userService.getCountryName(countryKey);
  }
}
