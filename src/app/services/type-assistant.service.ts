import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TypeAssistance} from '../models/TypeAssistance';

@Injectable({
  providedIn: 'root'
})
export class TypeAssistantService {

  url: string = environment.backend + '/type-assistance';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(typeassistance: TypeAssistance): Observable<Object> {
    return this.http.post(`${this.url}/save`, typeassistance);
  }

  // Enregistrement des objectifs de développement durable
  delete(typeassistance: TypeAssistance): Observable<Object> {
    return this.http.post(`${this.url}/delete`, typeassistance);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  // liste des objectifs de développement durable
  listAppui(): Observable<Object> {
    return this.http.get(`${this.url}/list-appui`);
  }

}
