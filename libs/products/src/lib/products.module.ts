import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PrductsSearchComponent } from './components/prducts-search//prducts-search.component';
import { CategoryBannerComponent } from './components/category-banner/category-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { ProductListComponent } from './pages/product-list/product-list.component';

import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import {UiModule} from '@riti/ui';

const routes: Route[] = [
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: 'category/:categoryid',
        component: ProductListComponent
    },
    {
        path: 'products/:id',
        component: ProductPageComponent
    }
];
@NgModule({
    imports: [CommonModule, RouterModule, ButtonModule, CheckboxModule, 
        FormsModule,
         RouterModule.forChild(routes),
        RatingModule,
        InputNumberModule,
        UiModule
        ],
    declarations: [
        PrductsSearchComponent,
        CategoryBannerComponent,
        ProductItemComponent,
        FeaturedProductsComponent,
        ProductListComponent,
        ProductPageComponent
    ],
    exports: [PrductsSearchComponent, CategoryBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductListComponent, ProductPageComponent]
})
export class ProductsModule {}
