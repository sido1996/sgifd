import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/User";
import {RequeteFinancement} from "../../../../models/RequeteFinancement";
import {HttpErrorResponse} from "@angular/common/http";
import {UserSystem} from "../../../../models/UserSystem";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  userList: Array<UserSystem> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorage,
              private modalService: NzModalService,
              private userService: UserService,
              private message: NzMessageService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.getList();
  }

  getList(): void {
    this.userService.list().subscribe(
      (data: Array<UserSystem>) => {
        this.userList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }


  ouvrirModifier(id: number): void {
    this.router.navigate(['admin/utilisateurs/modifier-user/'+id]);
  }

  ouvrirDetail(id: number): void {
    this.router.navigate(['admin/utilisateurs/detail-user/'+id]);
  }

  deleteUser(user: UserSystem): void {
    this.modalService.info({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression du compte de l\'utilisateur <b>'+ user.username+',</b> ' +
        ' nom : <b>'+ user.firstName+'</b>?</p>',
      nzOkText: 'Oui',
      nzOkType    : 'danger',
      nzCancelText: 'Non',
      nzOnOk      : () => this.deleteUserConfirm(user.id),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteUserConfirm(id: number): void {
    this.userService.delete(id).subscribe(
      (data: UserSystem) => {
        //this.getList();
        this.userList.splice(this.userList.findIndex(u=> u.id === data.id), 1);
        this.userList = [...this.userList];
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        //this.notificationTable('danger', 'Echec de la suppression !');
      });
  }

  desactiverDialogue(user: UserSystem): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la désactivation du compte de l\'utilisateur <b>'+ user.username+',</b> ' +
        ' nom : <b>'+ user.firstName+'</b>?</p>',
      nzOkText: 'Oui',
      nzOkType    : 'danger',
      nzCancelText: 'Non',
      nzOnOk      : () => this.desactiver(user.id),
      nzOnCancel: () => console.log('cancel')
    });
  }

  desactiver(id: number): void {
    this.userService.desactiver(id).subscribe(
      (data: UserSystem) => {
        //this.getList();
        this.userList.splice(this.userList.findIndex(u=> u.id === data.id), 1);
        this.userList.unshift(data);
        this.userList = [...this.userList];
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        //this.notificationTable('danger', 'Echec de la suppression !');
      });
  }

  activerDialogue(user: UserSystem): void {
    this.modalService.success({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous l\'activation du compte de l\'utilisateur <b>'+ user.username+',</b> ' +
        ' nom : <b>'+ user.firstName+'</b>?</p>',
      nzOkText: 'Oui',
      nzOkType    : 'success',
      nzCancelText: 'Non',
      nzOnOk      : () => this.activer(user.id),
      nzOnCancel: () => console.log('cancel')
    });
  }

  activer(id: number): void {
    this.userService.activer(id).subscribe(
      (data: UserSystem) => {
        //this.getList();
        this.userList.splice(this.userList.findIndex(u=> u.id === data.id), 1);
        this.userList.unshift(data);
        this.userList = [...this.userList];
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        //this.notificationTable('danger', 'Echec de la suppression !');
      });
  }

}
