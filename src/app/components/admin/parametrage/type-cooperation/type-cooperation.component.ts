import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeCooperation} from "../../../../models/TypeCooperation";
import {Router} from "@angular/router";
import {TypeCooperationService} from "../../../../services/type-cooperation.service";
import {User} from "../../../../models/User";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";

declare var $ :any;

@Component({
  selector: 'app-type-cooperation',
  templateUrl: './type-cooperation.component.html',
  styleUrls: ['./type-cooperation.component.css']
})
export class TypeCooperationComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  typecooperation: TypeCooperation = null;
  typecooperationList: Array<TypeCooperation> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private typecooperationService: TypeCooperationService) { }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.typecooperation = null;
    this.typecooperationList = [];
    this.getList();
  }

  makeForm(typecooperation: TypeCooperation): void {
    this.validateForm = this.fb.group({
      id: [(typecooperation != null) ? typecooperation.id : null],
      libelle: [(typecooperation != null) ? typecooperation.libelle : null,
        [Validators.required]],
      estCommunale: [(typecooperation != null) ? typecooperation.estCommunale : false],
    });
    this.typecooperation = typecooperation;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      //(this.typecooperation == null) ?
        //this.typecooperation = new TypeCooperation(null, formData.libelle, this.user.username, null):
        this.typecooperation = formData;
      this.typecooperation.createBy = this.user.username;
      console.log(this.typecooperation);
      if (this.checkDoublonElement(this.typecooperation) === false) {

        this.typecooperationService.save(this.typecooperation).subscribe(
          (data: TypeCooperation) => {
            if(this.typecooperation.id != null) {
              this.typecooperationList.splice(this.indexOfElement(data.id), 1);
            }
            this.typecooperationList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.typecooperation = null;
            this.submitted = false;
            this.btnTitle = 'Enregistrer';
            this.validateForm.reset();
          },
          (error: HttpErrorResponse) => {
            this.notificationForm('danger', 'Echec de l\'enregistrement !');
          }
        );
      } else {
        this.notificationForm('danger', ' Doublon d\'enregistrement !');
      }
    } else {
      this.notificationForm('danger', 'Formulaire invalide !');
    }
  }

  cancelForm(): void {
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.submitted = false;
    this.typecooperation = null;
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

  openModification(typecooperation: TypeCooperation) {
    this.makeForm(typecooperation);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(typecooperation: TypeCooperation) {
    this.typecooperation = typecooperation;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.typecooperation.deleteBy = this.user.username;
    this.typecooperationService.delete(this.typecooperation).subscribe(
      (data: TypeCooperation) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.typecooperation = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.typecooperationList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.typecooperationService.list().subscribe(
      (data: Array<TypeCooperation>) => {
        this.typecooperationList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(typecooperation: TypeCooperation): void {
    this.typecooperation = typecooperation;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ typecooperation.libelle+'</b> ?</p>',
      nzOkText    : 'Oui',
      nzOkType    : 'danger',
      nzOnOk      : () => this.deleteElement(),
      nzCancelText: 'Non',
      nzOnCancel  : () => this.cancelForm()
    });
  }

  indexOfElement(id: number): number {
    let index = - 1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.typecooperationList.length && rep === false) {
      if (this.typecooperationList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(typecooperation: TypeCooperation): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.typecooperationList.length && rep === false) {
      if (this.typecooperationList[i].libelle === typecooperation.libelle && this.typecooperationList[i].id != typecooperation.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
