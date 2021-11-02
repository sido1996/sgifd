import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Exercice} from "../models/Exercice";
import {Observable} from "rxjs";
import {ObjectifODD} from "../models/ObjectifODD";

@Injectable({
  providedIn: 'root'
})
export class ObjectifOddService {


  url: string = environment.backend + '/odd';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(objectifodd: ObjectifODD): Observable<Object> {
    return this.http.post(`${this.url}/save`, objectifodd);
  }

  // Enregistrement des objectifs de développement durable
  delete(objectifodd: ObjectifODD): Observable<Object> {
    return this.http.post(`${this.url}/delete`, objectifodd);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
