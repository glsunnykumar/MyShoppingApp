import { Component,OnInit } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'orders-cart-icon',
    templateUrl: './cart-icon.component.html',
    styles: []
})
export class CartIconComponent implements OnInit {

    cartCount =0 ;

    constructor(private cartService : CartServiceService,private messageService:MessageService ){

    }
    ngOnInit(): void {
        this.cartService.cartsub$.subscribe(cart =>{
            this.cartCount = cart?.items.length ??0;
           
                this.messageService.add({ severity: 'success', summary: 'Success', detail: ' car updated sucessfully' });
            
           
        })
    }
}