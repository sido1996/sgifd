import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PilierPAG} from "../../../../models/PilierPAG";
import {Router} from "@angular/router";
import {User} from "../../../../models/User";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";
import {PiliersPagService} from "../../../../services/piliers-pag.service";

declare var $: any;

@Component({
  selector: 'app-pilier-pag',
  templateUrl: './pilier-pag.component.html',
  styleUrls: ['./pilier-pag.component.css']
})
export class PilierPagComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  pilierpag: PilierPAG = null;
  pilierpagList: Array<PilierPAG> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private pilierpagService: PiliersPagService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.pilierpagList = [];
    this.pilierpag = null;
    this.getList();
  }

  makeForm(pilierpag: PilierPAG): void {
    this.validateForm = this.fb.group({
      code: [(pilierpag != null) ? pilierpag.code : null,
        [Validators.required]],
      libelle: [(pilierpag != null) ? pilierpag.libelle : null,
        [Validators.required]],
    });
    this.pilierpag = pilierpag;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      if (this.pilierpag == null) {
        this.pilierpag = new PilierPAG(null, formData.libelle, this.user.username, null, formData.code);
      } else {
        this.pilierpag.code = formData.code;
        this.pilierpag.libelle = formData.libelle;
        this.pilierpag.createBy = this.user.username;
      }
      console.log(this.pilierpag);
      if (this.checkDoublonElement(this.pilierpag) === false) {

        this.pilierpagService.save(this.pilierpag).subscribe(
          (data: PilierPAG) => {
            const i = this.indexOfElement(data.id);
            this.pilierpagList.splice(i, i > -1 ? 1 : 0);
            this.pilierpagList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.pilierpag = null;
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
    this.pilierpag = null;
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

  openModification(pilierpag: PilierPAG) {
    this.makeForm(pilierpag);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(pilierpag: PilierPAG) {
    this.pilierpag = pilierpag;
    console.log('suppression');
  }

  get f() {
    return this.validateForm.controls;
  }

  deleteElement() {
    this.pilierpag.deleteBy = this.user.username;
    this.pilierpagService.delete(this.pilierpag).subscribe(
      (data: PilierPAG) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.pilierpag = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.pilierpagList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.pilierpagService.list().subscribe(
      (data: Array<PilierPAG>) => {
        this.pilierpagList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(pilierpag: PilierPAG): void {
    this.pilierpag = pilierpag;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>' + pilierpag.libelle + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteElement(),
      nzCancelText: 'Non',
      nzOnCancel: () => this.cancelForm()
    });
  }

  indexOfElement(id: number): number {
    let index = -1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.pilierpagList.length && rep === false) {
      if (this.pilierpagList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(pilierpag: PilierPAG): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.pilierpagList.length && rep === false) {
      if (this.pilierpagList[i].libelle === pilierpag.libelle && this.pilierpagList[i].id != pilierpag.id) {
        rep = true;
      }
      i++;
    }
    return rep;
  }

}
