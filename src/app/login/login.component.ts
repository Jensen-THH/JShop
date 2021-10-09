import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    AuthService,
    FlashMessagesService
],
})
export class LoginComponent implements OnInit {
  email!: String ;
  password!: String;
      
  constructor( private authService: AuthService, private router:Router ,private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }
  onLoginSubmit() {
    const user = {
      email: this.email,
      passwordUser: this.password,
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data)
        if(data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.flashMessage.show('You are now logged in', {cssClass: 'flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 absolute top-0 right-0 left-0 text-center ', timeout: 5000});
          if(this.authService.loggedAsAdmin()){
            this.router.navigate(['/admin/table']);
          }
          else{
            this.router.navigate(['/']);
          }
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute top-0 right-0 left-0 text-center', timeout: 5000});
          console.log('false')
          this.router.navigate(['login']);
        }
    });
  }

}
