import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  // GET 8 most recent products from the database
  productList: Product[]
  categoryList = new Set();
  departments: any;

  constructor(private _httpClient:HttpClient, private _router:Router, private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this._httpClient.get<Product[]>('http://localhost:8080/products/products').subscribe(result => {
      this.productList = result;
      for (const product of this.productList) {
        this.categoryList.add(product.department);
      }
      this.departments = Array.from(this.categoryList)
    }, error => {
      console.log(error);
    })
  }

}
