import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css']
})
export class CategoryListingComponent implements OnInit {

  department: any;
  productList: Product[]
  MAX = Number.MAX_VALUE
  min = 0;
  max = this.MAX;

  constructor(private _httpClient:HttpClient, private _router:Router, private _route:ActivatedRoute, private _cartService : CartService) { }

  ngOnInit(): void {
    this.department = this._route.snapshot.paramMap.get('department');

    this._httpClient.get<Product[]>('http://localhost:8080/products/products').subscribe(result => {
      this.productList = result;
      this.productList.sort(value => {return value.topSelling ? -1 : 1});
      console.log(this.productList);
    }, error => {
      console.log(error);
    })
  }

  priceRange(min, max){
    this.min = min;
    this.max = max;
  }

  addToCart(product : Product){
    this._cartService.addToCart(product);
    console.log(product)
    alert('Product added!');
  }
}
