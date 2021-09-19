import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items : any[] | undefined;
  tongtien: string | undefined;

  constructor( private cartService :CartService ) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems()
    console.log(this.items)
    this.total()
  }
  total() {
    var t = 0;
    for (let item of this.items! ) {
        let price =item.price.sale
        let newString = price.replace(/,/g, "");
          let String2 = newString.replace(/₫/g, "");
           newString = parseInt(String2)
      t += item.count * newString;
      console.log(t);
    }
      let a = (t + "đ").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      this.tongtien = a
  }
  icr(i:any) {
    if (this.items![i].count <= 19) {
      this.items![i].count+=1
      this.total()
    }
  }
  dcr(i:any) {
    if (this.items![i].count > 1) {
      this.items![i].count-=1
      this.total()
    }
  }

}
