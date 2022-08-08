import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { AuthGuard } from '../services/auth-guard.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  id: string;
  product:Product = new Product();
  products:Array<Product>;

  constructor(private _httpClient:HttpClient, private _route:ActivatedRoute, 
    private _router:Router, private _authGuard:AuthGuard) { }

  ngOnInit(): void {

    if (!this._authGuard.isAdmin()){
      alert("Need admin privileges to access this page.");
      this._router.navigate(['homepage']);
    }

    this.id = this._route.snapshot.paramMap.get('id');
    console.log(this.id);
    this._httpClient.get<Product[]>('http://localhost:8080/products/products').subscribe(result=>{
      this.products=result;
      console.log(result);     
    }, error=>{
      console.log(error);
    }

    )

  }

  // http://localhost:8080/products/delete/60fee536e9a56238c468c4c5
 
  deleteProduct()
  {
    this._httpClient.delete('http://localhost:8080/products/delete/'+this.id).subscribe(result=>{
     // alert('product deleted successfully');
      //console.log(result);
    this._router.navigate(['/admin/manage-products']);
    },
    error=>{
        console.log(error);
    })
  }
}
