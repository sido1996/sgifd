import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role} from "../models/Role";

@Injectable({
  providedIn: 'root'
})
export class RoleUserService {

  url: string = environment.backend + '/role';

  constructor(private http: HttpClient) { }

  // Enregistrement des arrondissements
  save(role: Role): Observable<Object> {
    return this.http.post(`${this.url}/save`, role);
  }

  // Suppression  d'un arrondissement
  delete(role: Role): Observable<Object> {
    return this.http.post(`${this.url}/delete`, role);
  }

  // liste  des arrondissement
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }
}
