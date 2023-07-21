import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { OrdersService } from '../../services/order.service';
import { Subject, take, takeUntil } from 'rxjs';
import {Router} from '@angular/router';
@Component({
    selector: 'orders-order-summary',
    templateUrl: './order-summary.component.html',
    styles: []
})
export class OrderSummaryComponent implements OnInit,OnDestroy {
    totalPrice :number;
    endSub$ :Subject<any> = new Subject();
    isCheckoutPage =false;

    constructor( private router :Router, private cartService : CartServiceService,private orderService : OrdersService){
        this.router.url.includes('checkout') ? this.isCheckoutPage =true : this.isCheckoutPage=false;
    }
    ngOnDestroy(): void {
        this.endSub$.next;
        this.endSub$.complete();
    }
    ngOnInit(): void {
       this._getCartItems();
    }

    private _getCartItems(){
    this.cartService.cartsub$.pipe(takeUntil(this.endSub$)).subscribe((cart)=>{
        this.totalPrice =0;
        if(cart){
            cart.items.map((item)=>{
             this.orderService.getProduct(item.productId).
             pipe(take(1)).subscribe((product)=>{
                this.totalPrice += product.price * item.quantity;
             })
            })
        }
    })
    }
}
