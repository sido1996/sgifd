import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModuleUser} from "../../../../models/ModuleUser";
import {UserSystem} from "../../../../models/UserSystem";
import {AccreditatedUser} from "../../../../models/AccreditatedUser";
import {User} from "../../../../models/User";
import {FindValues} from "../../../../payload/FindValues";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ModuleUserService} from "../../../../services/module-user.service";
import {UserService} from "../../../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  paramKey: any;

  userAction: UserSystem = null;
  moduleUserListSelected: Array<ModuleUser> = [];

  user: User = null;
  filter: any;
  private findValues: FindValues = new FindValues();

  isNotificationForm: boolean = false;

  accreditatedUserList: Array<AccreditatedUser> = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorage,
              private modalService: NzModalService,
              private  activeRoute: ActivatedRoute,
              private moduleUserService: ModuleUserService,
              private userService: UserService,
              private message: NzMessageService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.paramKey = this.activeRoute.snapshot.params['paramKey'];

    this.userService.getById(this.paramKey).subscribe(
      (data: UserSystem) => {
        this.moduleUserListSelected = data.moduleUsers;
        this.accreditatedUserList = data.accreditatedUsers;
        this.userAction = data;
      });

  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  closeNotificationForm() {
    this.isNotificationForm = false;
  }

  gotoListUtilisateurs() {
    this.router.navigate(['admin/utilisateurs/list-user']);
  }

  indexOfElement(id: number, listElement: Array<any>): number {
    let index = -1;
    let rep: boolean = false;
    let i = 0;
    while (i < listElement.length && rep === false) {
      if (listElement[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

}
