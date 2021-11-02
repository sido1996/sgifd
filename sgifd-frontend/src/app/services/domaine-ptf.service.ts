import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DomainePTF} from "../models/DomainePTF";

@Injectable({
  providedIn: 'root'
})
export class DomainePtfService {

  url: string = environment.backend + '/domaine-intervention';

  constructor(private http: HttpClient) { }

  // Enregistrement des domaines d'intervention
  save(domaineptf: DomainePTF): Observable<Object> {
    return this.http.post(`${this.url}/save`, domaineptf);
  }

  // Enregistrement des domaines d'intervention
  delete(domaineptf: DomainePTF): Observable<Object> {
    return this.http.post(`${this.url}/delete`, domaineptf);
  }

  // liste des domaines d'intervention
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
