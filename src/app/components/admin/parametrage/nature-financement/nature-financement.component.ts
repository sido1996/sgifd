import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NatureFinancement} from "../../../../models/NatureFinancement";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";
import {NatureFinancementService} from "../../../../services/nature-financement.service";

@Component({
  selector: 'app-nature-financement',
  templateUrl: './nature-financement.component.html',
  styleUrls: ['./nature-financement.component.css']
})
export class NatureFinancementComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  naturefinancement: NatureFinancement;
  naturefinancementList: Array<NatureFinancement> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private naturefinancementService: NatureFinancementService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.naturefinancement = null;
    this.naturefinancementList = [];
    this.getList();
  }

  makeForm(naturefinancement: NatureFinancement): void {
    this.validateForm = this.fb.group({
      libelle: [(naturefinancement != null) ? naturefinancement.libelle : null,
        [Validators.required]],
    });
    this.naturefinancement = naturefinancement;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.naturefinancement == null) ?
        this.naturefinancement = new NatureFinancement(null, formData.libelle, this.user.username, null):
        this.naturefinancement.libelle = formData.libelle;
      this.naturefinancement.createBy = this.user.username;
      console.log(this.naturefinancement);
      if (this.checkDoublonElement(this.naturefinancement) === false) {

        this.naturefinancementService.save(this.naturefinancement).subscribe(
          (data: NatureFinancement) => {
            if(this.naturefinancement.id != null) {
              this.naturefinancementList.splice(this.indexOfElement(data.id), 1);
            }
            this.naturefinancementList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.naturefinancement = null;
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
    this.naturefinancement = null;
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

  openModification(naturefinancement: NatureFinancement) {
    this.makeForm(naturefinancement);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(naturefinancement: NatureFinancement) {
    this.naturefinancement = naturefinancement;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.naturefinancement.deleteBy = this.user.username;
    this.naturefinancementService.delete(this.naturefinancement).subscribe(
      (data: NatureFinancement) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.naturefinancement = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.naturefinancementList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.naturefinancementService.list().subscribe(
      (data: Array<NatureFinancement>) => {
        this.naturefinancementList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(naturefinancement: NatureFinancement): void {
    this.naturefinancement = naturefinancement;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ naturefinancement.libelle+'</b> ?</p>',
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
    while (i < this.naturefinancementList.length && rep === false) {
      if (this.naturefinancementList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(naturefinancement: NatureFinancement): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.naturefinancementList.length && rep === false) {
      if (this.naturefinancementList[i].libelle === naturefinancement.libelle && this.naturefinancementList[i].id != naturefinancement.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }


}
