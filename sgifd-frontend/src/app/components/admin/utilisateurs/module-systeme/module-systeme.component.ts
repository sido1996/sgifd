import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModuleUser} from "../../../../models/ModuleUser";
import {User} from "../../../../models/User";
import {FindValues} from "../../../../payload/FindValues";
import {Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzModalService} from "ng-zorro-antd";
import {HttpErrorResponse} from "@angular/common/http";
import {FonctionnaliteUser} from "../../../../models/FonctionnaliteUser";
import {FonctionnaliteUserService} from "../../../../services/fonctionnalite-user.service";
import {ModuleUserService} from "../../../../services/module-user.service";

@Component({
  selector: 'app-module-systeme',
  templateUrl: './module-systeme.component.html',
  styleUrls: ['./module-systeme.component.css']
})
export class ModuleSystemeComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  moduleUser: ModuleUser = null;
  moduleUserList: Array<ModuleUser> = [];

  fonctionnaliteUserList: Array<FonctionnaliteUser> = [];

  filter: any;
  user: User = null;
  private findValues: FindValues = new FindValues();

  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorage,
              private modalService: NzModalService,
              private fonctionnaliteUserService: FonctionnaliteUserService,
              private moduleUserService: ModuleUserService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {

    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.moduleUser = null;
    this.makeListFonctionnaliteUser();
    this.getList();
  }

  makeForm(moduleUser: ModuleUser): void {
    this.validateForm = this.fb.group({
      name: [(moduleUser != null) ? moduleUser.name : null,
        [Validators.required,]],
      fonctionnaliteUsers: [(moduleUser != null) ? this.findValues.getArrayId(moduleUser.fonctionnaliteUsers) : null,
        [Validators.required,]],
    });
    this.moduleUser = moduleUser;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;

      if(this.moduleUser != null) {

        this.moduleUser.name = formData.name;
        this.moduleUser.fonctionnaliteUsers = this.getObjectListInList(formData.fonctionnaliteUsers,
          this.fonctionnaliteUserList);

        this.moduleUserService.save(this.moduleUser).subscribe(
          (data: ModuleUser) => {
            const i = this.indexOfElement(data.id);
              this.moduleUserList.splice(i, i > -1? 1 : 0);
            this.moduleUserList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.moduleUser = null;
            this.submitted = false;
            this.btnTitle = 'Enregistrer';
            this.validateForm.reset();
          },
          (error: HttpErrorResponse) => {
            //   this.router.navigate(['dashboard']);
            this.notificationForm('danger', 'Echec de l\'enregistrement !');
          }
        );
      } else {
        this.notificationForm('danger', 'Veuillez sélectionner le module dans la table !');
      }
    }
  }

  cancelForm(): void {
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.submitted = false;
    this.moduleUser = null;
    this.btnTitle = 'Enregistrer';
    this.validateForm.reset();
  }

  notificationForm(type: string, msg: string) {
    this.typeNotificationForm = type;
    this.messageNotificationForm = msg;
    this.isNotificationForm = true;
  }

  notificationTable(type: string, msg: string) {
    this.typeNotificationTable = type;
    this.messageNotificationTable = msg;
    this.isNotificationTable = true;
  }

  closeNotificationForm() {
    this.isNotificationForm = false;
  }

  closeNotificationTable() {
    this.isNotificationTable = false;
  }

  openModification(moduleUser: ModuleUser) {
    //console.log(moduleUser);
    this.makeForm(moduleUser);
    this.btnTitle = 'Modifier';
  }

  get f() { return this.validateForm.controls; }

  makeListFonctionnaliteUser(): void {
    this.fonctionnaliteUserService.list().subscribe(
      (data: Array<FonctionnaliteUser>) => {
        this.fonctionnaliteUserList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getList(): void {
    this.moduleUserService.list().subscribe(
      (data: Array<ModuleUser>) => {
        this.moduleUserList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  indexOfElement(id: number): number {
    let index = - 1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.moduleUserList.length && rep === false) {
      if (this.moduleUserList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  getObjectListInList(ids: Array<number>, objects: Array<FonctionnaliteUser>): Array<any> {
    let rep: boolean = false;
    let i = 0;
    let result: Array<FonctionnaliteUser> = [];
    for(let j=0 ; j< ids.length; j++) {
      //console.log('trouvé ===>'+ids[j]);
      result.push(this.findValues.getObjectInList(ids[j], objects));
    }
    return result;
  }

}
