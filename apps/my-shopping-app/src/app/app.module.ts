import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@riti/products';
import { UiModule } from '@riti/ui';
import { OrderModule } from '@riti/order';
import {JwtInterceptor, UsersModule} from '@riti/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent],
    imports: [BrowserModule, 
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }), 
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgxStripeModule.forRoot('pk_test_51IvzpLSDJAf7L2TctbhR673vCHs7yVepohJeD3MTgfwL40Pg6SoKI1gbOCASxDK6IW2NLk3CSpk1CXJMRuiseHoc00qMgYj8MQ'),
        ProductsModule, 
    HttpClientModule, 
    UiModule,
    OrderModule,
    UsersModule
],

    providers: [{provide: HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}],
    bootstrap: [AppComponent]
})
export class AppModule {}
