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
  
  ngOnInit(): void {
    console.log(this.heroes[1].images[0]);
  }

}
