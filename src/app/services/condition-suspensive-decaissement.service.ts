import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ConditionSuspensiveDecaissement} from "../models/ConditionSuspensiveDecaissement";
import {Observable} from "rxjs";
import {ConditionSuspensiveAccord} from "../models/ConditionSuspensiveAccord";

@Injectable({
  providedIn: 'root'
})
export class ConditionSuspensiveDecaissementService {


  url: string = environment.backend + '/condition-suspensive-decaissement';

  constructor(private http: HttpClient) { }


  // Enregistrement des objectifs de développement durable
  saveAlone(conditionSuspensiveDecaissement: ConditionSuspensiveDecaissement): Observable<Object> {
    return this.http.post(`${this.url}/save-alone`, conditionSuspensiveDecaissement);
  }

  // Enregistrement des objectifs de développement durable
  save(conditionSuspensiveDecaissement: ConditionSuspensiveDecaissement): Observable<Object> {
    return this.http.post(`${this.url}/save`, conditionSuspensiveDecaissement);
  }

  // Enregistrement des objectifs de développement durable
  delete(conditionSuspensiveDecaissement: ConditionSuspensiveDecaissement): Observable<Object> {
    return this.http.post(`${this.url}/delete`, conditionSuspensiveDecaissement);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
