import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TokenStorage} from "../utils/token.storage";
import {User} from "../models/User";
import {Header} from "../payload/Header";
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SignRequest} from '../payload/SignRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginRequestService {


  url: string = environment.backend + '/auth';
  public currentUser: BehaviorSubject<User> ;
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,  private tokenStorage: TokenStorage,) {
    this.currentUser = new BehaviorSubject<User>(JSON.parse(this.tokenStorage.getCurrentUser()));
    this.isUserLoggedIn = new BehaviorSubject<boolean>((JSON.parse(this.tokenStorage.getCurrentUser()) != null) ? true : false);
  }

  signin(signRequest: SignRequest): Observable<Object>  {
    return this.http.post(`${environment.backend}/signin`, signRequest);
  }

  public setCurrentUserConnected() {
    this.currentUser = new BehaviorSubject<User>(JSON.parse(this.tokenStorage.getCurrentUser()));
  }

  public setIsConnectedUser() {
    this.isUserLoggedIn = new BehaviorSubject<boolean>((JSON.parse(this.tokenStorage.getCurrentUser()) != null) ? true : false);
  }

}
