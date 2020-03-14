import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { ProductModule } from "./products/product.module";
import { AuthModule } from "./auth/auth.module";
import { LoggingModule } from "./logging/logging.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductModule,
    AppRoutingModule,
    AuthModule,
    LoggingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
