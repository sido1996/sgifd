import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RequeteFinancement} from "../models/RequeteFinancement";
import {Observable} from "rxjs";
import {RelanceRequeteFinancement} from "../models/RelanceRequeteFinancement";

@Injectable({
  providedIn: 'root'
})
export class RelanceRequeteFinancementService {

  url: string = environment.backend + '/requete-financement/relance';

  constructor(private http: HttpClient) { }

  save(relancerequetefinancement: RelanceRequeteFinancement, id: number): Observable<Object> {
    return this.http.post(`${this.url}/save/${id}`, relancerequetefinancement);
  }

  delete(relancerequetefinancement: RelanceRequeteFinancement): Observable<Object> {
    return this.http.post(`${this.url}/delete`, relancerequetefinancement);
  }


  list(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list/${id}`);
  }

}
