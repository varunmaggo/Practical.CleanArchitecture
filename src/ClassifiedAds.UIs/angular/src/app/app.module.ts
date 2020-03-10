import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductModule } from './products/product.module';
import { AuthService, AuthInterceptor,  AuthInitializer} from './auth/'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
    provide: APP_INITIALIZER,
    useFactory: AuthInitializer,
    deps: [AuthService],
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
