import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-listorder',
  templateUrl: './listorder.component.html',
  styleUrls: ['./listorder.component.css']
})
export class ListorderComponent implements OnInit {

  user:any;
  orders:any[]=[];
  received:any[]=[];
  notreceived:any[]=[];
  allorder:any;
  constructor(private orderService : OrderService) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user') || '[]')
    this.orderService.GetAllOrder().subscribe((res)=>{
      this.allorder = res
      this.allorder.forEach((element:any) => {
        if (element.iduser == this.user.id){
          
          this.orders.push(element)
        }
        
      });
      this.orders.forEach((ele:any)=>{
        if(ele.endcofirm == true){
          this.received.push(ele)
        }
        else{
          this.notreceived.push(ele)
        }
      })
    this.notreceived.reverse()
    this.received.reverse()
    },(err:any)=>{
      console.log(err)
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
