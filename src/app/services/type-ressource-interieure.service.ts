import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {GrandSecteur} from "../models/GrandSecteur";
import {Observable} from "rxjs";
import {TypeRessourceInterieure} from "../models/TypeRessourceInterieure";

@Injectable({
  providedIn: 'root'
})
export class TypeRessourceInterieureService {

  url: string = environment.backend + '/type-ressource-interieure';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(typeressourceinterieure: TypeRessourceInterieure ): Observable<Object> {
    return this.http.post(`${this.url}/save`, typeressourceinterieure);
  }

  // Enregistrement des objectifs de développement durable
  delete(typeressourceinterieure: TypeRessourceInterieure): Observable<Object> {
    return this.http.post(`${this.url}/delete`, typeressourceinterieure);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
