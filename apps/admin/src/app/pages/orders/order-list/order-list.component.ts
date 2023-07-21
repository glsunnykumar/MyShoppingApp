import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService ,ORDER_STATUS } from '@riti/order';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-order-list',
    templateUrl: './order-list.component.html',
    styles: []
})
export class OrderListComponent implements OnInit {
    orders : Order[] =[];
    orderStatus = ORDER_STATUS;

    constructor(private ordersService: OrdersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router){

    }
    ngOnInit(): void {
        this._getOrders();
    }

    showOrder(orderId){
        this.router.navigateByUrl(`orders/${orderId}`);
    }

    deleteOrder(orderId){
        console.log('trying to delete order');
        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure that you want to Delete this order?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ordersService.deleteOrder(orderId).subscribe({
                    next: ()=>{
                        this.messageService.add({ severity: 'success', summary: 'Order', detail: 'order deleted Succesfully' });
                        this._getOrders();
                    },
                    error: ()=>{this.messageService.add({ severity: 'success', summary: 'Success', detail: 'order not deleted' });}
                 });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }

    private _getOrders(){
        this.ordersService.getOrders().subscribe(order =>{
             this.orders = order;
        })
    }
}
