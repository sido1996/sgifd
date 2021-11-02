import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from "../models/User";
import {ResetPassword} from "../payload/ResetPassword";
import {UserSystem} from "../models/UserSystem";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {

  }

  url: string = environment.backend + '/user';

  list(): Observable<Object>  {
    return this.http.get(`${this.url}/list`);
  }

  updateAccount(userSystem: UserSystem): Observable<Object>  {
    return this.http.post(`${this.url}/update-acount`, userSystem);
  }

  updateUserFisrtPassword(passwordNew: string): Observable<Object>  {
    return this.http.post(`${this.url}/update-password`, passwordNew);
  }

  save(userSystem: UserSystem): Observable<Object>  {
    return this.http.post(`${this.url}/save`, userSystem);
  }

  delete(id: number): Observable<Object>  {
    return this.http.get(`${this.url}/delete/${id}`);
  }

  desactiver(id: number): Observable<Object>  {
    return this.http.get(`${this.url}/desactiver/${id}`);
  }

  activer(id: number): Observable<Object>  {
    return this.http.get(`${this.url}/activer/${id}`);
  }

  getById(id: number): Observable<Object>  {
    return this.http.get(`${this.url}/get-by-id/${id}`);
  }

  userResetPassword(resetPassword: ResetPassword): Observable<Object>  {
    return this.http.post(`${this.url}/reset-password`, resetPassword);
  }

  me(): Observable<Object>  {
    return this.http.get(`${this.url}/me`);
  }

}
