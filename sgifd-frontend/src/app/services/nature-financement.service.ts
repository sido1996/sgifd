import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {GrandSecteur} from "../models/GrandSecteur";
import {Observable} from "rxjs";
import {NatureFinancement} from "../models/NatureFinancement";

@Injectable({
  providedIn: 'root'
})
export class NatureFinancementService {

  url: string = environment.backend + '/nature-financement';

  constructor(private http: HttpClient) { }

  // Enregistrement des natures de financements
  save(naturefinancement: NatureFinancement ): Observable<Object> {
    return this.http.post(`${this.url}/save`, naturefinancement);
  }

  // Enregistrement  des natures de financements
  delete(naturefinancement: NatureFinancement): Observable<Object> {
    return this.http.post(`${this.url}/delete`, naturefinancement);
  }

  // liste  des natures de financements
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
