import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CartService{
   public items: any[] = [
      {
        "_id": {
          "$oid": "6064368c20bd941a081ab8bf"
        },
        "images": [
          "//product.hstatic.net/200000000131/product/xanh-nhat-3_6f3fb5ec7142490182d1fd5aa31eed2c_master.jpg",
          "//product.hstatic.net/200000000131/product/xanh-nhat-2_fe138a7a0668454abf7a79b58d38d9e8_master.jpg",
          "//product.hstatic.net/200000000131/product/xanh-nhat-1_f88662372fbb4f12a1042fc1d1e0419d_master.jpg",
          "//product.hstatic.net/200000000131/product/xanh-nhat-4_4933d25d2f124459ba029ad1131a0824_master.jpg",
          "//product.hstatic.net/200000000131/product/trang-1_7483beec6f0c439a8fe455eafe9b75f1_master.jpg",
          "//product.hstatic.net/200000000131/product/trang-3_c62970f62d334329a7b5b663e42334f1_master.jpg",
          "//product.hstatic.net/200000000131/product/trang-2_052554f6c4884346a4a27deec6130d81_master.jpg",
          "//product.hstatic.net/200000000131/product/trang-4_01046e6db6124969ac8f77cd6a640609_master.jpg",
          "",
          "//product.hstatic.net/200000000131/product/xanh-nhat-3_6f3fb5ec7142490182d1fd5aa31eed2c_master.jpg",
          "//product.hstatic.net/200000000131/product/xanh-nhat-2_fe138a7a0668454abf7a79b58d38d9e8_master.jpg",
          "//product.hstatic.net/200000000131/product/xanh-nhat-1_f88662372fbb4f12a1042fc1d1e0419d_master.jpg",
          "//product.hstatic.net/200000000131/product/xanh-nhat-4_4933d25d2f124459ba029ad1131a0824_master.jpg",
          "//product.hstatic.net/200000000131/product/trang-1_7483beec6f0c439a8fe455eafe9b75f1_master.jpg",
          "//product.hstatic.net/200000000131/product/trang-3_c62970f62d334329a7b5b663e42334f1_master.jpg",
          "//product.hstatic.net/200000000131/product/trang-2_052554f6c4884346a4a27deec6130d81_master.jpg",
          "//product.hstatic.net/200000000131/product/trang-4_01046e6db6124969ac8f77cd6a640609_master.jpg"
        ],
        "name": "Váy Jean",
        "sku": " CMC1210103",
        "price": {
          "sale": "299,000₫",
          "old": "499,000₫"
        },
        "description": "Miêu tả: Váy Jean. Size: S/M/L. Đặc tính: Trẻ trung - hiện đại. Thể loại: Trang phục dạo phố - Đi làm. Màu sắc: Trắng - Xanh nhạt. Chất liệu: Jeans. Số đo mẫu nữ: Chiều cao: 168 cm. Số đo 3 vòng: 83 - 59 - 86 (Mặc size S). - Giặt tay bằng nước lạnh - Không ngâm, không tẩy - Giặt riêng các sản phẩm khác màu - Không vắt.  - Là ủi ở nhiệt độ thấp. Khuyến khích giặt khô.",
        "category": "Váy",
        "__v": 0,
        "count":10,
        // "size":"M"
      },
     
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