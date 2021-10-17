import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-profileuser',
  templateUrl: './profileuser.component.html',
  styleUrls: ['./profileuser.component.css']
})
export class ProfileuserComponent implements OnInit {
  user:any;
  // orders:any[]=[];
  // allorder:any;
  constructor(private orderService : OrderService) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user') || '[]')
    // this.orderService.GetAllOrder().subscribe((res)=>{
    //   this.allorder = res
    //   this.allorder.forEach((element:any) => {
    //     if (element.iduser = this.user.id){
    //       this.orders.push(element)
    //     }
    //   });
    // },(err:any)=>{
    //   console.log(err)
    // })
  }

}
