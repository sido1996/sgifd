
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Commune} from "../models/Commune";
import {Observable} from "rxjs";
import {NatureAideAlimentaireDetail} from "../models/nature-aide-alimentaire-detail";

@Injectable({
  providedIn: 'root'
})
export class NatureAideAlimentaireDetailService {

  url: string = environment.backend + '/nature-aide-alimentaire-detail';

  constructor(private http: HttpClient) { }

  save(natureAideAlimentaire: NatureAideAlimentaireDetail): Observable<Object> {
    return this.http.post(`${this.url}/save`, natureAideAlimentaire);
  }

  // Enregistrement des objectifs de développement durable
  delete(natureAideAlimentaire: NatureAideAlimentaireDetail): Observable<Object> {
    return this.http.post(`${this.url}/delete`, natureAideAlimentaire);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
