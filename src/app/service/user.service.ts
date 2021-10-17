import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    username: '',
    email: '',
    password: ''
  };
  REST_API = "https://jshopvn.herokuapp.com/apiuser"
  constructor(private httpClient: HttpClient) { }

  postUser(user: User){
    return this.httpClient.post(this.REST_API+'/register',user);
  }
}