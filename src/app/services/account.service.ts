import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DaoService } from './base/dao.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends DaoService {

  constructor(http: HttpClient) {
    super(`${environment.accountUrl}vendors`, http);
    //super('http://localhost:8081/api/employees', http)
  }
}
