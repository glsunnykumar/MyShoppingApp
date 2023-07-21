export class Cart {
    items ?:CartItems[];
}

export class CartItems {
    productId ?: string;
    name ?:string;
    quantity ?: number;
}

export class CartItemDetailed {
    product ?: any;
    quantity ?: number;
}