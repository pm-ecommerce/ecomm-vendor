import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DaoService } from './base/dao.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService extends DaoService {

  constructor(http: HttpClient) {
    //super('http://localhost:8082/api/products', http);
    super(`${environment.categoryUrl}products`, http);
  }
}
