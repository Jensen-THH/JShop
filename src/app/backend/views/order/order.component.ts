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
  ordersl: any;
  filterTerm: any;
  filterTermre: any;
  notreceived:any[]=[]
  received:any[]=[]
  // formOrder: any;
  // order:any;
  constructor(private orderService: OrderService) {
    

  }

  ngOnInit(): void {
    this.orderService.GetAllOrder().subscribe((res) => {
      this.orders = res
      this.ordersl = this.orders.length
      this.orders.forEach((element:any) => {
        if(element.endcofirm == true){
          this.received.push(element)
        }
        else{
          this.notreceived.push(element)
        }
      });
      this.notreceived.reverse()
      this.received.reverse()
    })
  }

  deleteOrder(id:any,i:any){
    if (window.confirm('Do you want to go ahead?')){
      this.orderService.deleteOrder(id).subscribe((res)=>{
        this.orders.splice(i,1)
      })
    }
  }
}
