import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AxePrioritaire} from "../models/AxePrioritaire";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AxePrioritaireService {

  url: string = environment.backend + '/axe-prioritaire';

  constructor(private http: HttpClient) { }

  // Enregistrement des axeprioritaires
  save(axeprioritaire: AxePrioritaire): Observable<Object> {
    return this.http.post(`${this.url}/save`, axeprioritaire);
  }

  // Suppression  d'un axeprioritaire
  delete(axeprioritaire: AxePrioritaire): Observable<Object> {
    return this.http.post(`${this.url}/delete`, axeprioritaire);
  }

  // liste  des axeprioritaire
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  // liste  des axeprioritaire
  listByPilier(id: number): Observable<Object> {
    return this.http.get(`${this.url}/getByPilierPAG/${id}`);
  }

}
