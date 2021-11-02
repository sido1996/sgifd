import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Envergure} from "../models/Envergure";
import {Observable} from "rxjs";
import {GrandSecteur} from "../models/GrandSecteur";

@Injectable({
  providedIn: 'root'
})
export class GrandSecteurService {

  url: string = environment.backend + '/grand-secteur';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(grandsecteur: GrandSecteur ): Observable<Object> {
    return this.http.post(`${this.url}/save`, grandsecteur);
  }

  // Enregistrement des objectifs de développement durable
  delete(grandsecteur: GrandSecteur ): Observable<Object> {
    return this.http.post(`${this.url}/delete`, grandsecteur);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
