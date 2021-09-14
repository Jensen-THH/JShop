import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { HEROES } from '../../mock-hero';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  heroes = HEROES;
  constructor() { }
  category = [
    {name:'Áo', description: 'Áo siêu đẹp',imgsrc:'https://product.hstatic.net/200000000131/product/trang-9_ec4c29eb591940cf80534125c76d2ac6_grande.jpg'},
    {name:'Váy',description: 'Váy siêu đẹp',imgsrc:'https://product.hstatic.net/200000000131/product/den-4_6b7882c3b3a340f2be2fa5e807b15243_grande.jpg'},
    {name:'Đầm',description: 'Đầm siêu đẹp',imgsrc:'https://product.hstatic.net/200000000131/product/vang-1_72d95a90683c406082a27aa87772f126_grande.jpg'},
    {name:'Quần',description: 'Quần siêu đẹp',imgsrc:'https://product.hstatic.net/200000000131/product/trang_3_1e7e2dbf5e8c4afe9fd248eecff6465d_ad008946b04849d5981d80aad733aed7_grande.png'},
  ]
  ngOnInit(): void {
    console.log(this.heroes[1].images[0]);
  }

}
