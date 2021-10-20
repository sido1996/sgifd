import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NiveauMaturite} from "../../../../models/NiveauMaturite";
import {Router} from "@angular/router";
import {NiveauMaturiteService} from "../../../../services/niveau-maturite.service";
import {TypeAssistance} from "../../../../models/TypeAssistance";
import {User} from "../../../../models/User";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {Pays} from "../../../../models/Pays";
import {HttpErrorResponse} from "@angular/common/http";

declare var $ :any;

@Component({
  selector: 'app-niveau-maturite-projet',
  templateUrl: './niveau-maturite-projet.component.html',
  styleUrls: ['./niveau-maturite-projet.component.css']
})
export class NiveauMaturiteProjetComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  niveaumaturite: NiveauMaturite;
  niveaumaturiteList: Array<NiveauMaturite> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private niveaumaturiteService: NiveauMaturiteService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.niveaumaturite = null;
    this.niveaumaturiteList = [];
    this.getList();
  }

  makeForm(niveaumaturite: NiveauMaturite): void {
    this.validateForm = this.fb.group({
      libelle: [(niveaumaturite != null) ? niveaumaturite.libelle : null,
        [Validators.required]],
    });
    this.niveaumaturite = niveaumaturite;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.niveaumaturite == null) ?
        this.niveaumaturite = new NiveauMaturite(null, formData.libelle, this.user.username, null):
        this.niveaumaturite.libelle = formData.libelle;
      this.niveaumaturite.createBy = this.user.username;
      console.log(this.niveaumaturite);
      if (this.checkDoublonElement(this.niveaumaturite) === false) {

        this.niveaumaturiteService.save(this.niveaumaturite).subscribe(
          (data: NiveauMaturite) => {
            if(this.niveaumaturite.id != null) {
              this.niveaumaturiteList.splice(this.indexOfElement(data.id), 1);
            }
            this.niveaumaturiteList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.niveaumaturite = null;
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
    this.niveaumaturite = null;
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

  openModification(niveaumaturite: NiveauMaturite) {
    this.makeForm(niveaumaturite);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(niveaumaturite: NiveauMaturite) {
    this.niveaumaturite = niveaumaturite;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.niveaumaturite.deleteBy = this.user.username;
    this.niveaumaturiteService.delete(this.niveaumaturite).subscribe(
      (data: NiveauMaturite) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.niveaumaturite = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.niveaumaturiteList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.niveaumaturiteService.list().subscribe(
      (data: Array<NiveauMaturite>) => {
        this.niveaumaturiteList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(niveaumaturite: NiveauMaturite): void {
    this.niveaumaturite = niveaumaturite;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ niveaumaturite.libelle+'</b> ?</p>',
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
    while (i < this.niveaumaturiteList.length && rep === false) {
      if (this.niveaumaturiteList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(niveaumaturite: NiveauMaturite): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.niveaumaturiteList.length && rep === false) {
      if (this.niveaumaturiteList[i].libelle === niveaumaturite.libelle && this.niveaumaturiteList[i].id != niveaumaturite.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
