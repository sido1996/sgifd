import { RequeteFinancement } from './../models/RequeteFinancement';

import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from '../models/User';
import {ProjetProgrammeFinalise} from "../models/ProjetProgrammeFinalise";
import {UserSystem} from "../models/UserSystem";


const TOKEN_KEY = 'AuthToken';
const CURRENT_USER = 'CURRENT_USER';
const ROLE_ADMIN = 'ROLE_ADMIN';
const ROLE_USER_PTF = 'ROLE_USER_PTF';
const ROLE_USER = 'ROLE_USER';
const ROLE_USER_STRUCTURE_EXTERNE = 'ROLE_USER_STRUCTURE_EXTERNE';
const CURRENT_PROJET = 'CURRENT_PROJET';
const CURRENT_REQUETE_FINANCEMENT = 'CURRENT_REQUETE_FINANCEMENT';

@Injectable()
export class TokenStorage {


  expirationsession: number;
  constructor() {

   this.expirationsession = new Date().getTime() + environment.expirationTime;
  }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(CURRENT_USER);
    window.sessionStorage.clear();
  }

  public saveUserRole(role: string){
    window.sessionStorage.setItem(ROLE_ADMIN,  role);
  }

  public isOnlyAdmin(): boolean {
    let isAdmin: boolean = false;
    if(this.getCurrentUserSysteem() != null && this.getCurrentUserSysteem().firstLogin == false){
      this.getCurrentUserSysteem().roles.forEach(function(value){
        if (value.name != ROLE_USER  && value.name != ROLE_USER_STRUCTURE_EXTERNE && value.name != ROLE_USER_PTF)
        {
          isAdmin = true;
        }
      });
    }
    return isAdmin;
  }

  public isAdmin(): boolean {
    let isAdmin: boolean = false;
    if(this.getCurrentUserSysteem() != null && this.getCurrentUserSysteem().firstLogin == false){
      this.getCurrentUserSysteem().roles.forEach(function(value){
        if (value.name != ROLE_USER_STRUCTURE_EXTERNE && value.name != ROLE_USER_PTF)
        {
          isAdmin = true;
        }
      });
    }
    return isAdmin;
  }

  public isPTF(): boolean {
    let isAdmin: boolean = false;
    if(this.getCurrentUserSysteem() != null && this.getCurrentUserSysteem().firstLogin == false){
      this.getCurrentUserSysteem().roles.forEach(function(value){
        if (value.name != ROLE_USER_STRUCTURE_EXTERNE && value.name != ROLE_ADMIN)
        {
          isAdmin = true;
        }
      });
    }
    return isAdmin;
  }

  public isStructure(): boolean {
    let isAdmin: boolean = false;
    if(this.getCurrentUserSysteem() != null && this.getCurrentUserSysteem().firstLogin == false){
      this.getCurrentUserSysteem().roles.forEach(function(value){
        if (value.name != ROLE_USER_PTF && value.name != ROLE_ADMIN)
        {
          isAdmin = true;
        }
      });
    }
    return isAdmin;
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getCurrentUser(): string {
    return sessionStorage.getItem(CURRENT_USER);
  }

  public getCurrentUserSysteem(): UserSystem {
    return JSON.parse(sessionStorage.getItem(CURRENT_USER));
  }

  public  saveCurrentUser(currentUser): boolean {
    window.sessionStorage.removeItem(CURRENT_USER);
    window.sessionStorage.setItem(CURRENT_USER,  currentUser);
    return true;
  }

  public saveCurrentProjet(p: ProjetProgrammeFinalise): void {
    window.localStorage.setItem(CURRENT_PROJET, JSON.stringify(p));
  }

  public getCurrentProjet(): ProjetProgrammeFinalise {
    return JSON.parse(window.localStorage.getItem(CURRENT_PROJET));
  }

  public saveCurrentRequeteFinancement(p: RequeteFinancement): void {
    window.localStorage.setItem(CURRENT_REQUETE_FINANCEMENT, JSON.stringify(p));
  }

  public getCurrentRequeteFinancement(): RequeteFinancement {
    return JSON.parse(window.localStorage.getItem(CURRENT_REQUETE_FINANCEMENT));
  }



}
