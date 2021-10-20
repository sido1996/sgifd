import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PrevisionRealisationIde} from "../models/PrevisionRealisationIde";

@Injectable({
  providedIn: 'root'
})
export class PrevisionRealisationIdeService {

  url: string = environment.backend + '/prevision-realisation-ide';

  constructor(private http: HttpClient) { }


  // Suppression  d'un prevision-realisation-ide
  delete(previsionRealisationIde: PrevisionRealisationIde): Observable<Object> {
    return this.http.post(`${this.url}/delete`, previsionRealisationIde);
  }



}
