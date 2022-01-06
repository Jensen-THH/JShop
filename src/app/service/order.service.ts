import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  REST_API = "https://jshopvn.herokuapp.com/order"
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }
  AddOrder(data: any): Observable<any> {
    let API_URL = `${this.REST_API}/add-order`;
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleError))
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
  // get all Order
  public GetAllOrder() {
    // console.log('get api')
    return this.httpClient.get(`${this.REST_API}/all`);
  }
  // delete Order
  deleteOrder(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-order/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(catchError(this.handleError))
  }
    // update order
    updateOrder(id: any, data: any): Observable<any> {
      let API_URL = `${this.REST_API}/update-order/${id}`;
      return this.httpClient.put(API_URL, data, { headers: this.httpHeaders }).pipe(catchError(this.handleError))
    }
    // get one order
  public GetOneOrder(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-order/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
    .pipe(map((res: any) => {
      return res || {}
    }), catchError(this.handleError))
  }
}
