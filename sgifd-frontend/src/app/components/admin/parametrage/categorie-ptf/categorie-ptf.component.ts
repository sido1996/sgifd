import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriePTF} from "../../../../models/CategoriePTF";
import {Router} from "@angular/router";
import {CategoriePtfService} from "../../../../services/categorie-ptf.service";
import {User} from "../../../../models/User";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";

declare var $ :any;

@Component({
  selector: 'app-categorie-ptf',
  templateUrl: './categorie-ptf.component.html',
  styleUrls: ['./categorie-ptf.component.css']
})
export class CategoriePtfComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  categorieptf: CategoriePTF;
  categorieptfList: Array<CategoriePTF> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private categorieptfService: CategoriePtfService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.categorieptf = null;
    this.categorieptfList = [];
    this.getList();
  }

  makeForm(categorieptf: CategoriePTF): void {
    this.validateForm = this.fb.group({
      libelle: [(categorieptf != null) ? categorieptf.libelle : null,
        [Validators.required]],
    });
    this.categorieptf = categorieptf;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.categorieptf == null) ?
        this.categorieptf = new CategoriePTF(null, formData.libelle, this.user.username, null):
        this.categorieptf.libelle = formData.libelle;
      this.categorieptf.createBy = this.user.username;
      console.log(this.categorieptf);
      if (this.checkDoublonElement(this.categorieptf) === false) {

        this.categorieptfService.save(this.categorieptf).subscribe(
          (data: CategoriePTF) => {
            if(this.categorieptf.id != null) {
              this.categorieptfList.splice(this.indexOfElement(data.id), 1);
            }
            this.categorieptfList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.categorieptf = null;
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
    this.categorieptf = null;
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

  openModification(categorieptf: CategoriePTF) {
    this.makeForm(categorieptf);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(categorieptf: CategoriePTF) {
    this.categorieptf = categorieptf;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.categorieptf.deleteBy = this.user.username;
    this.categorieptfService.delete(this.categorieptf).subscribe(
      (data: CategoriePTF) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.categorieptf = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.categorieptfList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.categorieptfService.list().subscribe(
      (data: Array<CategoriePTF>) => {
        this.categorieptfList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(categorieptf: CategoriePTF): void {
    this.categorieptf = categorieptf;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ categorieptf.libelle+'</b> ?</p>',
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
    while (i < this.categorieptfList.length && rep === false) {
      if (this.categorieptfList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(categorieptf: CategoriePTF): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.categorieptfList.length && rep === false) {
      if (this.categorieptfList[i].libelle === categorieptf.libelle && this.categorieptfList[i].id != categorieptf.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
