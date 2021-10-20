import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegroupementClubPtf} from "../../../../models/RegroupementClubPtf";
import {Router} from "@angular/router";
import {RegroupementClubPtfService} from "../../../../services/regroupement-club-ptf.service";
import {User} from "../../../../models/User";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";

declare var $ :any;

@Component({
  selector: 'app-regroupement-club',
  templateUrl: './regroupement-club.component.html',
  styleUrls: ['./regroupement-club.component.css']
})
export class RegroupementClubComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  regroupementclubptf: RegroupementClubPtf = null;
  regroupementclubptfList: Array<RegroupementClubPtf> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private regroupementclubpftService: RegroupementClubPtfService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.regroupementclubptf = null;
    this.regroupementclubptfList = [];
    this.getList();
  }

  makeForm(regroupementclubptf: RegroupementClubPtf): void {
    this.validateForm = this.fb.group({
      libelle: [(regroupementclubptf != null) ? regroupementclubptf.libelle : null,
        [Validators.required]],
    });
    this.regroupementclubptf = regroupementclubptf;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.regroupementclubptf == null) ?
        this.regroupementclubptf = new RegroupementClubPtf(null, formData.libelle, this.user.username, null):
        this.regroupementclubptf.libelle = formData.libelle;
      this.regroupementclubptf.createBy = this.user.username;
      console.log(this.regroupementclubptf);
      if (this.checkDoublonElement(this.regroupementclubptf) === false) {

        this.regroupementclubpftService.save(this.regroupementclubptf).subscribe(
          (data: RegroupementClubPtf) => {
            if(this.regroupementclubptf.id != null) {
              this.regroupementclubptfList.splice(this.indexOfElement(data.id), 1);
            }
            this.regroupementclubptfList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.regroupementclubptf = null;
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
    this.regroupementclubptf = null;
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

  openModification(regroupementclubptf: RegroupementClubPtf) {
    this.makeForm(regroupementclubptf);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(regroupementclubptf: RegroupementClubPtf) {
    this.regroupementclubptf = regroupementclubptf;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.regroupementclubptf.deleteBy = this.user.username;
    this.regroupementclubpftService.delete(this.regroupementclubptf).subscribe(
      (data: RegroupementClubPtf) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.regroupementclubptf = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.regroupementclubptfList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.regroupementclubpftService.list().subscribe(
      (data: Array<RegroupementClubPtf>) => {
        this.regroupementclubptfList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(regroupementclubptf: RegroupementClubPtf): void {
    this.regroupementclubptf = regroupementclubptf;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ regroupementclubptf.libelle+'</b> ?</p>',
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
    while (i < this.regroupementclubptfList.length && rep === false) {
      if (this.regroupementclubptfList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(regroupementclubptf: RegroupementClubPtf): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.regroupementclubptfList.length && rep === false) {
      if (this.regroupementclubptfList[i].libelle === regroupementclubptf.libelle && this.regroupementclubptfList[i].id != regroupementclubptf.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
