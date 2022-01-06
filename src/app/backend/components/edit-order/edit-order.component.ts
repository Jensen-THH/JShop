import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from './../../../service/order.service';
@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  getId: any;
  orderForm!: FormGroup
  order: any;
  date: any;
  idorder:any;
  listorder: any[] = [];
  endtotal:any;
  convertmoneytostring(money: any): any {
    if (typeof money === "string") {
      let newString = money.replace(/,/g, "");
      let String2 = newString.replace(/₫/g, "");
      let x = parseInt(String2)
      return x
    }
    else {
      return money
    }

  }
  ngOnInit(): void {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id')
    this.orderService.GetOneOrder(this.getId).subscribe(res => {
      this.order = res
      this.date = this.order.date
      this.listorder = this.order.listorder
      this.endtotal =this.order.endtotal
      this.idorder =this.order._id
    })
  }
  constructor(public formBuilder: FormBuilder, private router: Router,
    private ngZone: NgZone, private orderService: OrderService, private activatedRoute: ActivatedRoute) {

    this.getId = this.activatedRoute.snapshot.paramMap.get('id')
    this.orderService.GetOneOrder(this.getId).subscribe(res => {
      this.order = res
      this.orderForm.patchValue({
        name: this.order.name,
        email: this.order.email,
        address: this.order.address,
        city: this.order.city,
        district: this.order.district,
        country: this.order.country,
        endtotal: this.order.endtotal,
        iduser: this.order.iduser,
        phone: this.order.phone,
        date: this.order.data,
        listorder: this.order.listorder,
        card: this.order.card,
        confirm: this.order.confirm,
        status: this.order.status,
        endcofirm: this.order.endcofirm,
        zip: this.order.zip,
        timeship: this.order.timeship,
      })

    })
    this.orderForm = this.formBuilder.group({
      name: [''],
      email: [''],
      address: [''],
      city: [''],
      district: [''],
      zip: [''],
      country: [''],
      card: [''],
      endtotal: [''],
      iduser: [''],
      phone: [''],
      date: [''],
      listorder: [],
      timeship: [''],
      confirm: [false],
      endcofirm: [false],
      status: [false]
    })

  }
  onSumit() {

    // upload order
    if(this.orderForm.value.timeship != ''){

    this.orderService.updateOrder(this.getId, this.orderForm.value).subscribe(() => {
      if (this.orderForm.value.confirm == true) {
        window.alert('Xác nhận thành công!')
      }
      else {
        window.alert('Đơn hàng chưa được xác nhận!')
      }
      this.ngZone.run(() => this.router.navigateByUrl('/admin/order'))
    }, (err: any) => {
      console.log(err)
    })
  }
  else{
    window.alert('Vui lòng nhập đầy đủ thông tin và thời gian giao ship. Xin cảm ơn!')
  }

  }



}
