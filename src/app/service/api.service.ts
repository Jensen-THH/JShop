import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from './product';
@Injectable({
  providedIn: 'root'
})


export class ApiService {

  REST_API = "https://jshopvn.herokuapp.com/api"
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  // add product 
  AddProduct(data: Product): Observable<any> {
    
    data.price.old =  (data.price.old + "đ").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    data.price.sale =  (data.price.sale + "đ").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    let API_URL = `${this.REST_API}/add-product`;
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleError))
  }
  // get all product
  public GetAllProduct() {
    // console.log('get api')
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
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
    .pipe(map((res: any) => {
      return res || {}

    }), catchError(this.handleError))
  }
  // update product
  updateProduct(id: any, data: any): Observable<any> {
    data.price.old =  (data.price.old + "đ").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    data.price.sale =  (data.price.sale + "đ").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    let API_URL = `${this.REST_API}/update-product/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders }).pipe(catchError(this.handleError))
  }
  // delete product
  deleteProduct(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-product/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(catchError(this.handleError))
  }
  // delete images
  deleteImages(nameimages: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-images/${nameimages}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(catchError(this.handleError))
  }
  uploadImage(images:any){
    let API_URL = `${this.REST_API}/multiple`;
    return this.httpClient.post(API_URL, images, {responseType: "text"}).pipe(catchError(this.handleError))
  }
}
