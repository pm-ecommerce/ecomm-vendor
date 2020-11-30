import {BadInput} from '../../shared/bad-input';

import {NotFoundError} from 'src/app/shared/not-found-error';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {throwError} from 'rxjs';
import {AppError} from 'src/app/shared/app-error';

export class DaoService {

  private httpOptions;

  constructor(private url: string, private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token')
      })
    };
  }

  getAll(url?: string) {
    return this.http.get(this.url + (url ? url : ''))
      .pipe(
        catchError(this.handleError)
      );
  }

  patch(path = '', data = {}) {
    return this.http.patch(this.url + path, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  get(id, url?: string) {
    return this.http.get(this.url + (url ? url : '') + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  getRoles(url: string) {
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(resource, url?: string) {
    return this.http.post(this.url + (url ? url : ''), resource)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(resource, url?: string) {
    return this.http.patch(this.url + (url ? url : '') + '/' + resource.id, resource)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(path) {
    return this.http.delete(this.url + path)
      .pipe(
        catchError(this.handleError)
      );
  }

  login(url = '', credentials = {}) {
    return this.http.post(this.url + url, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: Response) {
    switch (error.status) {
      case 400:
        return throwError(new BadInput(error));
        break;
      case 404:
        return throwError(new NotFoundError(error));
        break;
      default:
        return throwError(new AppError(error));
    }
  }

}
