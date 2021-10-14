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
  images: string[] = [];

  form: any
  productForm: any
  constructor(public formBuilder: FormBuilder, private router: Router, 
    private ngZone: NgZone, private apiService: ApiService) {
      this.form = this.formBuilder.group({
        images: ['']
  
      })
    this.productForm = this.formBuilder.group({
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

  ngOnInit(): void {
    
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.form.patchValue({
        images:  event.target.files
      });
      console.log(this.form.value);
      var URL = 'http://localhost:8000/api/'
      this.images =[]
      var filesAmount = event.target.files.length;
      var listNameImages: any[] = []
      for (let i = 0; i < filesAmount; i++) {

        listNameImages.push(URL+event.target.files[i].name)
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
      this.productForm.patchValue({
        images: listNameImages
      });
      console.log(this.productForm.value)
    }
  }
  OnSubmit(): any {
    var formData: any = new FormData();
    for (let i = 0; i < this.form.value.images.length; i++) {
      formData.append("images", this.form.value.images[i])
    }
    console.log(this.form.value);
    this.apiService.uploadImage(formData).subscribe(() => {
      console.log('success img')
    }, (err) => {
      console.log(err)
    })

    
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
