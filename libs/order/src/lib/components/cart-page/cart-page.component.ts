import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { CartServiceService } from '../../services/cart-service.service';
import { CartItemDetailed } from '../../models/cart';
import { OrdersService } from '../../services/order.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
    selector: 'orders-cart-page-cart-page',
    templateUrl: './cart-page.component.html',
    styles: []
})
export class CartPageComponent implements OnInit {

    cartItems :CartItemDetailed[] =[];
    cartCount =0;
    endsub$ :Subject<any> = new Subject();

    constructor(private router :Router ,private cartService : CartServiceService,private orderService:OrdersService){}
    ngOnInit(): void {
      this._getCatItems();
    }

    private _getCatItems(){
      this.cartService.cartsub$.pipe(takeUntil(this.endsub$)).subscribe((respCart) =>{
        this.cartItems =[];
        this.cartCount = respCart?.items?.length ??0;
        respCart.items.forEach(cartItem =>{
         this.orderService.getProduct(cartItem.productId).subscribe(products =>{
          this.cartItems.push({
            product : products,
            quantity :cartItem.quantity
          });
         });
        })
      })
    }

    backToShop(){
        this.router.navigate(['/products'])
    }

    removeProduct(id :string){
      this.cartService.removeCartItem(id);
    }

    itemQuantityUpdated(event ,cartItem :CartItemDetailed){
      this.cartService.setCartItem({
        productId :cartItem.product.id,
        quantity :event.value
      },true)
    }
}
