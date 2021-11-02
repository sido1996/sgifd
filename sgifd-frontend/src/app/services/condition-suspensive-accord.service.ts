import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ConditionSuspensiveAccord} from "../models/ConditionSuspensiveAccord";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConditionSuspensiveAccordService {

  url: string = environment.backend + '/condition-suspensive-accord';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  saveAlone(conditionSuspensiveAccord: ConditionSuspensiveAccord): Observable<Object> {
    return this.http.post(`${this.url}/save-alone`, conditionSuspensiveAccord);
  }

  // Enregistrement des objectifs de développement durable
  save(id: number, conditionSuspensiveAccord: ConditionSuspensiveAccord): Observable<Object> {
    return this.http.post(`${this.url}/save/${id}`, conditionSuspensiveAccord);
  }

  // Enregistrement des objectifs de développement durable
  delete(conditionSuspensiveAccord: ConditionSuspensiveAccord): Observable<Object> {
    return this.http.post(`${this.url}/delete`, conditionSuspensiveAccord);
  }

  // liste des objectifs de développement durable
  list(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list/${id}`);
  }

}
