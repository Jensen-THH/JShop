import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './../../service/cart.service';
import { ALLPRODUCT } from '../../mock-all-product';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  filterTerm: any | undefined;
  producCategory :string =''
  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService, private apiService: ApiService) {
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
    this.producCategory = producCategorydFromRoute
    // this.products = ALLPRODUCT.filter(items => items.category === producCategorydFromRoute);
    this.apiService.GetAllProduct().subscribe(res => {
      this.products = res
      this.products = this.products.filter((items: { category: string; }) => items.category === producCategorydFromRoute).reverse();
      
    })
  }

}
