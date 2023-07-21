import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/order.service';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
    selector: 'orders-thankyou-page-thankyou-page',
    templateUrl: './thankyou-page.component.html',
    styles: []
})
export class ThankyouPageComponent implements OnInit {

    constructor(private orderService : OrdersService,private cartService :CartServiceService){
        console.log('order');
     }
    ngOnInit(){
        const orderData =   this.orderService.getCachedOrderData();
        this.orderService.createOrder(orderData).subscribe(()=>{
         this.cartService.emptyCart();
         this.orderService.removeOrderData();
        });
    }
}
