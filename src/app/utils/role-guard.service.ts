import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import * as JWT from 'jwt-decode';
import {TokenStorage} from "./token.storage";

@Injectable({ providedIn: 'root' })
export class RoleGuardService implements CanActivate {

  constructor(private router: Router, private auth: TokenStorage) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if(this.auth.isAdmin() == true) {
      return this.auth.isAdmin();
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
