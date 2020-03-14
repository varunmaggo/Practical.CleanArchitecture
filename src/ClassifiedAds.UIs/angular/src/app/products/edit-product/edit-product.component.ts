import { Component, OnInit } from "@angular/core";
import { IProduct } from "../product";
import { ProductService } from "../product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgModel, NgForm } from "@angular/forms";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"]
})
export class EditProductComponent implements OnInit {
  product: IProduct = {
    id: "00000000-0000-0000-0000-000000000000",
    name: null,
    code: null,
    description: null,
    imageUrl: null,
    price: null,
    releaseDate: null,
    starRating: null
  };
  postErrorMessage: string = "";
  postError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.productService.getProduct(id).subscribe({
      next: product => (this.product = product)
      //error: err => this.errorMessage = err
    });
  }

  onBlur(field: NgModel) {
    console.log("in onBlur: ", field.valid);
  }

  onSubmit(form: NgForm) {
    console.log("in onSubmit: ", form.value, this.product);

    if (form.valid) {
      this.productService.updateProduct(this.product).subscribe(
        result => {
          console.log("success: ", result);
          this.router.navigate(["/products", result.id]);
        },
        error => this.onHttpError(error)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = "Please fix the errors";
    }
  }

  onHttpError(errorResponse: any) {
    console.log("error: ", errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }
}
