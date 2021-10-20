import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DomainePtfService} from "../../../../services/domaine-ptf.service";
import {User} from "../../../../models/User";
import {DomainePTF} from "../../../../models/DomainePTF";
import {Exercice} from "../../../../models/Exercice";
import {NzModalService} from "ng-zorro-antd";
import {HttpErrorResponse} from "@angular/common/http";
import {TokenStorage} from "../../../../utils/token.storage";

declare var $ :any;

@Component({
  selector: 'app-domaine-ptf',
  templateUrl: './domaine-ptf.component.html',
  styleUrls: ['./domaine-ptf.component.css']
})
export class DomainePtfComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  DomainePTF: DomainePTF;
  DomainePTFList: Array<DomainePTF> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private DomainePTFService: DomainePtfService,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.DomainePTF = null;
    this.DomainePTFList = [];
    this.getList();
  }

  makeForm(DomainePTF: DomainePTF): void {
    this.validateForm = this.fb.group({
      libelle: [(DomainePTF != null) ? DomainePTF.libelle : null,
        [Validators.required]],
    });
    this.DomainePTF = DomainePTF;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.DomainePTF == null) ?
        this.DomainePTF = new DomainePTF(null, formData.libelle, this.user.username, null):
        this.DomainePTF.libelle = formData.libelle;
      this.DomainePTF.createBy = this.user.username;
      console.log(this.DomainePTF);
      if (this.checkDoublonElement(this.DomainePTF) === false) {

        this.DomainePTFService.save(this.DomainePTF).subscribe(
          (data: DomainePTF) => {
            if(this.DomainePTF.id != null) {
              this.DomainePTFList.splice(this.indexOfElement(data.id), 1);
            }
            this.DomainePTFList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.DomainePTF = null;
            this.submitted = false;
            this.btnTitle = 'Enregistrer';
            this.validateForm.reset();
          },
          (error: HttpErrorResponse) => {
            //   this.router.navigate(['dashboard']);
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
    this.btnTitle = 'Enregistrer';
    this.DomainePTF = null;
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

  openModification(DomainePTF: DomainePTF) {
    this.makeForm(DomainePTF);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(DomainePTF: DomainePTF) {
    this.DomainePTF = DomainePTF;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.DomainePTF.deleteBy = this.user.username;
    this.DomainePTFService.delete(this.DomainePTF).subscribe(
      (data: DomainePTF) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.DomainePTF = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.DomainePTFList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.DomainePTFService.list().subscribe(
      (data: Array<DomainePTF>) => {
        this.DomainePTFList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(DomainePTF: DomainePTF): void {
    this.DomainePTF = DomainePTF;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ DomainePTF.libelle+'</b> ?</p>',
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
    while (i < this.DomainePTFList.length && rep === false) {
      if (this.DomainePTFList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(DomainePTF: DomainePTF): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.DomainePTFList.length && rep === false) {
      if (this.DomainePTFList[i].libelle === DomainePTF.libelle && this.DomainePTFList[i].id != DomainePTF.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
