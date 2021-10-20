import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TypeAppreciation} from "../models/TypeAppreciation";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TypeAppreciationService {


  url: string = environment.backend + '/type-appreciation';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(typeappreciation: TypeAppreciation): Observable<Object> {
    return this.http.post(`${this.url}/save`, typeappreciation);
  }

  // Enregistrement des objectifs de développement durable
  delete(typeappreciation: TypeAppreciation): Observable<Object> {
    return this.http.post(`${this.url}/delete`, typeappreciation);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
