import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TypeCooperation} from "../models/TypeCooperation";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TypeCooperationService {

  url: string = environment.backend + '/type-cooperation';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(typecooperation: TypeCooperation): Observable<Object> {
    return this.http.post(`${this.url}/save`, typecooperation);
  }

  // Enregistrement des objectifs de développement durable
  delete(typecooperation: TypeCooperation): Observable<Object> {
    return this.http.post(`${this.url}/delete`, typecooperation);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
