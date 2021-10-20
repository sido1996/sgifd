import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Arrondissement } from "../models/Arrondissement";
import { Observable } from "rxjs";
import { ZoneLocalite } from '../models/ZoneLocalite';

@Injectable({
  providedIn: 'root'
})
export class ZoneLocaliteService {

  url: string = environment.backend + '/zone-localite';

  constructor(private http: HttpClient) { }

  // Enregistrement des localiés
  save(zoneLocalite: ZoneLocalite): Observable<Object> {
    return this.http.post(`${this.url}/save`, zoneLocalite);
  }

  // Suppression  d'un localié
  delete(zoneLocalite: ZoneLocalite): Observable<Object> {
    return this.http.post(`${this.url}/delete`, zoneLocalite);
  }

  // liste  des localiés
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }
  // liste  des localiés
  listByIde(ide): Observable<Object> {
    return this.http.get(`${this.url}/list-by-ide/` + ide);
  }

  listParArrondissement(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list/` + id);
  }

}
