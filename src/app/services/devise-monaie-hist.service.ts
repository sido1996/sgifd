import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DeviseMonaie} from "../models/DeviseMonaie";
import {Observable} from "rxjs";
import {DeviseMonaieHist} from "../models/DeviseMonaieHist";

@Injectable({
  providedIn: 'root'
})
export class DeviseMonaieHistService {

  url: string = environment.backend + '/devise-monnaie-hist';

  constructor(private http: HttpClient) { }

  // Enregistrement des configurations de devises de monaie
  save(devisemonaiehist: DeviseMonaieHist ): Observable<Object> {
    return this.http.post(`${this.url}/save`, devisemonaiehist);
  }

  // Enregistrement des configurations de devises de monaie
  delete(devisemonaiehist: DeviseMonaieHist): Observable<Object> {
    return this.http.post(`${this.url}/delete`, devisemonaiehist);
  }

  // liste des configurations de devises de monaie
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
