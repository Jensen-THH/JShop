import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Product {
  name!: string;
  price!: {
    sale: string;
    old: string
  };
  // images:object;
  images!: string[];

  sku!: string;
  description!: string;
  category!: string;
}
