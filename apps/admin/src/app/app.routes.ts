import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';

import { CategoryListComponent } from './pages/categories/category-list/category-list.component';
import { CategoryFormComponent } from './pages/categories/category-form/category-form.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';

import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { OrderFormComponent } from './pages/orders/order-form/order-form.component';
import { AuthGuard } from '@riti/users';

export const appRoutes: Route[] = [
    {
    path:'',
    component:ShellComponent,
    canActivate:[AuthGuard],
    children: [
        {
            path: '',
            component: DashboardComponent
        },
        {
            path: 'categories',
            component: CategoryListComponent
        },
        {
            path: 'categories/form',
            component: CategoryFormComponent
        },
        {
            path: 'categories/form/:id',
            component: CategoryFormComponent
        },
        {
            path: 'products',
            component: ProductListComponent
        },
        {
            path: 'products/form',
            component: ProductFormComponent
        },
        {
            path: 'products/form/:id',
            component: ProductFormComponent
        },

        {
            path: 'users',
            component: UserListComponent
        },
        {
            path: 'users/form',
            component: UserFormComponent
        },
        {
            path: 'users/form/:id',
            component: UserFormComponent
        },
        {
            path: 'orders',
            component: OrderListComponent
        },
        {
            path: 'orders/:id',
            component: OrderFormComponent
        }
    ]
},
{
    path :'**',
    redirectTo :'',
    pathMatch: 'full'
}
];