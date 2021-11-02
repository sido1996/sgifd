import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StatusAccord } from '../models/StatusAccord';

@Injectable({
  providedIn: 'root'
})
export class StatusAccordService {

  url: string = environment.backend + '/status-accord';

  constructor(private http: HttpClient) { }

  // Enregistrement des statusAccords d'activités
  save(statusAccord: StatusAccord): Observable<Object> {
    return this.http.post(`${this.url}/save`, statusAccord);
  }

  // Enregistrement des statusAccords d'activités
  delete(statusAccord: StatusAccord): Observable<Object> {
    return this.http.post(`${this.url}/delete`, statusAccord);
  }

  // liste des statusAccords d'activité
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
