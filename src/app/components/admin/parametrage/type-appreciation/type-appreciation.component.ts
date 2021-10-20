import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeAppreciation} from "../../../../models/TypeAppreciation";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";
import {TypeAppreciationService} from "../../../../services/type-appreciation.service";

@Component({
  selector: 'app-type-appreciation',
  templateUrl: './type-appreciation.component.html',
  styleUrls: ['./type-appreciation.component.css']
})
export class TypeAppreciationComponent implements OnInit {


  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  typeappreciation: TypeAppreciation = null;
  typeappreciationList: Array<TypeAppreciation> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private typeappreciationService: TypeAppreciationService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.typeappreciation = null;
    this.getList();
  }

  makeForm(typeappreciation: TypeAppreciation): void {
    this.validateForm = this.fb.group({
      libelle: [(typeappreciation != null) ? typeappreciation.libelle : null,
        [Validators.required]],
    });
    this.typeappreciation = typeappreciation;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.typeappreciation == null) ?
        this.typeappreciation = new TypeAppreciation(null, formData.libelle, this.user.username, null):
        this.typeappreciation.libelle = formData.libelle;
      this.typeappreciation.createBy = this.user.username;
      console.log(this.typeappreciation);
      if (this.checkDoublonElement(this.typeappreciation) === false) {

        this.typeappreciationService.save(this.typeappreciation).subscribe(
          (data: TypeAppreciation) => {
            if(this.typeappreciation.id != null) {
              this.typeappreciationList.splice(this.indexOfElement(data.id), 1);
            }
            this.typeappreciationList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.typeappreciation = null;
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
    this.typeappreciation = null;
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

  openModification(typeappreciation: TypeAppreciation) {
    this.makeForm(typeappreciation);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(typeappreciation: TypeAppreciation) {
    this.typeappreciation = typeappreciation;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.typeappreciation.deleteBy = this.user.username;
    this.typeappreciationService.delete(this.typeappreciation).subscribe(
      (data: TypeAppreciation) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.typeappreciation = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.typeappreciationList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.typeappreciationService.list().subscribe(
      (data: Array<TypeAppreciation>) => {
        this.typeappreciationList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(typeappreciation: TypeAppreciation): void {
    this.typeappreciation = typeappreciation;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ typeappreciation.libelle+'</b> ?</p>',
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
    while (i < this.typeappreciationList.length && rep === false) {
      if (this.typeappreciationList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(typeappreciation: TypeAppreciation): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.typeappreciationList.length && rep === false) {
      if (this.typeappreciationList[i].libelle === typeappreciation.libelle && this.typeappreciationList[i].id != typeappreciation.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }


}
