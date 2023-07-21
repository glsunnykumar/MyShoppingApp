import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@riti/order';
import { ProductsService } from '@riti/products';
import { UserService } from '@riti/users';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent implements OnInit {

    statistics = [];

    constructor( private userService: UserService,
        private productService: ProductsService,
        private ordersService: OrdersService){
        
    }
    ngOnInit(): void {
        combineLatest([
            this.ordersService.getOrdersCount(),
            this.productService.getProductCount(),
            this.userService.getUsersCount(),
             this.ordersService.getTotalSales()
          ]).subscribe((values) => {
            this.statistics = values;
          });
    }


}
