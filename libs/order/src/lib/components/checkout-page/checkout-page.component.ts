import { Component,OnDestroy,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  UserService } from '@riti/users';
import { OrderItem } from '../../models/order-item';
import { Order } from '../../models/order';
import { OrdersService } from '../../services/order.service';
import { CartServiceService } from '../../services/cart-service.service';
import { Cart } from '../../models/cart';
import { Subject, takeUntil } from 'rxjs';
import {StripeService} from 'ngx-stripe';

@Component({
    selector: 'orders-checkout-page-checkout-page',
    templateUrl: './checkout-page.component.html',
    styles: []
})
export class CheckoutPageComponent implements OnInit ,OnDestroy {
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderitems: OrderItem[] = [];
  userId :string;
  countries = [];
  unsubscribee$ :Subject<any> = new Subject()

    constructor(
        private router: Router,
        private usersService: UserService,
        private formBuilder: FormBuilder,
        private orderService : OrdersService,
        private cartService :CartServiceService,
       
      ) {
               
      }
  ngOnDestroy(): void {
   this.unsubscribee$.next;
   this.unsubscribee$.complete();
  }

    

    ngOnInit(): void {
        this._initCheckoutForm();
        this._autoFillForm();
        this._getCartItems();
        this._getCountries();
    }

    private _autoFillForm(){
      this.usersService.observeCurrentUser().pipe(takeUntil(this.unsubscribee$)).subscribe((user) =>{
        if(user){
          this.userId = user.id;
        this.checkoutForm['name'].setValue(user.name);
        this.checkoutForm['email'].setValue(user.email);
        this.checkoutForm['phone'].setValue(user.phone);
        this.checkoutForm['city'].setValue(user.city);
        this.checkoutForm['country'].setValue(user.country);
        this.checkoutForm['zip'].setValue(user.zip);
        this.checkoutForm['apartment'].setValue(user.apartment);
        this.checkoutForm['street'].setValue(user.street);
        }
      })
    }

    private _initCheckoutForm() {
        this.checkoutFormGroup = this.formBuilder.group({
          name: ['', Validators.required],
          email: ['', [Validators.email, Validators.required]],
          phone: ['', Validators.required],
          city: ['', Validators.required],
          country: ['', Validators.required],
          zip: ['', Validators.required],
          apartment: ['', Validators.required],
          street: ['', Validators.required]
        });
      }

      private _getCartItems(){
       const cart:Cart =  this.cartService.getcart();
       this.orderitems = cart.items.map((item)=>{
        return {
            product :item.productId,
            quantity :item.quantity
        }
       })
      }
    
      private _getCountries() {
        this.countries = this.usersService.getCountries();
      }
    backToCart(){
      this.router.navigate(['/cart']);
    }

    placeOrder() {
        this.isSubmitted = true;
        console.log('placing order');
        if (this.checkoutFormGroup.invalid) {
          return;
        }

        const orderItem : Order = {
            orderItems : this.orderitems,
            shippingAddress1: this.checkoutForm['apartment'].value,
            shippingAddress2:this.checkoutForm['apartment'].value,
            city: this.checkoutForm['apartment'].value,
            zip: this.checkoutForm['zip'].value,
            country: this.checkoutForm['country'].value,
            phone: this.checkoutForm['phone'].value,
            status :0,
            user: this.userId,
            dateOrdered: `${Date.now()}`
        }

        this.orderService.cacheOrderData(orderItem);
       
        this.orderService.createCheckoutSession(this.orderitems).
        subscribe( error =>{
          if(error)
        console.log("error in redirecting the page");
        } )

        // this.orderService.createOrder(orderitem).subscribe(()=>{
        //    this.cartService.emptyCart();
        //     this.router.navigate(['/thankyou']);
        // });
      }
    
      get checkoutForm() {
        return this.checkoutFormGroup.controls;
      }
}


