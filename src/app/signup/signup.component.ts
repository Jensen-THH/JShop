import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../service/user.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage!: boolean;
  serverErrorMessages!: string;
  userForm!: FormGroup
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router:Router,
    private ngZone: NgZone, ) { 
      this.userForm = this.formBuilder.group({
        username: ['',Validators.required],
        email: ['',Validators.required],
        password: ['',Validators.required],
      })
    }

  ngOnInit() {
  }
  onSubmit() {if(
    this.userForm.value.username != '' &&
    this.userForm.value.password != '' &&
    this.userForm.value.email != '' ){
      console.log(this.userForm.value.email,this.userForm.value.password,this.userForm.value.username)
    this.userService.postUser(this.userForm.value).subscribe( 
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(this.userForm);
        this.router.navigate(['/login']);
        
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
          // setTimeout(() => this.serverErrorMessages = '', 4000);
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
          // setTimeout(() => this.serverErrorMessages = '', 4000);
      }
    );
  }
  else
          this.serverErrorMessages = 'Please enter full information !';

  }

  resetForm(userForm:any) {
    this.userService.selectedUser = {
      username: '',
      email: '',
      password: ''
    };
    userForm.reset()
    this.serverErrorMessages = '';
  }

}