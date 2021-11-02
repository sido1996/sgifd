import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ConditionSuspensiveUnDecaissement} from "../models/ConditionSuspensiveUnDecaissement";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConditionSuspensiveUnDecaissementService {

  url: string = environment.backend + '/condition-suspensive-premier-decaissement';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(conditionSuspensiveUnDecaissement: ConditionSuspensiveUnDecaissement): Observable<Object> {
    return this.http.post(`${this.url}/save`, conditionSuspensiveUnDecaissement);
  }

  // Enregistrement des objectifs de développement durable
  delete(conditionSuspensiveUnDecaissement: ConditionSuspensiveUnDecaissement): Observable<Object> {
    return this.http.post(`${this.url}/delete`, conditionSuspensiveUnDecaissement);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
