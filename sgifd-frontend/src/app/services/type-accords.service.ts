import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeAccord} from "../models/TypeAccord";

@Injectable({
  providedIn: 'root'
})
export class TypeAccordsService {

  url: string = environment.backend + '/type-accord';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(typeaccord: TypeAccord): Observable<Object> {
    return this.http.post(`${this.url}/save`, typeaccord);
  }

  // Enregistrement des objectifs de développement durable
  delete(typeaccord: TypeAccord): Observable<Object> {
    return this.http.post(`${this.url}/delete`, typeaccord);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
