import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class CartService{
   public items: any[] = [
 
     
    ]
    // addToCart(product: Hero) {

    //     this.items.push(product);
    //   }
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
        
      }
      removeItem(product_index:any){
        this.items.splice(product_index,1)
      }
      getItems() {
        return this.items
      }
    
      clearCart() {
        this.items = [];
        return this.items;
      }
}