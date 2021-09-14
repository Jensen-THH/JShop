import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showMen = false
  showWomen = false
  showMenu = false
  constructor(public router: Router) { }
  
  ngOnInit(): void {
  }
  toggleMen(){
    this.showMen = !this.showMen;
    this.showWomen = false;
  }
  toggleWomen(){
    this.showMen = false;
    this.showWomen = !this.showWomen;

  }
  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

}
