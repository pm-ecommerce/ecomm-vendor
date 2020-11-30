import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  public getOrders(vendorId: number, active = true, pageurl = '') {
    const url = `${environment.orderUrl}orders/vendors/${vendorId}/${active ? 'active' : 'complete'}`;
    return this.httpClient.get(url + pageurl);
  }

  public updateOrderStatus(order) {
    const url = `${environment.orderUrl}orders/updateStatus/${order.id}/${order.statusId}`;
    return this.httpClient.get(url);
  }
}
