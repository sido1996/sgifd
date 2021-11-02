import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ReponseRequeteFinancement} from "../models/ReponseRequeteFinancement";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReponseRequeteFinancementService {

  url: string = environment.backend + '/requete-financement/reponse';

  constructor(private http: HttpClient) { }

  save(reponserequetefinancement: ReponseRequeteFinancement, id: number): Observable<Object> {
    return this.http.post(`${this.url}/save/${id}`, reponserequetefinancement);
  }

  delete(reponserequetefinancement: ReponseRequeteFinancement): Observable<Object> {
    return this.http.post(`${this.url}/delete`, reponserequetefinancement);
  }


  list(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list/${id}`);
  }

}
