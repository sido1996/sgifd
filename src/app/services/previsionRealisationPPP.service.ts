import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Arrondissement} from "../models/Arrondissement";
import {Observable} from "rxjs";
import { PrevisionRealisationPPP } from '../models/PrevisionRealisationPPP';

@Injectable({
  providedIn: 'root'
})
export class PrevisionRealisationPPPService {

  url: string = environment.backend + '/prevision-realisation-ppp';

  constructor(private http: HttpClient) { }

  // Enregistrement des arrondissements
  save(previsionRealisationPPP: PrevisionRealisationPPP): Observable<Object> {
    return this.http.post(`${this.url}/save`, previsionRealisationPPP);
  }

  // Suppression  d'un arrondissement
  delete(previsionRealisationPPP: PrevisionRealisationPPP): Observable<Object> {
    return this.http.post(`${this.url}/delete`, previsionRealisationPPP);
  }

  // liste  des arrondissement
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  listParCommune(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list/` + id);
  }

}
