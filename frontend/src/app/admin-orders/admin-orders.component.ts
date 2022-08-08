import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from '../models/order';
import { AuthGuard } from '../services/auth-guard.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orderList:Array<OrderModel>=[];
  userId:string;

  constructor(private _authGuard:AuthGuard, private _router:Router, private _httpClient:HttpClient) { }

  ngOnInit(): void {
    if (!this._authGuard.isAdmin()){
      alert("Need admin privileges to access this page.");
      this._router.navigate(['homepage']);
    }

    this._httpClient.get<OrderModel[]>('http://localhost:8080/orders').subscribe(results=>{
      this.orderList = results;

    }, error=>{
      console.log(error);
    });
  }

  deleteOrder(orderId:string){
    this._httpClient.delete('http://localhost:8080/orders/'+orderId).subscribe(result=>{
      console.log(result);
    }, error=>{
      console.log(error);
    })

    window.location.reload();
  }

  processOrder(orderId:any, order:OrderModel){

    order.orderDeliveredOn= new Date();
    order.isDelivered = true;

    this._httpClient.put('http://localhost:8080/orders/'+ orderId, order).subscribe(result=>{
      console.log(result);
    }, error=>{
      console.log(error);
    })
  }
}
