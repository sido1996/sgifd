import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ResetPassword} from '../payload/ResetPassword';
import {ResetAccount} from '../payload/ResetAccount';

@Injectable({
    providedIn: 'root'
})
export class DefaultService {

  constructor(private http: HttpClient) {
  }

  url: String = environment.backend + '/default';

  // Vérifie l'existance d'un IFU
  checkParamLink(paramKey: string): Observable<Object> {
    return this.http.get(`${this.url}/verifiy-link/${paramKey}`);
  }

  // Vérifie l'existance d'un email
  checkEmailExist(email: string): Observable<Object> {
    return this.http.get(`${this.url}/check-email/${email}`);
  }

  // Vérifie l'existance d'un phone number
  checkPhoneExist(phoneNumber: string): Observable<Object> {
    return this.http.get(`${this.url}/check-phone/${phoneNumber}`);
  }

  // Vérifie l'existance d'un IFU

  checkEmailAvailability(resetAccount: ResetAccount): Observable<Object> {
    return this.http.post(`${this.url}/checkEmailAvailability`, resetAccount);
  }

  // Création du compte du contribuable
  enums(): Observable<Object>  {
    return this.http.get(`${this.url}/enums`);
  }


}
