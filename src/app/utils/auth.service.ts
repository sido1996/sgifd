import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  authUrl = environment.backend + '/auth';
  //currentUserUrl = environment.backend + '/user/me';

  constructor(private http: HttpClient) {
  }

  attemptAuth(usernameOrEmail: string, password: string): Observable<any> {
    const credentials = {usernameOrEmail: usernameOrEmail, password: password};
    console.log('attempAuth ::');
    return this.http.post(`${this.authUrl}/signin`, credentials);
  }

  retrieveCurrentUser() {
    return this.http.get(`${this.authUrl}/me`);
  }

  resetAccount(email: string) {
    return this.http.post(`${this.authUrl}/check-email`, email);
  }

}
