import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class CartService {
  public items: any[] = JSON.parse(localStorage.getItem('cart') || '[]')
  //  thêm
  ProductList = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('cart') || '[]'))
  cartDatalist: any = JSON.parse(localStorage.getItem('cart') || '[]')
  //  thêm
  public total: any;
  public coupon: any;
  // addToCart(product: Hero) {

  //     this.items.push(product);
  //   }

  //  thêm
  getProductData() {
    return this.ProductList.asObservable()
    // return this.ProductList  = JSON.parse(localStorage.getItem('cart') || '[]')
  }
  setProduct(product: any) {
    this.cartDatalist.push(...product)
    this.ProductList.next(product)
  }
  //  thêm

  setTotalCoupon(t: any, c: any) {
    this.total = t
    this.coupon = c
  }
  // addToCart(product: any) {
  //   var numberr = 0
  //   console.log('cartService prod', this.items.length)
  //   if (this.items.length != 0) {
  //     this.items.forEach(element => {
  //       if (element.name == product.name ) {
  //         element.count! += 1 
  //         numberr += 1
  //         console.log('The product already exists in the cart!')
  //                   }

  //     });
  //     if (numberr == 0){
  //       product.count = 1
  //       this.items.push(product)
  //       console.log('Product added to cart successfully!')
  //       // localStorage.setItem("items",JSON.stringify(this.items))
  //     }
  //   }
  //   else {
  //     product.count = 1
  //     this.items.push(product)
  //     console.log('First product added to cart successfully!')
  //   }
  //   localStorage.setItem('cart',JSON.stringify(this.items))
  //   this.getCountProduct()
  // }

  //  thêm
  addToCart(product: any) {
    var numberr = 0
    console.log('cartService prod', this.cartDatalist.length)
    if (this.cartDatalist.length != 0) {
      this.cartDatalist.forEach((element: { name: any; count: any; }) => {
        if (element.name == product.name) {
          element.count! += 1
          numberr += 1
          console.log('The product already exists in the cart!')
          this.ProductList.next(this.cartDatalist)
          this.getCountProduct()
        }

      });
      if (numberr == 0) {
        product.count = 1
        this.cartDatalist.push(product)
        this.ProductList.next(this.cartDatalist)
        this.getCountProduct()
        console.log('Product added to cart successfully!')
        // localStorage.setItem("cartDatalist",JSON.stringify(this.cartDatalist))
      }
    }
    else {
      product.count = 1
      this.cartDatalist.push(product)
      this.ProductList.next(this.cartDatalist)
      console.log('First product added to cart successfully!')
    }
    localStorage.setItem('cart', JSON.stringify(this.cartDatalist))
    this.getCountProduct()
  }
//  thêm

  removeItem(product_index: any) {
    this.cartDatalist.splice(product_index, 1)
    localStorage.setItem('cart', JSON.stringify(this.cartDatalist))
    this.ProductList.next(this.cartDatalist)
  }
  getItems() {
    return this.cartDatalist
  }

  clearCart() {
    this.cartDatalist = [];
    this.getCountProduct()
    localStorage.setItem('cart', JSON.stringify(this.cartDatalist))
    this.ProductList.next(this.cartDatalist)
    return this.cartDatalist;
  }
  icr(i: any) {
    if (this.cartDatalist![i].count <= 19) {
      this.cartDatalist[i].count += 1
      localStorage.setItem('cart', JSON.stringify(this.cartDatalist))
      this.ProductList.next(this.cartDatalist)
    }
  }
  dcr(i: any) {
    if (this.cartDatalist![i].count > 1) {
      console.log(this.cartDatalist)
      this.cartDatalist[i].count -= 1
      localStorage.setItem('cart', JSON.stringify(this.cartDatalist))
      this.ProductList.next(this.cartDatalist)
    }
  }
  getCountProduct() {
    let totalcount = JSON.parse(localStorage.getItem('cart') || '[]')
    let totalcountall = 0
    console.log(this.cartDatalist)
    
      this.cartDatalist.map((a: any) => {
          totalcountall += a.count
        })
    
    // return totalcountall
 
}
}