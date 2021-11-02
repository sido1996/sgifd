import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ModuleUser} from "../models/ModuleUser";

@Injectable({
  providedIn: 'root'
})
export class ModuleUserService {

  url: string = environment.backend + '/module-user';

  constructor(private http: HttpClient) { }

  // liste  des arrondissement
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }
  // Enregistrement des arrondissements
  save(moduleUser: ModuleUser): Observable<Object> {
    return this.http.post(`${this.url}/save`, moduleUser);
  }

  // Suppression  d'un arrondissement
  delete(moduleUser: ModuleUser): Observable<Object> {
    return this.http.post(`${this.url}/delete`, moduleUser);
  }
}
