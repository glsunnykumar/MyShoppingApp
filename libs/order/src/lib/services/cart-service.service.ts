import { Injectable } from '@angular/core';
import { Cart, CartItems } from '../models/cart';
import {BehaviorSubject} from 'rxjs';
import { OrderItem } from '../models/order-item';

export const CART_KEY = 'cart';
@Injectable({
    providedIn: 'root'
})
export class CartServiceService {

    cartsub$ :BehaviorSubject<Cart> = new BehaviorSubject(this.getcart());
    initCartLocalStorage() {
       
      const cart :Cart = this.getcart();
      if(!cart){
        const intialCart = {
          items: []
      };  
      const initCartJson = JSON.stringify(intialCart);
      localStorage.setItem(CART_KEY, initCartJson);
      }
    }

    emptyCart(){
      const intialCart = {
        items: []
    }; 
    const initCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, initCartJson); 
    this.cartsub$.next(intialCart);
    }

    getcart() :Cart {
      const cartJsonString :string = localStorage.getItem(CART_KEY);
      const cart :Cart =JSON.parse(cartJsonString);
      return cart;
    }

    setCartItem(cartItem: CartItems ,updateCartItem ?:boolean): Cart {
        const cart:Cart = this.getcart();
        const cartItemExists = cart.items.find(item => item.productId === cartItem.productId);
        if(cartItemExists){
          cart.items.map((item)=>{
           if(item.productId === cartItem.productId)
           {
            if(updateCartItem){
              item.quantity = cartItem.quantity;
            }
            else{
            item.quantity = item.quantity +cartItem.quantity;
            }
           }
           return item;
          })
        }
        else{

          cart.items?.push(cartItem);
        }

        const cartJson = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJson);
        this.cartsub$.next(cart);
        return cart;
    }

    removeCartItem(productId :string){
      const cartItem = this.getcart();
      const newCart = cartItem.items.filter(item => item.productId !== productId);
      cartItem.items = newCart;

      const cartJsonFilter = JSON.stringify(cartItem);
      localStorage.setItem(CART_KEY, cartJsonFilter);
      this.cartsub$.next(cartItem);
    }

}
