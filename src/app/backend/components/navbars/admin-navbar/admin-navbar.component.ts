  
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../../service/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 absolute top-0 right-0 left-0 text-center', timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }

}
