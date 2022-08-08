export class OrderModel{
    userId: string;
    userEmail: string;
    orderPlacedOn: Date;
    items: Array<string> =[];
    total:number;
    isDelivered:boolean;
    orderDeliveredOn:Date;
}