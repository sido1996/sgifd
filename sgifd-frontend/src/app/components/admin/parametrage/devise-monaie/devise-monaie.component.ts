import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DeviseMonaie} from "../../../../models/DeviseMonaie";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {CategoriePtfService} from "../../../../services/categorie-ptf.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DeviseMonaieService} from "../../../../services/devise-monaie.service";

@Component({
  selector: 'app-devise-monaie',
  templateUrl: './devise-monaie.component.html',
  styleUrls: ['./devise-monaie.component.css']
})
export class DeviseMonaieComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  devisemonaie: DeviseMonaie;
  devisemonaieList: Array<DeviseMonaie> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private devisemonaieService: DeviseMonaieService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.devisemonaie = null;
    this.devisemonaieList = [];
    this.getList();
  }

  makeForm(devisemonaie: DeviseMonaie): void {
    this.validateForm = this.fb.group({
      libelle: [(devisemonaie != null) ? devisemonaie.libelle : null,
        [Validators.required]],
    });
    this.devisemonaie = devisemonaie;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.devisemonaie == null) ?
        this.devisemonaie = new DeviseMonaie(null, formData.libelle, this.user.username, null):
        this.devisemonaie.libelle = formData.libelle;
      this.devisemonaie.createBy = this.user.username;
      console.log(this.devisemonaie);
      if (this.checkDoublonElement(this.devisemonaie) === false) {

        this.devisemonaieService.save(this.devisemonaie).subscribe(
          (data: DeviseMonaie) => {
            if(this.devisemonaie.id != null) {
              this.devisemonaieList.splice(this.indexOfElement(data.id), 1);
            }
            this.devisemonaieList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.devisemonaie = null;
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
    this.devisemonaie = null;
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

  openModification(devisemonaie: DeviseMonaie) {
    this.makeForm(devisemonaie);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(devisemonaie: DeviseMonaie) {
    this.devisemonaie = devisemonaie;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.devisemonaie.deleteBy = this.user.username;
    this.devisemonaieService.delete(this.devisemonaie).subscribe(
      (data: DeviseMonaie) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.devisemonaie = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.devisemonaieList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.devisemonaieService.list().subscribe(
      (data: Array<DeviseMonaie>) => {
        this.devisemonaieList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(devisemonaie: DeviseMonaie): void {
    this.devisemonaie = devisemonaie;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ devisemonaie.libelle+'</b> ?</p>',
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
    while (i < this.devisemonaieList.length && rep === false) {
      if (this.devisemonaieList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(devisemonaie: DeviseMonaie): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.devisemonaieList.length && rep === false) {
      if (this.devisemonaieList[i].libelle === devisemonaie.libelle && this.devisemonaieList[i].id != devisemonaie.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }


}
