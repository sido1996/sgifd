import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Arrondissement} from "../models/Arrondissement";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArrondissementService {

  url: string = environment.backend + '/arrondissement';

  constructor(private http: HttpClient) { }

  // Enregistrement des arrondissements
  save(arrondissement: Arrondissement): Observable<Object> {
    return this.http.post(`${this.url}/save`, arrondissement);
  }

  // Suppression  d'un arrondissement
  delete(arrondissement: Arrondissement): Observable<Object> {
    return this.http.post(`${this.url}/delete`, arrondissement);
  }

  // liste  des arrondissement
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  listParCommune(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list/` + id);
  }

}
