import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ModalModule } from "ngx-bootstrap";

import { ProductListComponent } from "./product-list.component";
import { ProductDetailComponent } from "./product-detail.component";
import { ProductDetailGuard } from "./product-detail.guard";
import { SharedModule } from "../shared/shared.module";
import { AddProductComponent } from "./add-product/add-product.component";
import { DeleteProductComponent } from "./delete-product/delete-product.component";
import { EditProductComponent } from "./edit-product/edit-product.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: "products", component: ProductListComponent },
      { path: "products/add", component: AddProductComponent },
      { path: "products/edit/:id", component: EditProductComponent },
      {
        path: "products/:id",
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      }
    ]),
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    AddProductComponent,
    DeleteProductComponent,
    EditProductComponent
  ]
})
export class ProductModule {}
