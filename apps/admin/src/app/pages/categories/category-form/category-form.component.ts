import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { CategoryService, Category } from '@riti/products'
import {Location} from '@angular/common';
import { MessageService } from 'primeng/api';
import { Subject, firstValueFrom,  takeUntil,  timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-category-form',
    templateUrl: './category-form.component.html',
    styles: []
})

export class CategoryFormComponent implements OnInit ,OnDestroy {
 
    form : FormGroup;
    isSubmitted  = false;
    editMode = false;
    currentCategoryId : string;
    endSub$ :Subject<any>

    constructor(private fromBuilder : FormBuilder ,
        private categoryService : CategoryService,
        private messageService : MessageService,
        private location :Location,
        private router : ActivatedRoute
        ){
        
    }
    ngOnInit(): void {
         this.form = this.fromBuilder.group({
            name :['',Validators.required],
            icon :['',Validators.required],
            color:['#fff']
         })

         this._checkEditMode();
    }
    ngOnDestroy(): void {
        this.endSub$.complete();
     }

   onCancel(){
    firstValueFrom(timer(1000)).then(() =>{
        this.location.back();
    })}

    onSubmit():void{
        this.isSubmitted = true;
        if(this.form.invalid){
            return;
        }
       const category :Category= {
       name: this.categoryForm['name'].value,
       icon: this.categoryForm['icon'].value,
       color:this.categoryForm['color'].value,
       id : this.currentCategoryId
       }

       if(this.editMode){
        this._updateCategory(category);
       }
       else {
        this._createCategory(category)
       }
    
    }

    private _createCategory(category: Category){
        this.categoryService.addCategory(category).pipe(takeUntil(this.endSub$)).subscribe({
            next: ()=>{
                this.messageService.add({ severity: 'success', summary: 'Category', detail: 'Category added Succesfully' });
                firstValueFrom(timer(2000)).then(() =>{
                    this.location.back();
                })
            },
            error: ()=>{this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });}
         });
       
    }

    private _checkEditMode(){
        this.router.params.subscribe(param =>{
           if(param['id']){
            this.editMode =true;
            this.currentCategoryId =param['id'];
            this.categoryService.getCategory(param['id']).subscribe(category =>{
                this.categoryForm['name'].setValue(category.name);
                this.categoryForm['icon'].setValue(category.icon);
                this.categoryForm['color'].setValue(category.color)
            })
           }
        })
    }
  
    private _updateCategory(category : Category){
        this.categoryService.updateCategory(category).pipe(takeUntil(this.endSub$)).subscribe({
            next: ()=>{
                this.messageService.add({ severity: 'success', summary: 'Category', detail: 'Category updated Succesfully' });
                firstValueFrom(timer(2000)).then(() =>{
                    this.location.back();
                })
            },
            error: ()=>{this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });}
         });
       
    }
    get categoryForm(){
        return this.form.controls;
    }
}
