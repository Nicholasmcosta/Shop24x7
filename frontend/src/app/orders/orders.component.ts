import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  anyOrder:boolean=false;
  orderList:Array<OrderModel>=[];
  userId:string;

  constructor(private _httpClient:HttpClient) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this._httpClient.get<OrderModel[]>('http://localhost:8080/orders').subscribe(results=>{
      console.log(results);

      for(let index=0;index < results.length;index++){
        if(this.userId == results[index].userId){
          this.orderList.push(results[index]);
        }
      }
      console.log(this.orderList);
    })
  }

}
