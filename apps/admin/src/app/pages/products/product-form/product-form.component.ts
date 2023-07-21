import { Component, OnInit } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService, ProductsService } from '@riti/products';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-product-form',
    templateUrl: './product-form.component.html',
    styles: []
})
export class ProductFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted = false;
    editMode = false;
    currentProductId: string;
    category = [];
    imageDisplay: string | ArrayBuffer;

    constructor(
        private fromBuilder: FormBuilder,
        private productService: ProductsService,
        private messageService: MessageService,
        private categoryService: CategoryService,
        private location: Location,
        private router: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this._initForm();
        this._getCategories();
        this._checkEditMode();
       
    }

    private _initForm() {
        this.form = this.fromBuilder.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['', Validators.required],
            isFeatured: [false]
        });
    }

    private _checkEditMode() {
        this.router.params.subscribe((param) => {
            if (param['id']) {
                this.editMode = true;
                this.currentProductId = param['id'];
                this.productService.getProduct(param['id']).subscribe((product) => {
                    this.productForm['name'].setValue(product.name);
                    this.productForm['brand'].setValue(product.brand);
                    this.productForm['price'].setValue(product.price);
                    this.productForm['description'].setValue(product.description);
                    this.productForm['category'].setValue(product.category.id);
                    this.productForm['countInStock'].setValue(product.countInStock);
                    this.productForm['richDescription'].setValue(product.richDescription);
                    this.productForm['isFeatured'].setValue(product.isFeatured);
                    this.imageDisplay = product.image;
                    this.productForm['image'].setValidators([]);
                    this.productForm['image'].updateValueAndValidity();
                });
            }
        });
    }

    private _getCategories() {
        this.categoryService.getCategories().subscribe((category) => {
            this.category = category;
        });
    }

    get productForm() {
        return this.form.controls;
    }

    onSubmit() {
        this.isSubmitted = true;
        console.log(this.form);
        if (this.form.invalid) {
            console.log('i am trying to update');
            return
        };

        const productFormData = new FormData();

        Object.keys(this.productForm).map((key) => {
            productFormData.append(key, this.productForm[key].value);
            console.log(key);
            console.log(this.productForm[key].value);
        });
       
        if(this.editMode)
        {
           this._updateProductData(productFormData,this.currentProductId);
        }else{
        this._addProductData(productFormData);
        }
    }

    private _addProductData(productFormData: FormData) {
        this.productService.addProduct(productFormData).subscribe({
            next: (product) => {
                this.messageService.add({ severity: 'success', summary: 'Product', detail: `${product.name} added Succesfully` });
                firstValueFrom(timer(2000)).then(() => {
                    this.location.back();
                });
            },
            error: () => {
                this.messageService.add({ severity: 'danger', summary: 'Success', detail: 'Product not added' });
            }
        });
    }

    private _updateProductData(productEditData : FormData ,productId : string){
        this.productService.updateProduct(productEditData,productId).subscribe({
            next: (product) => {
                this.messageService.add({ severity: 'success', summary: 'Product', detail: `${product.name} updated Succesfully` });
                firstValueFrom(timer(2000)).then(() => {
                    this.location.back();
                });
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'error', detail: 'Product not updated' });
            }
        });
    }

    onCancel() {
        firstValueFrom(timer(1000)).then(() => {
            this.location.back();
        });
    }

    onImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.form.patchValue({"image" : file});
            this.form.get('image').updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result;
            };
            fileReader.readAsDataURL(file);
        }
    }
}
