import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FiliereBourse} from "../models/FiliereBourse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FiliereBourseService {

  url: string = environment.backend + '/filiere-bourse-formation';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(filierebourse: FiliereBourse): Observable<Object> {
    return this.http.post(`${this.url}/save`, filierebourse);
  }

  // Enregistrement des objectifs de développement durable
  delete(filierebourse: FiliereBourse): Observable<Object> {
    return this.http.post(`${this.url}/delete`, filierebourse);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
