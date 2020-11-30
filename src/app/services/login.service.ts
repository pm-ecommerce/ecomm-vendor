import {environment} from './../../environments/environment';
import {Profile} from './../entities/profile';
import {HttpClient} from '@angular/common/http';
import {DaoService} from './base/dao.service';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends DaoService {

  private helper = new JwtHelperService();

  constructor(http: HttpClient) {
    // super('http://localhost:8081/api/vendors/login', http);
    super(`${environment.accountUrl}vendors/login`, http);
  }

  signIn(credentials) {
    return this.login('', credentials)
      .pipe(
        map((response: any) => {
          if (response && response.data['token']) {
            localStorage.setItem('token', response.data['token']);
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    document.location.href = '/';
  }

  isLoggedIn() {
    const user = this.getCurrentUser();
    console.log(user);
    if (!user || user.type !== 'vendor') {
      return false;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return !this.helper.isTokenExpired(token);
  }

  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return this.helper.decodeToken(token);
  }

  changePassword(profile: Profile) {
    return this.update(profile, '');
  }
}
