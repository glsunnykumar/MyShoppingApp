import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { Subject, takeUntil } from 'rxjs';
import { CategoryService } from '../../services/categories/category.service';

@Component({
    selector: 'products-category-banner',
    templateUrl: './category-banner.component.html',
    styles: []
})
export class CategoryBannerComponent implements OnInit,OnDestroy {
    categories :Category[] =[];
    endSub$ :Subject<any> = new Subject();

   constructor(private categoryService :CategoryService){
    
   }
    ngOnInit(): void {
        this.categoryService.getCategories().pipe(takeUntil(this.endSub$)).subscribe(category =>{
            this.categories =category
        })
    }

    ngOnDestroy(): void {
        this.endSub$.next;
       this.endSub$.complete();
    }
}
