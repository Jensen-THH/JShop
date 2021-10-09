import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  isDev: boolean;
  REST_API = "http://localhost:8000/apiuser"
  constructor(private httpClient: HttpClient) {
    this.isDev = true;  // Change to false before deployment
  }
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

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  authenticateUser(user: any) {
    let API_URL = `${this.REST_API}/login`;
    return this.httpClient.post(API_URL, user, { headers: this.httpHeaders }).pipe(map((res: any) => {
      return  res || {}
    }), catchError(this.handleError))
  }
  getAlluser(){
    let API_URL = `${this.REST_API}/all`;
    return this.httpClient.get(API_URL)
  } 
    // delete product
    deleteUser(id: any): Observable<any> {
      let API_URL = `${this.REST_API}/delete-user/${id}`;
      return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(catchError(this.handleError))
    }

  // getProfile() {
  //   this.loadToken();
  //   let API_URL = `${this.REST_API}/admin`;
  //   this.httpHeaders.append('Authorization', this.authToken);
  //   return this.httpClient.get(API_URL,{ headers: this.httpHeaders }).pipe(map((res: any) => {
  //       return res || {}
  
  //     }), catchError(this.handleError))
  //   }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedAsAdmin(){
    let isAdmin = false
    let user:any = localStorage.getItem('user');
    user = JSON.parse(user)
    
    if (user && user.email === "admin@gmail.com"){
      isAdmin = true
    }
    else{
      isAdmin = false
    }
    return isAdmin

  }
  loggedIn() {
   
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}