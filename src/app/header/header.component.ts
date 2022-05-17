import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnChanges {
  // showMen = false
  // showWomen = false
  showMenu = false
  textsearch = ''
  showModal = false;
  totalItem!: number; 
  listCategories : any[] = [
    {name:"Áo" ,esname :'Shirt'},
    {name:"Váy",esname :'Skirt'},
    {name:"Đầm",esname :'Dress'},
    {name:"Quần",esname :'Pants'},
  ]
  
  toggleModal(){
    this.showModal = !this.showModal;
  }
  constructor(public router: Router, private cartService : CartService, public authService: AuthService) { }
  isLogin :any = this.authService.loggedIn
  logOut(){
    this.authService.logout()
    this.isLogin = this.authService.loggedIn
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.totalItem =  this.cartService.getItems().length
    // console.log(this.totalItem, ' in cart')
  }
  dataProduct : any = []
  ngOnInit(): void {
    // this.totalItem =  this.cartService.getItems()
    // this.totalItem = this.totalItem.length
    this.cartService.getProductData().subscribe(res=>{
      // this.dataProduct = this.cartService.getProductData()
      this.totalItem = 0
      res.forEach((ele:any)=>{
        this.totalItem += ele.count
      })
    })

  }
  
  // toggleMen(){
  //   this.showMen = !this.showMen;
  //   this.showWomen = false;
  // }
  // toggleWomen(){
  //   this.showMen = false;
  //   this.showWomen = !this.showWomen;

  // }
  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

}
