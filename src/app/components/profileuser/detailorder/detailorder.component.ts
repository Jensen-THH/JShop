import { Component, OnInit,NgZone } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detailorder',
  templateUrl: './detailorder.component.html',
  styleUrls: ['./detailorder.component.css']
})
export class DetailorderComponent implements OnInit {
  allproduct:any[]=[];
  order:any;
  address:any;
  endtotal:any;
  confirm:any;
  status:any;
  phone:any;
  endcofirm:any;
  orderForm!: FormGroup;
  orderId:any;
  constructor(public formBuilder: FormBuilder, private router: Router,
    private ngZone: NgZone, private orderService: OrderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // const routeParams = this.router.snapshot.paramMap;
    // const orderId = String(routeParams.get('id'));
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id')
    this.orderService.GetOneOrder(this.orderId).subscribe(
      res => {
        this.order = res
        this.address =this.order.address
        this.endtotal =this.order.endtotal
        this.confirm =this.order.confirm
        this.status =this.order.status
        this.phone =this.order.phone
        this.endcofirm =this.order.endcofirm
        this.allproduct = this.order.listorder
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
      }
    )
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
  onSumit(){
    this.orderService.updateOrder(this.orderId, this.orderForm.value).subscribe(() => {
      if (this.orderForm.value.endcofirm == true) {
        window.alert('Xác nhận đã nhận thành công!')
      }
      else {
        window.alert('Xác nhận chưa nhận được hàng!')
      }
      this.ngZone.run(() => this.router.navigateByUrl('/profile'))
    }, (err: any) => {
      console.log(err)
    })
  }
}
