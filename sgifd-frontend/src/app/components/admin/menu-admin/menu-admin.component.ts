import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/User";
import {TokenStorage} from "../../../utils/token.storage";

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  user: User = null;

  constructor(
    private tokenStorage: TokenStorage,
  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  getIsModuleForUser(nameModule: string): boolean {
    let rep = false;
    this.user.moduleUsers.forEach( m => {
      if(m.name === nameModule) rep= true;
    });
    return rep;
  }

}
