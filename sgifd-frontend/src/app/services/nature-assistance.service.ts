import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {NatureFinancement} from '../models/NatureFinancement';
import {Observable} from 'rxjs';
import {NatureAssistance} from '../models/NatureAssistance';

@Injectable({
  providedIn: 'root'
})
export class NatureAssistanceService {

  url: string = environment.backend + '/nature-assistance';

  constructor(private http: HttpClient) { }

  // Enregistrement des natures de financements
  save(natureassistance: NatureAssistance ): Observable<Object> {
    return this.http.post(`${this.url}/save`, natureassistance);
  }

  // Enregistrement  des natures de financements
  delete(natureassistance: NatureAssistance ): Observable<Object> {
    return this.http.post(`${this.url}/delete`, natureassistance);
  }

  // liste  des natures de financements
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  // liste  des natures de financements
  listAppui(): Observable<Object> {
    return this.http.get(`${this.url}/list-appui`);
  }

}
