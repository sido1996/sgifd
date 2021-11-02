import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NatureAssistance} from "../../../../models/NatureAssistance";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";
import {NatureAssistanceService} from "../../../../services/nature-assistance.service";

@Component({
  selector: 'app-nature-assistance',
  templateUrl: './nature-assistance.component.html',
  styleUrls: ['./nature-assistance.component.css']
})
export class NatureAssistanceComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  natureassistance: NatureAssistance;
  natureassistanceList: Array<NatureAssistance> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private natureassistanceService: NatureAssistanceService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.natureassistance = null;
    this.natureassistanceList = [];
    this.getList();
  }

  makeForm(natureassistance: NatureAssistance): void {
    this.validateForm = this.fb.group({
      libelle: [(natureassistance != null) ? natureassistance.libelle : null,
        [Validators.required]],
      isAppui:[(natureassistance != null) ? natureassistance.isAppui : false]
    });
    this.natureassistance = natureassistance;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.natureassistance == null) ?
        this.natureassistance = new NatureAssistance(null, formData.libelle, formData.isAppui, this.user.username, null):
        this.natureassistance.libelle = formData.libelle;
      this.natureassistance.createBy = this.user.username;
      this.natureassistance.isAppui = formData.isAppui;
      console.log(this.natureassistance);
      if (this.checkDoublonElement(this.natureassistance) === false) {

        this.natureassistanceService.save(this.natureassistance).subscribe(
          (data: NatureAssistance) => {
            if(this.natureassistance.id != null) {
              this.natureassistanceList.splice(this.indexOfElement(data.id), 1);
            }
            this.natureassistanceList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.natureassistance = null;
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
    this.natureassistance = null;
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

  openModification(natureassistance: NatureAssistance) {
    this.makeForm(natureassistance);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(natureassistance: NatureAssistance) {
    this.natureassistance = natureassistance;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.natureassistance.deleteBy = this.user.username;
    this.natureassistanceService.delete(this.natureassistance).subscribe(
      (data: NatureAssistance) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.natureassistance = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.natureassistanceList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.natureassistanceService.list().subscribe(
      (data: Array<NatureAssistance>) => {
        this.natureassistanceList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  error(natureassistance: NatureAssistance): void {
    this.natureassistance = natureassistance;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ natureassistance.libelle+'</b> ?</p>',
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
    while (i < this.natureassistanceList.length && rep === false) {
      if (this.natureassistanceList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(natureassistance: NatureAssistance): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.natureassistanceList.length && rep === false) {
      if (this.natureassistanceList[i].libelle === natureassistance.libelle && this.natureassistanceList[i].id != natureassistance.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
