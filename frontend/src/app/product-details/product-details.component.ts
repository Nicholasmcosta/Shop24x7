import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { AuthGuard } from '../services/auth-guard.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id:any;
  product :Product = new Product();

  constructor(private _httpClient:HttpClient, private _router:Router, 
    private _route:ActivatedRoute, private _authGuard:AuthGuard) { }

  ngOnInit(): void {

    if (!this._authGuard.isAdmin()){
      alert("Need admin privileges to access this page.");
      this._router.navigate(['homepage']);
    }

    this.id = this._route.snapshot.paramMap.get('id');

    this._httpClient.get<Product>('http://localhost:8080/products/products/'+this.id).subscribe(result=>{
      this.product=result;
      console.log(result);
    },error=>{
      console.log(error);
    })
  }


  deleteProduct()
  {
    this._httpClient.delete('http://localhost:8080/products/delete/'+this.id).subscribe(result=>{
      alert('product deleted successfully');
      console.log(result);
    this._router.navigate(['/admin/manage-products']);
    },
    error=>{
        console.log(error);
    })
  }


}
