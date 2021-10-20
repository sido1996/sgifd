import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TypeAssistantService} from "../../../../services/type-assistant.service";
import {TypeAssistance} from "../../../../models/TypeAssistance";
import {User} from "../../../../models/User";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";

declare var $ :any;

@Component({
  selector: 'app-type-assistance',
  templateUrl: './type-assistance.component.html',
  styleUrls: ['./type-assistance.component.css']
})
export class TypeAssistanceComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  typeassistance: TypeAssistance;
  typeassistanceList: Array<TypeAssistance> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private typeassistanceService: TypeAssistantService) { }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.typeassistance = null;
    this.typeassistanceList = [];
    this.getList();
  }

  makeForm(typeassistance: TypeAssistance): void {
    this.validateForm = this.fb.group({
      libelle: [(typeassistance!= null) ? typeassistance.libelle : null,
        [Validators.required]],
        isAppui:[(typeassistance != null) ? typeassistance.isAppui : false]
    });
    this.typeassistance = typeassistance;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.typeassistance == null) ?
        this.typeassistance = new TypeAssistance(null, formData.libelle, formData.isAppui, this.user.username, null):
        this.typeassistance.libelle = formData.libelle;
      this.typeassistance.createBy = this.user.username;
      this.typeassistance.isAppui = formData.isAppui;
      console.log(this.typeassistance);
      if (this.checkDoublonElement(this.typeassistance) === false) {

        this.typeassistanceService.save(this.typeassistance).subscribe(
          (data: TypeAssistance) => {
            if(this.typeassistance.id != null) {
              this.typeassistanceList.splice(this.indexOfElement(data.id), 1);
            }
            this.typeassistanceList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.typeassistance = null;
            this.submitted = false;
            this.btnTitle = 'Enregistrer';
            this.validateForm.reset();
          },
          (error: HttpErrorResponse) => {
            this.notificationForm('danger', 'Echec de l\'enregistrement !');
          });
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
    this.typeassistance = null;
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

  openModification(typeassistance: TypeAssistance) {
    this.makeForm(typeassistance);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(typeassistance: TypeAssistance) {
    this.typeassistance = typeassistance;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.typeassistance.deleteBy = this.user.username;
    this.typeassistanceService.delete(this.typeassistance).subscribe(
      (data: TypeAssistance) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.typeassistance = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.typeassistanceList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.typeassistanceService.list().subscribe(
      (data: Array<TypeAssistance>) => {
        this.typeassistanceList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(typeassistance: TypeAssistance): void {
    this.typeassistance = typeassistance;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ typeassistance.libelle+'</b> ?</p>',
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
    while (i < this.typeassistanceList.length && rep === false) {
      if (this.typeassistanceList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(typeassistance: TypeAssistance): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.typeassistanceList.length && rep === false) {
      if (this.typeassistanceList[i].libelle === typeassistance.libelle && this.typeassistanceList[i].id != typeassistance.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
