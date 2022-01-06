import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './../../service/cart.service';
import { ALLPRODUCT } from '../../mock-all-product';
import { ApiService } from './../../service/api.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges {
  products: any | undefined;
  filterTerm: any | undefined;
  search: string | undefined;
  producCategorydFromRoute = ''
  filterproduct = (product: any, name: any) => {
    var list = [];
    var ten = name
    if (ten === "" || !ten) {
      return product;
    }

    ten = ten.trim().toLowerCase();
    var items = product.filter(function (item: any) {
      if (item.name.toLowerCase().indexOf(ten) != -1) {
        return item;
      }
    });
    if (items.length > 0) {
      list = items;
    }

    return list
  };

  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService, private apiService : ApiService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  addToCart(product: any) {
    // product.size = this.selectedOption
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
 
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.producCategorydFromRoute = String(routeParams.get('category'));
    this.search = this.producCategorydFromRoute
    this.filterTerm = this.producCategorydFromRoute
    // this.products = ALLPRODUCT.filter(items=> items.category === producCategorydFromRoute);
    this.apiService.GetAllProduct().subscribe(res=>{
      this.products = res
    })
    // this.products = this.filterproduct(ALLPRODUCT, this.producCategorydFromRoute)
  }
  ngOnChanges(changes: SimpleChanges): void {
    const routeParams = this.route.snapshot.paramMap;
    this.producCategorydFromRoute = String(routeParams.get('category'));
    // this.search = this.producCategorydFromRoute
    this.filterTerm = this.producCategorydFromRoute
    // this.products = this.filterproduct(ALLPRODUCT, this.producCategorydFromRoute)
  }

}
