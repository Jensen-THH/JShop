import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../service/api.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  getId: any;
  updateForm!: FormGroup
  product: any;
  convertmoneytostring(money: any):any {
    if (typeof money === "string"){
    let newString = money.replace(/,/g, "");
    let String2 = newString.replace(/₫/g, "");
    let x = parseInt(String2)
    return x
  }
  else{
    return money
  }

  }
  constructor(public formBuilder: FormBuilder, private router: Router,
    private ngZone: NgZone, private apiService: ApiService, private activatedRoute: ActivatedRoute) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id')
    this.apiService.GetOneProduct(this.getId).subscribe(res => {
      this.product = res
      this.product.price.old =this.convertmoneytostring(this.product.price.old)
      this.product.price.sale =this.convertmoneytostring(this.product.price.sale)
      this.updateForm.setValue({
        name: this.product.name,
        description: this.product.description,
        category: this.product.category,
        sku: this.product.sku,
        images: this.product.images[0],
        price: {
          sale: this.product.price.sale,
          old: this.product.price.old
        },
      })

    })
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: this.formBuilder.group({
        sale: [''],
        old: ['']
      }),
      images: [''],
      description: [''],
      category: [''],
      sku: ['']
    })
  }
  OnUpdate() {
    this.apiService.updateProduct(this.getId, this.updateForm.value).subscribe(() => {
      console.log('data updated successfully')
      this.ngZone.run(() => this.router.navigateByUrl('/admin/table'))
    }, (err: any) => {
      console.log(err)
    })
  }
  ngOnInit(): void {
  }

}
