import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { AuthGuard } from '../services/auth-guard.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  product: Product = new Product();
  
  constructor(private _httpClient:HttpClient, private _router:Router, private _authGuard: AuthGuard) { }

  ngOnInit(): void {
    if (!this._authGuard.isAdmin()){
      alert("Need admin privileges to access this page.");
      this._router.navigate(['homepage']);
    }
  }

  addProduct(){

    this._httpClient.post('http://localhost:8080/products/save',this.product).subscribe(result=>{  
    //alert('Product Added')
    //this._router.navigate(['/admin/manage-products'])
      //console.log(result); 
      alert(result['message']);
      window.location.replace('admin/manage-products')
    },(err)=>{console.log(err) })
  }

}
