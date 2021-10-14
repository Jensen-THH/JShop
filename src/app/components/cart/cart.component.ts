import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any;
  tongtien: string | undefined;
  coupon = 0
  couponString = ''
  newtotal = 0
  t!: number
  subtotal = 0
  code_coupon = ''
  endtotal: any | undefined;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // this.items = this.cartService.getItems()
    this.items = JSON.parse(localStorage.getItem('cart')|| '{}')
    // console.log(this.items)
    this.total()
    this.submitCoupon(this.code_coupon)
  }
  format(x: any) {
    return (x + "đ").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  total() {
    let subtotal = 0
    for (let item of this.items!) {
      let price = item.price.sale
      let newString = price.replace(/,/g, "");
      let String2 = newString.replace(/₫/g, "");
      newString = parseInt(String2)
      subtotal += item.count * newString;
      this.subtotal = subtotal
      // console.log(this.subtotal);
    }
    this.tongtien = this.format(this.subtotal)

    let total = this.format(this.subtotal - this.coupon)
    this.endtotal = total
  }
 
  icr(i: any) {
    this.cartService.icr(i)
    if (this.items![i].count <= 19) {
      this.items![i].count += 1
      this.total()
      this.submitCoupon(this.code_coupon)
    }

  }
  dcr(i: any) {
    this.cartService.dcr(i)
    if (this.items![i].count > 1) {
      this.items![i].count -= 1
      this.total()
      this.submitCoupon(this.code_coupon)
    }

  }
  totalprice(price: any, count: any) {
    let newString = price.replace(/,/g, "");
    let String2 = newString.replace(/₫/g, "");
    newString = parseInt(String2)
    this.t = count * newString;
    let total = this.format(this.t)
    return total
  }

  removeItem(i: any) {
    this.cartService.removeItem(i)
    this.items.splice(i,1)
    this.total()
    this.submitCoupon(this.code_coupon)
  }
  submitCoupon(code_coupon: any) {
    if (code_coupon == '90off') {
      this.coupon = this.subtotal * 90 / 100
    }
    else {
      this.coupon = 0
    }
    this.total()
    this.couponString = this.format(this.coupon)
    return this.couponString
  }
  removeCoupon() {
    this.coupon = 0
    this.code_coupon = ''
    this.couponString = '0đ'
    this.total()
  }
  checkout() {
    if (window.confirm('check out!') == true) {
      this.cartService.clearCart()
      this.items = []
    
    }

  }
}
