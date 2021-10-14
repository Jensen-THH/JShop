import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../../service/cart.service';
// import {ALLPRODUCT} from '../../mock-all-product'
import { ApiService } from './../../service/api.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  // hotproduct = ALLPRODUCT.slice(0,10);
  // bestproduct = ALLPRODUCT.filter(product =>{
  //   return product.category2 == "best"
  // })
  hotproduct : any =[];
  bestproduct : any =[]
  category = [
    { name: 'Áo', description: 'Áo siêu đẹp', imgsrc: 'https://product.hstatic.net/200000000131/product/trang-9_ec4c29eb591940cf80534125c76d2ac6_grande.jpg' },
    { name: 'Váy', description: 'Váy siêu đẹp', imgsrc: 'https://product.hstatic.net/200000000131/product/den-4_6b7882c3b3a340f2be2fa5e807b15243_grande.jpg' },
    { name: 'Đầm', description: 'Đầm siêu đẹp', imgsrc: 'https://product.hstatic.net/200000000131/product/vang-1_72d95a90683c406082a27aa87772f126_grande.jpg' },
    { name: 'Quần', description: 'Quần siêu đẹp', imgsrc: 'https://product.hstatic.net/200000000131/product/trang_3_1e7e2dbf5e8c4afe9fd248eecff6465d_ad008946b04849d5981d80aad733aed7_grande.png' },
  ]


  // 
  slides = [
    { img: "https://via.placeholder.com/600.png/09f/fff" },
    { img: "https://via.placeholder.com/600.png/021/fff" },
    { img: "https://via.placeholder.com/600.png/321/fff" },
    { img: "https://via.placeholder.com/600.png/422/fff" },
    { img: "https://via.placeholder.com/600.png/654/fff" }
  ];
  slideConfig = {
    "slidesToShow": 4, "slidesToScroll": 1,
    'arrows': true,

    "nextArrow": "<div class='nav-btn next-slide bg-red-300 p-3 rounded-full' style='position:absolute;z-index:99;top:45%;  right:-3px;'><i class='lg:text-lg hover:text-green-600 fas fa-arrow-right'></i></div>",
    "prevArrow": "<div class='nav-btn prev-slide bg-red-300 p-3 rounded-full' style='position:absolute;z-index:99;top:45%;  left:0px;'><i class='lg:text-lg hover:text-green-600 fas fa-arrow-left'></i></div>",
    'swipeToSlide': true,
    'infinite': true,
    'autoplay': true,
        'autoplaySpeed': 3000,
        'speed': 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2
        }
      }
    ]

  };
  

  addToCart(product: any) {
    // product.size = this.selectedOption
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
    console.log(this.cartService.getItems())
  }
  constructor(private cartService: CartService, private apiService: ApiService) { }
  ngOnInit(): void {
    this.apiService.GetAllProduct().subscribe(res => {
      this.hotproduct =res
      // this.bestproduct = this.hotproduct.filter((items: { category: string; }) => items.category === 'Quần');
      this.bestproduct = this.hotproduct.slice(0,10)
      this.hotproduct = this.hotproduct.reverse().slice(0,10)
    })
  }
}
