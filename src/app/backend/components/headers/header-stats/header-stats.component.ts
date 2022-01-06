import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../../service/api.service';
import { AuthService } from './../../../../service/auth.service';
import { OrderService } from './../../../../service/order.service';

@Component({
  selector: 'app-header-stats',
  templateUrl: './header-stats.component.html',
  styleUrls: ['./header-stats.component.css']
})
export class HeaderStatsComponent implements OnInit {
  totalUser: any
  totalProduct: any
  totalorder: any;
  received: any[] = [];
  notreceived: any[] = [];
  notreceivedl: any;
  receivedl: any;
  totalorderl: any;
  totalmoney: any;
  constructor(public apiProduct: ApiService, public apiUser: AuthService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.apiUser.getAlluser().subscribe((res) => {
      this.totalUser = res
      this.totalUser = this.totalUser.length
    })
    this.apiProduct.GetAllProduct().subscribe((res) => {
      this.totalProduct = res
      this.totalProduct = this.totalProduct.length
    })
    this.orderService.GetAllOrder().subscribe((res) => {
      this.totalorder = res
      this.totalorder.forEach((element: any) => {
        if (element.endcofirm == true) {
          this.received.push(element)
        }
        else {
          this.notreceived.push(element)
        }
      });
      this.notreceivedl = this.notreceived.length
      this.receivedl = this.received.length
      this.totalorderl = this.totalorder.length
      this.totalmn()
    })
  }
  format(x: any) {
    return (x + "đ").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  totalmn() {
    var total = 0;
    this.received.forEach((element: any) => {
      let momney = element.endtotal
      let newString = momney.replace(/,/g, "");
      let String2 = newString.replace(/₫/g, "");
      newString = parseInt(String2)
      total += newString
    })
    this.totalmoney = this.format(total)

  }
}
