import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ALLPRODUCT } from '../../mock-all-product';
@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {
  product: any | undefined;
  constructor(private route: ActivatedRoute) { 

  }
  
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = String(routeParams.get('productId'));
    this.product = ALLPRODUCT.find(product => product._id.$oid === productIdFromRoute);
  }

}
