import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ALLPRODUCT } from '../../mock-all-product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any | undefined;
  filterTerm: any | undefined;
  constructor(private route: ActivatedRoute) { 

  }
  
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const producCategorydFromRoute = String(routeParams.get('category'));
    this.products = ALLPRODUCT.filter(items=> items.category === producCategorydFromRoute);
  }

}
