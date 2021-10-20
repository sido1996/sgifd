import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Pays} from "../models/Pays";
import {Observable} from "rxjs";
import {RegroupementClubPtf} from "../models/RegroupementClubPtf";

@Injectable({
  providedIn: 'root'
})
export class RegroupementClubPtfService {

  url: string = environment.backend + '/regroupement-club-ptf';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(regroupementclubptf: RegroupementClubPtf): Observable<Object> {
    return this.http.post(`${this.url}/save`, regroupementclubptf);
  }

  // Enregistrement des objectifs de développement durable
  delete(regroupementclubptf: RegroupementClubPtf): Observable<Object> {
    return this.http.post(`${this.url}/delete`, regroupementclubptf);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
