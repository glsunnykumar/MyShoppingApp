import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@riti/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-product-list',
    templateUrl: './product-list.component.html',
    styles: []
})
export class ProductListComponent implements OnInit {
    product =[];

    constructor(
        private productService : ProductsService,
        private messageService: MessageService,
        private confirmationService:ConfirmationService,
        private router: Router
        ){
           
       
    }
    ngOnInit(): void {
        this.getProducts();
    }

    getProducts(){
        this.productService.getProducts().subscribe((products)=>{
                  this.product = products;
        })
    }

    onDelete(productId : string){
        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure that you want to Delete this product?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productService.deleteProduct(productId).subscribe({
                    next: ()=>{
                        this.messageService.add({ severity: 'success', summary: 'Product', detail: 'deleted Succesfully' });
                        this.getProducts();
                    },
                    error: (error)=>{
                        console.log(error);
                        this.messageService.add({ severity: 'danger', summary: 'Product', detail: 'not deleted' });}
                 });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });



    }
    
    onEdit(productId : string){
        this.router.navigateByUrl(`products/form/${productId}`);
    }
    
}
