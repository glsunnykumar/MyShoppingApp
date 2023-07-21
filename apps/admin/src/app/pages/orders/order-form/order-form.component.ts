import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@riti/order';
import { MessageService } from 'primeng/api';

import {ORDER_STATUS} from '@riti/order';

@Component({
    selector: 'admin-order-form',
    templateUrl: './order-form.component.html',
    styles: []
})
export class OrderFormComponent implements OnInit{
    order :Order
    orderStatus =[];
    selectedStatus ;
    currentOrderId :string;

    constructor(private orderService :OrdersService,private route : ActivatedRoute,
        private messageService : MessageService,
        ){

    }
    ngOnInit(): void {
        this._mapOrderStatus();
       this._getOrder();
     
    }

    private _mapOrderStatus(){
     this.orderStatus =  Object.keys(ORDER_STATUS).map(key =>{
            return {
                id :key ,
                name :ORDER_STATUS[key].label
            };
        })
    }

    private _getOrder(){
        this.route.params.subscribe((param) =>{
            if(param['id']){
                this.currentOrderId =param['id'];
                this.orderService.getOrder(param['id']).subscribe((order)=>{
                    this.order = order;
                    this.selectedStatus = order.status;
                })
            }
        })
    }

    onStatusChanged(event){
        this.orderService.updateOrder({status :event.value},this.currentOrderId).subscribe(
            {
         next: ()=>{
                    this.messageService.add({ severity: 'success', summary: 'Order', detail: 'Order updated Succesfully' });
            },
            error:() =>{this.messageService.add({ severity: 'danger', summary: 'Danger', detail: 'Order not updated ' });}
        })
    }
}
