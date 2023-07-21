import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CategoryService, Category} from '@riti/products';
import {ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-category-list',
    templateUrl: './category-list.component.html',
    styles: []
})


export class CategoryListComponent implements OnInit ,OnDestroy{
    categories : Category[] =[];
    endSub$: Subject<any> = new Subject();

    constructor(private categoryService:CategoryService,
        private messageService: MessageService,
        private confirmationService:ConfirmationService,
        private router: Router
        ){
       
    }
    ngOnDestroy(): void {
       this.endSub$.complete();
    }
    ngOnInit(): void {
       this.getCategories();
    }

    onDelete(category :string){

        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure that you want to Delete this category?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoryService.deleteCategory(category).subscribe({
                    next: ()=>{
                        this.messageService.add({ severity: 'success', summary: 'Category', detail: 'Category deleted Succesfully' });
                        this.getCategories();
                    },
                    error: ()=>{this.messageService.add({ severity: 'success', summary: 'Success', detail: 'category not deleted' });}
                 });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });



      
    }

    onEdit(categoryId :string){
         this.router.navigateByUrl(`categories/form/${categoryId}`);
    }

    private getCategories(){
        this.categoryService.getCategories().pipe(takeUntil(this.endSub$)).subscribe(cats =>{
            this.categories = cats;
        })
    }
}


