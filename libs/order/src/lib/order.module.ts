import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CartServiceService } from './services/cart-service.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { ThankyouPageComponent } from './components/thankyou-page/thankyou-page.component';
import { AuthGuard } from '@riti/users';

const routes: Routes = [
    {
        path: 'cart',
        component: CartPageComponent
    },
    {
        path: 'checkout',
        canActivate :[AuthGuard],
        component: CheckoutPageComponent
    },
    {
        path: 'success',
        component: ThankyouPageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        BadgeModule,
        ToastModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        InputNumberModule,
        InputMaskModule,
        DropdownModule,
        InputTextModule,
        ButtonModule,
        InputNumberModule
    ],
    declarations: [CartIconComponent, CartPageComponent, OrderSummaryComponent, CheckoutPageComponent, ThankyouPageComponent],
    exports: [CartIconComponent, CartPageComponent, OrderSummaryComponent, CheckoutPageComponent, ThankyouPageComponent],
    providers: [MessageService]
})
export class OrderModule {
    constructor(cartService: CartServiceService) {
        cartService.initCartLocalStorage();
    }
}
