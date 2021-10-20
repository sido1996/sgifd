import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomaineActivite} from "../../../../models/DomaineActivite";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {DomaineActiviteService} from "../../../../services/domaine-activite.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-domaine-activite',
  templateUrl: './domaine-activite.component.html',
  styleUrls: ['./domaine-activite.component.css']
})
export class DomaineActiviteComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  domaineactivite: DomaineActivite;
  domaineactiviteList: Array<DomaineActivite> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private domaineactiviteService: DomaineActiviteService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.domaineactivite = null;
    this.domaineactiviteList = [];
    this.getList();
  }

  makeForm(domaineactivite: DomaineActivite): void {
    this.validateForm = this.fb.group({
      libelle: [(domaineactivite != null) ? domaineactivite.libelle : null,
        [Validators.required]],
    });
    this.domaineactivite = domaineactivite;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.domaineactivite == null) ?
        this.domaineactivite = new DomaineActivite(null, formData.libelle, this.user.username, null):
        this.domaineactivite.libelle = formData.libelle;
      this.domaineactivite.createBy = this.user.username;
      console.log(this.domaineactivite);
      if (this.checkDoublonElement(this.domaineactivite) === false) {

        this.domaineactiviteService.save(this.domaineactivite).subscribe(
          (data: DomaineActivite) => {
            if(this.domaineactivite.id != null) {
              this.domaineactiviteList.splice(this.indexOfElement(data.id), 1);
            }
            this.domaineactiviteList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.domaineactivite = null;
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
    this.domaineactivite = null;
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

  openModification(domaineactivite: DomaineActivite) {
    this.makeForm(domaineactivite);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(domaineactivite: DomaineActivite) {
    this.domaineactivite = domaineactivite;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.domaineactivite.deleteBy = this.user.username;
    this.domaineactiviteService.delete(this.domaineactivite).subscribe(
      (data: DomaineActivite) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.domaineactivite = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.domaineactiviteList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.domaineactiviteService.list().subscribe(
      (data: Array<DomaineActivite>) => {
        this.domaineactiviteList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(domaineactivite: DomaineActivite): void {
    this.domaineactivite = domaineactivite;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ domaineactivite.libelle+'</b> ?</p>',
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
    while (i < this.domaineactiviteList.length && rep === false) {
      if (this.domaineactiviteList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(domaineactivite: DomaineActivite): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.domaineactiviteList.length && rep === false) {
      if (this.domaineactiviteList[i].libelle === domaineactivite.libelle && this.domaineactiviteList[i].id != domaineactivite.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
