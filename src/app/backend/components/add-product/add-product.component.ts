import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  // productForm = new FormGroup({
  //   name: new FormControl('ss'),
  //   price: new FormGroup({
  //     old: new FormControl(''),
  //     sale: new FormControl('')
  //   }),
  //   description: new FormControl(''),
  //   image: new FormControl(''),
  //   category: new FormControl(''),
  //   sku: new FormControl(''),
  // });
  productForm: FormGroup
  constructor(public formBuilder: FormBuilder, private router: Router, 
    private ngZone: NgZone, private apiService: ApiService) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: this.formBuilder.group({
        sale: [''],
        old: ['']
      }),
      images: [],
      description: [''],
      category: [''],
      sku: ['']
    })
  }

  ngOnInit(): void {
    
  }
  OnSubmit(): any {
    this.apiService.AddProduct(this.productForm.value).subscribe(() => {
      console.log('added successfully')
      this.ngZone.run(() => {
        this.router.navigateByUrl('/admin/table')
      }, (err: any) => {
        console.log(err);
      })
    })
  }

}
