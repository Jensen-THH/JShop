import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../../service/api.service';
import { AuthService } from './../../../../service/auth.service';

@Component({
  selector: 'app-header-stats',
  templateUrl: './header-stats.component.html',
  styleUrls: ['./header-stats.component.css']
})
export class HeaderStatsComponent implements OnInit {
  totalUser :any
  totalProduct:any
  constructor(public apiProduct: ApiService, public apiUser : AuthService ) { }

  ngOnInit(): void {
    this.apiUser.getAlluser().subscribe((res)=>{
      this.totalUser = res
      this.totalUser = this.totalUser.length
    })
    this.apiProduct.GetAllProduct().subscribe((res)=>{
      this.totalProduct = res
      this.totalProduct = this.totalProduct.length
    })
  }

}
