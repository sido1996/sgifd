import { Injectable } from '@angular/core';
import {RelanceRequeteFinancement} from "../models/RelanceRequeteFinancement";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {InstructionRequete} from "../models/InstructionRequete";

@Injectable({
  providedIn: 'root'
})
export class InstructionRequeteService {

  url: string = environment.backend + '/instruction-requete/requete';

  constructor(private http: HttpClient) { }

  save(instruction: InstructionRequete, id: number): Observable<Object> {
    return this.http.post(`${this.url}/save/${id}`, instruction);
  }

  delete(instruction: InstructionRequete): Observable<Object> {
    return this.http.post(`${this.url}/delete`, instruction);
  }


  list(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list/${id}`);
  }

}
