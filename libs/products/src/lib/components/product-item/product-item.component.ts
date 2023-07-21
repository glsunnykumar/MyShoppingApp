import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartServiceService , CartItems } from '@riti/order';
@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styles: []
})
export class ProductItemComponent implements OnInit {

  constructor(private cartService : CartServiceService){

  }

    @Input() product :Product

    ngOnInit(): void {
      console.log('product iten');
    }

    addItemToCart(){
       const cartItem :CartItems ={
        productId : this.product.id,
        name :this.product.name,
        quantity :1
       }
       this.cartService.setCartItem(cartItem);
    }
}
