import { Component, OnInit } from '@angular/core';
import { OrderService } from './../../../service/order.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any;
  filterTerm: any;
  // formOrder: any;
  // order:any;
  constructor(private orderService: OrderService) {
    

  }

  ngOnInit(): void {
    this.orderService.GetAllOrder().subscribe((res) => {
      this.orders = res
      this.orders = this.orders.reverse()
    })
  }
  // confirmOrder(id: any, confirm: any) {
  //   confirm = !confirm
  //   this.orderService.GetOneOrder(id).subscribe((res)=>{
  //     this.order =res
  //     this.formOrder.setValue({
  //       name: this.order.name,
  //       email: this.order.email,
  //       address: this.order.address,
  //       city: this.order.city,
  //       district: this.order.district,
  //       phone: this.order.phone,
  //       zip: this.order.zip,
  //       country: this.order.country,
  //       card: this.order.card,
  //       endtotal: this.order.endtotal,
  //       iduser: this.order.iduser,
  //       date: this.order.data,
  //       listorder: [],
  //       confirm: confirm
  //     })
  //   },(err:any)=>{
  //     console.log(err)
  //   })
  //   this.orderService.updateOrder(id,this.formOrder.value).subscribe(()=>{
  //     if(this.formOrder.value.confirm == true){
  //       window.alert('Xác nhận thành công!')
  //     }
  //     else{
  //       window.alert('Hủy xác nhận đơn hàng!')
  //     }
  //   })
  // }
  deleteOrder(id:any,i:any){
    if (window.confirm('Do you want to go ahead?')){
      this.orderService.deleteOrder(id).subscribe((res)=>{
        this.orders.splice(i,1)
      })
    }
  }
}
