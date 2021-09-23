import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  REST_API = "http://localhost:8000/api"
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  // get all product
  public GetAllProduct() {
    console.log('get api')
    return this.httpClient.get(`${this.REST_API}/all`);
  }
  // err
  handleError(error: HttpErrorResponse) {
    let errorMessage = ""
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message
    } else {
      errorMessage = `Error code:${error.status}\nMessage:${error.message}`;
    }
    console.log(errorMessage)
    return throwError(errorMessage)
  };
  // get one product
  public GetOneProduct(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-product/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(map((res: any) => {
      return res || {}

    }), catchError(this.handleError))
  }
}
