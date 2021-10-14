import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from './../../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent {
  images: string[] = [];
  //  myForm :any
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    images: new FormControl('', [Validators.required])
  });
  form: any

  constructor(public formBuilder: FormBuilder, private router: Router,
    private apiService: ApiService) {
    this.form = this.formBuilder.group({
      images: ['']

    })
  }
  get f() {
    return this.myForm.controls;
  }

  upload(event: any) {
      this.form.patchValue({
        images:  event.target.files
      });
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.form.patchValue({
        images:  event.target.files
      });
      this.images =[]
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          // console.log(event.target.result);
          this.images.push(event.target.result);

  

        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  submit() {
    //   this.form.patchValue({
    //     images: this.myForm.value.images

    //  });
    var formData: any = new FormData();
    for (let i = 0; i < this.form.value.images.length; i++) {
      formData.append("images", this.form.value.images[i])
    }
    // console.log(this.myForm.value.images);
    // console.log(this.form.value);
    // var x =formData.getAll("images[]")
    // console.log('formdata: ',x  );
    this.apiService.uploadImage(formData).subscribe(() => {
      console.log('success')
    }, (err) => {
      console.log(err)
    })
  }
}