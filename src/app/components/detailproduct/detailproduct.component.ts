import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ALLPRODUCT } from '../../mock-all-product';
import { CartService } from '../../service/cart.service';
@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {
  sizes: string[] = ['S', 'M', 'L', 'XL']
  product: any | undefined;

  selectedOption = this.sizes[1]
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
  }
  
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = String(routeParams.get('productId'));
    this.product = ALLPRODUCT.find(product => product._id.$oid === productIdFromRoute);
 
  }

  addToCart(product: any) {
    // product.size = this.selectedOption
    this.cartService.addToCart(product);
    console.log(this.cartService.getItems())
    window.alert('Your product has been added to the cart!');
  }
  
  // icr() {
  //   if (this.product.count <= 19) {
  //      this.product.count += 1
  //   }
  //   console.log(this.selectedOption)
  //   return this.product.count
  // }
  // dcr() {
  //   if (this.product.count > 1) {
  //     this.product.count -= 1
  //   }
  //   return this.product.count
  // }
  
}