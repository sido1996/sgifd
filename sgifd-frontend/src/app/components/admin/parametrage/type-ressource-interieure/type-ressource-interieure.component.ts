import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeRessourceInterieure} from "../../../../models/TypeRessourceInterieure";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";
import {TypeRessourceInterieureService} from "../../../../services/type-ressource-interieure.service";

@Component({
  selector: 'app-type-ressource-interieure',
  templateUrl: './type-ressource-interieure.component.html',
  styleUrls: ['./type-ressource-interieure.component.css']
})
export class TypeRessourceInterieureComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  typeressourceinterieure: TypeRessourceInterieure;
  typeressourceinterieureList: Array<TypeRessourceInterieure> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private typeressourceinterieureService: TypeRessourceInterieureService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.typeressourceinterieure = null;
    this.typeressourceinterieureList = [];
    this.getList();
  }

  makeForm(typeressourceinterieure: TypeRessourceInterieure): void {
    this.validateForm = this.fb.group({
      libelle: [(typeressourceinterieure != null) ? typeressourceinterieure.libelle : null,
        [Validators.required]],
    });
    this.typeressourceinterieure = typeressourceinterieure;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.typeressourceinterieure == null) ?
        this.typeressourceinterieure = new TypeRessourceInterieure(null, formData.libelle, this.user.username, null):
        this.typeressourceinterieure.libelle = formData.libelle;
      this.typeressourceinterieure.createBy = this.user.username;
      console.log(this.typeressourceinterieure);
      if (this.checkDoublonElement(this.typeressourceinterieure) === false) {

        this.typeressourceinterieureService.save(this.typeressourceinterieure).subscribe(
          (data: TypeRessourceInterieure) => {
            if(this.typeressourceinterieure.id != null) {
              this.typeressourceinterieureList.splice(this.indexOfElement(data.id), 1);
            }
            this.typeressourceinterieureList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.typeressourceinterieure = null;
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
    this.typeressourceinterieure = null;
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

  openModification(typeressourceinterieure: TypeRessourceInterieure) {
    this.makeForm(typeressourceinterieure);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(typeressourceinterieure: TypeRessourceInterieure) {
    this.typeressourceinterieure = typeressourceinterieure;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.typeressourceinterieure.deleteBy = this.user.username;
    this.typeressourceinterieureService.delete(this.typeressourceinterieure).subscribe(
      (data: TypeRessourceInterieure) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.typeressourceinterieure = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.typeressourceinterieureList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.typeressourceinterieureService.list().subscribe(
      (data: Array<TypeRessourceInterieure>) => {
        this.typeressourceinterieureList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  error(typeressourceinterieure: TypeRessourceInterieure): void {
    this.typeressourceinterieure = typeressourceinterieure;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ typeressourceinterieure.libelle+'</b> ?</p>',
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
    while (i < this.typeressourceinterieureList.length && rep === false) {
      if (this.typeressourceinterieureList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(typeressourceinterieure: TypeRessourceInterieure): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.typeressourceinterieureList.length && rep === false) {
      if (this.typeressourceinterieureList[i].libelle === typeressourceinterieure.libelle && this.typeressourceinterieureList[i].id != typeressourceinterieure.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }


}
