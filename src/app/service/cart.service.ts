import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class CartService{
   public items: any[] = JSON.parse(localStorage.getItem('cart')|| '[]')
   public total :any;
   public coupon :any;
    // addToCart(product: Hero) {

    //     this.items.push(product);
    //   }
    setTotalCoupon(t:any,c:any){
      this.total = t
      this.coupon = c
    }
      addToCart(product: any) {
        var numberr = 0
        console.log('cartService prod', this.items.length)
        if (this.items.length != 0) {
          this.items.forEach(element => {
            if (element.name == product.name ) {
              element.count! += 1 
              numberr += 1
              console.log('The product already exists in the cart!')
                        }
            
          });
          if (numberr == 0){
            product.count = 1
            this.items.push(product)
            console.log('Product added to cart successfully!')
            // localStorage.setItem("items",JSON.stringify(this.items))
          }
        }
        else {
          product.count = 1
          this.items.push(product)
          console.log('First product added to cart successfully!')
        }
        localStorage.setItem('cart',JSON.stringify(this.items))

      }
      removeItem(product_index:any){
        this.items.splice(product_index,1)
        localStorage.setItem('cart',JSON.stringify(this.items))
      }
      getItems() {
        return this.items
      }
    
      clearCart() {
        this.items = [];
        localStorage.setItem('cart',JSON.stringify(this.items))
        return this.items;
      }
      icr(i: any) {
        if (this.items![i].count <= 19) {
          this.items[i].count += 1
        localStorage.setItem('cart',JSON.stringify(this.items))
        }
      }
      dcr(i: any) {
        if (this.items![i].count > 1) {
          console.log(this.items)
          this.items[i].count -= 1
        localStorage.setItem('cart',JSON.stringify(this.items))
      }
      }
}