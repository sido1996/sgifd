
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Commune} from "../models/Commune";
import {Observable} from "rxjs";
import {NatureAideAlimentaire} from "../models/nature-aide-alimentaire";

@Injectable({
  providedIn: 'root'
})
export class NatureAideAlimentaireService {

  url: string = environment.backend + '/nature-aide-alimentaire';

  constructor(private http: HttpClient) { }

  save(natureAideAlimentaire: NatureAideAlimentaire): Observable<Object> {
    return this.http.post(`${this.url}/save`, natureAideAlimentaire);
  }

  // Enregistrement des objectifs de développement durable
  delete(natureAideAlimentaire: NatureAideAlimentaire): Observable<Object> {
    return this.http.post(`${this.url}/delete`, natureAideAlimentaire);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
