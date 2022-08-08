import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthGuard } from '../services/auth-guard.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  id:any;
  product: Product = new Product();

  constructor(private _route:ActivatedRoute, private _httpClient:HttpClient,
    private _router:Router, private _authGuard:AuthGuard) { }

  ngOnInit(): void {
    if (!this._authGuard.isAdmin()){
      alert("Need admin privileges to access this page.");
      this._router.navigate(['homepage']);
    }

    this.id=this._route.snapshot.paramMap.get('id');
    console.log(this.id);
    this._httpClient.get<Product>('http://localhost:8080/products/products/'+this.id).subscribe(result=>{
      this.product = result;
    },error=>{
      console.log(error);
    })
  }

  
  updateProduct(){
    this._httpClient.put('http://localhost:8080/products/update/'+this.id,this.product).subscribe(result=>{
      //alert('Product Updated Successfully');
      console.log(result);
      this._router.navigate(['/admin/manage-products']);

    }, (error)=>{
      console.log(error);
    })
  }
}
