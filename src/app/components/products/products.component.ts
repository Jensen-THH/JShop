import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ALLPRODUCT } from '../../mock-all-product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any | undefined;
  filterTerm: any | undefined;
  constructor(private route: ActivatedRoute, private router :Router, private cartService :CartService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
   addToCart(product: any) {
    // product.size = this.selectedOption
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const producCategorydFromRoute = String(routeParams.get('category'));
    this.products = ALLPRODUCT.filter(items=> items.category === producCategorydFromRoute);
  }

}
