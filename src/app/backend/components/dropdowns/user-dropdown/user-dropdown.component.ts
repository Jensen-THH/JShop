import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { AuthService } from './../../../../service/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
})
export class UserDropdownComponent implements AfterViewInit {

  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false })
  btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef!: ElementRef;
  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-end",
      }
    );
  }
  toggleDropdown(event: { preventDefault: () => void; }) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 absolute top-0 right-0 left-0 text-center', timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }
  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

}
