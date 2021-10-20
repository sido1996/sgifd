import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CycleBourse} from "../models/CycleBourse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CyclebourseService {

  url: string = environment.backend + '/cycle-bourse-formation';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(cyclebourse: CycleBourse): Observable<Object> {
    return this.http.post(`${this.url}/save`, cyclebourse);
  }

  // Enregistrement des objectifs de développement durable
  delete(cyclebourse: CycleBourse): Observable<Object> {
    return this.http.post(`${this.url}/delete`, cyclebourse);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
