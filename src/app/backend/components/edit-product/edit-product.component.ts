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
  images:any;
  form:any;
  newimages:any;
  listNameImages: any[] = []
  file:any;
  listImagesRemove:any[] = [];
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
      this.form = this.formBuilder.group({
        images: ['']
  
      })
    this.getId = this.activatedRoute.snapshot.paramMap.get('id')
    this.apiService.GetOneProduct(this.getId).subscribe(res => {
      this.product = res
      this.images =this.product.images
      this.product.price.old =this.convertmoneytostring(this.product.price.old)
      this.product.price.sale =this.convertmoneytostring(this.product.price.sale)
      this.updateForm.setValue({
        name: this.product.name,
        description: this.product.description,
        category: this.product.category,
        sku: this.product.sku,
        images: this.images,
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
    this.images.push(...this.listNameImages)
    var formInfo = this.updateForm.value
    if (this.images.length >= 2 && formInfo.name != '' && formInfo.description != ''
      && formInfo.price.old != '' && formInfo.price.sale != '' && formInfo.sku != '' && formInfo.price.category != '')
      {

    if(this.listImagesRemove.length != 0){
      console.log(this.listImagesRemove)
      for (let i = 0; i < this.listImagesRemove.length; i++) {
        this.apiService.deleteImages(this.listImagesRemove[i]).subscribe((res)=>{
          // console.log(res)
        },(err:any)=>{
          console.log(err)
        })
        
      }
    }
    // this.images.push(...this.listNameImages)
    console.log("images:",this.images )
    var formData: any = new FormData();
    for (let i = 0; i < this.form.value.images.length; i++) {
      formData.append("images", this.form.value.images[i])
    }
    // upload images
    this.apiService.uploadImage(formData).subscribe(() => {
      console.log('success img')
    }, (err) => {
      console.log(err)
    })
// upload product
    this.apiService.updateProduct(this.getId, this.updateForm.value).subscribe(() => {
      console.log('data updated successfully')
      this.ngZone.run(() => this.router.navigateByUrl('/admin/table'))
    }, (err: any) => {
      console.log(err)
    })
  }
  else{
    window.alert('Vui lòng nhập đầy đủ thông tin và ít nhất 2 tấm hình. Xin cảm ơn!')
  }
  }
  ngOnInit(): void {
  }
  deleteImage(i:any,name:any){
    if(name == 'images'){
      if(this.images[i] != undefined && this.images[i] != '' && this.images[i] != null){
        this.listImagesRemove.push(this.images[i].slice(26))
      }
      this.images.splice(i,1)
    }
    if(name == "newimages"){
      this.newimages.splice(i,1)
      this.listNameImages.splice(i,1)
      // console.log(i,' ',this.listNameImages)
      this.file =  Array.from(this.file)
      this.file.splice(i,1)
      // console.log('file:',i ,':',this.file)
      this.form.patchValue({
        images:  this.file
      });
      // console.log('2:',this.form.value.images)
    }
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files
      // console.log(this.file)
      this.form.patchValue({
        images:  this.file
      });
      // console.log('1:',this.form.value.images)
      var URL = 'https://jshopvn.herokuapp.com/api/'
      this.newimages =[]
      var filesAmount = event.target.files.length;
      
      for (let i = 0; i < filesAmount; i++) {

        this.listNameImages.push(URL+event.target.files[i].name)
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.newimages.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
      
    }
  }

}
