import { Component, OnInit } from '@angular/core';
import {TokenStorage} from "../../utils/token.storage";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {LoginRequestService} from "../../services/login-request.service";

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User = null;
  isUserLoggedIn: boolean = false;

  constructor(private tokenStorage: TokenStorage,
              private router: Router,
              private loginRequestService: LoginRequestService) { }

  ngOnInit() {
   this.user = JSON.parse(this.tokenStorage.getCurrentUser());

   /* this.loginRequestService.currentUser.subscribe(value => {
      this.user = value;
    }); */
    this.loginRequestService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    if( this.isUserLoggedIn == false )
    $("#open-close-menu-header").addClass('hide');
  }

  logout() {
    this.isUserLoggedIn = false;
    this.user = null;
    this.tokenStorage.signOut();
    this.router.navigate(['login']);
  }

  navigateAdminUrl(): void {
    if(this.user != null && this.user.roles[0].name ==='ROLE_ADMIN') {
      this.router.navigate(['admin']);
    }
    if(this.user != null && this.user.roles[0].name ==='ROLE_USER_STRUCTURE_EXTERNE') {
      this.router.navigate(['admin-structure-externe']);
    }
    if(this.user != null && this.user.roles[0].name ==='ROLE_USER_PTF') {
      this.router.navigate(['admin-ptf']);
    }
    if(this.user == null) {
      location.href = "/";
    }

  }

}
