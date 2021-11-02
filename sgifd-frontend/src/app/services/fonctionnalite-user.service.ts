import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Arrondissement} from "../models/Arrondissement";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FonctionnaliteUserService {

  url: string = environment.backend + '/fonctionnalite-user';

  constructor(private http: HttpClient) { }

  // liste  des arrondissement
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
