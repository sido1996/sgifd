import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CategorieProjet} from "../models/CategorieProjet";
import {Observable} from "rxjs";
import {DeviseMonaie} from "../models/DeviseMonaie";

@Injectable({
  providedIn: 'root'
})
export class DeviseMonaieService {

  url: string = environment.backend + '/devise-monnaie';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(devisemonaie: DeviseMonaie ): Observable<Object> {
    return this.http.post(`${this.url}/save`, devisemonaie);
  }

  // Enregistrement des objectifs de développement durable
  delete(devisemonaie: DeviseMonaie ): Observable<Object> {
    return this.http.post(`${this.url}/delete`, devisemonaie);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
