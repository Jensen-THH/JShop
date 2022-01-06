import { Component, OnInit, NgZone } from '@angular/core';
import { CartService } from './../../service/cart.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { OrderService } from './../../service/order.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  endtotal: any;
  subtotal: any;
  coupon = 0;
  items: any;
  tongtien: any;
  user: any;
  orderForm: any;
  constructor(public cartSerice: CartService, public formBuilder: FormBuilder, private router: Router, private orderService: OrderService
    , private apiService: ApiService, private ngZone: NgZone) {
    this.orderForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      phone: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      card: ['', Validators.required],
      endtotal: ['', Validators.required],
      iduser: ['', Validators.required],
      date: ['', Validators.required],
      timeship: ['', Validators.required],
      listorder: [],
      confirm: [false, Validators.required],
      endcofirm: [false, Validators.required],
      status: [false, Validators.required]
    })
    this.user = JSON.parse(localStorage.getItem('user') || '{}')
    this.items = JSON.parse(localStorage.getItem('cart') || '[]')
    this.total()
    this.orderForm.setValue({
      name: this.user.username,
      email: this.user.email,
      address: '',
      city: '',
      district: '',
      phone: '',
      zip: '',
      country: '',
      card: '',
      timeship: '',
      endtotal: this.endtotal,
      iduser: this.user.id,
      listorder: this.items,
      confirm: false,
      status: false,
      endcofirm: false,
      date: new Date()
    })
  }
  format(x: any) {
    return (x + "đ").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  ngOnInit(): void {
    this.items = JSON.parse(localStorage.getItem('cart') || '[]')
    this.total()
    this.user = JSON.parse(localStorage.getItem('user') || '{}')
    // console.log(this.user)
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
  totalprice(price: any, count: any) {
    let newString = price.replace(/,/g, "");
    let String2 = newString.replace(/₫/g, "");
    newString = parseInt(String2)
    let total = count * newString;
    let tt = this.format(total)
    return tt
  }
  onSumit() {
    if (window.confirm('Xác nhận đặt hàng!')) {

      var order = this.orderForm.value
      console.log(order)
      if (order.name != '' && order.email != '' && order.address != '' && order.city != ''
        && order.district != '' && order.zip != '' && order.country != ''
        && order.card != '' && order.endtotal != '' && order.iduser != '' && order.phone != '' && order.listorder.length != 0) {
        this.orderService.AddOrder(this.orderForm.value).subscribe(() => {
          console.log('added successfully')
          this.ngZone.run(() => {
            window.alert('đặt hàng thành công !')
            this.cartSerice.clearCart()
            this.router.navigateByUrl('/profile')
          }, (err: any) => {
            console.log(err);
          })
        })
      }
      else {
        window.alert('Vui lòng nhập đầy đủ thông tin để đặt hàng!')
      }
    }
  }


}
