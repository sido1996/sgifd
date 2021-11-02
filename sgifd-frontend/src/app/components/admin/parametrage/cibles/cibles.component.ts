import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cible} from "../../../../models/Cible";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {CategoriePtfService} from "../../../../services/categorie-ptf.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CibleService} from "../../../../services/cible.service";
import {FindValues} from "../../../../payload/FindValues";
import {DomainePTF} from "../../../../models/DomainePTF";
import {ObjectifODD} from "../../../../models/ObjectifODD";
import {ObjectifOddService} from "../../../../services/objectif-odd.service";

@Component({
  selector: 'app-cibles',
  templateUrl: './cibles.component.html',
  styleUrls: ['./cibles.component.css']
})
export class CiblesComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  cible: Cible;
  cibleList: Array<Cible> = [];
  objectifoddList: Array<ObjectifODD> = [];
  private findValues: FindValues = new FindValues();

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private objectifoddService: ObjectifOddService,
              private tokenStorage: TokenStorage,
              private cibleService: CibleService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.cible = null;
    this.cibleList = [];
    this.getList();
    this.getListODD();
  }

  makeForm(cible: Cible): void {
    this.validateForm = this.fb.group({
      code: [(cible != null) ? cible.code : null,
        [Validators.required]],
      libelle: [(cible != null) ? cible.libelle : null,
        [Validators.required]],
      odd: [(cible != null && cible.odd != null) ? cible.odd.id : null,
        [Validators.required]],
    });
    this.cible = cible;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      if(this.cible == null) {
        this.cible = new Cible(null, formData.libelle, this.user.username, null,
          this.findValues.getObjectInList(formData.odd, this.objectifoddList), formData.code);
      } else {
        this.cible.code = formData.code;
        this.cible.libelle = formData.libelle;
        this.cible.odd =  this.findValues.getObjectInList(formData.odd, this.objectifoddList);
        this.cible.createBy = this.user.username;
      }
      console.log(this.cible);
      if (this.checkDoublonElement(this.cible) === false) {

        this.cibleService.save(this.cible).subscribe(
          (data: Cible) => {
            const i = this.indexOfElement(data.id);
            this.cibleList.splice(i, i > -1 ? 1 : 0);
            this.cibleList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.cible = null;
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
    this.cible = null;
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

  openModification(cible: Cible) {
    this.makeForm(cible);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(cible: Cible) {
    this.cible = cible;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.cible.deleteBy = this.user.username;
    this.cibleService.delete(this.cible).subscribe(
      (data: Cible) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.cible = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.cibleList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.cibleService.list().subscribe(
      (data: Array<Cible>) => {
        this.cibleList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(cible: Cible): void {
    this.cible = cible;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ cible.libelle+'</b> ?</p>',
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
    while (i < this.cibleList.length && rep === false) {
      if (this.cibleList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(cible: Cible): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.cibleList.length && rep === false) {
      if (this.cibleList[i].libelle === cible.libelle && this.cibleList[i].id != cible.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

  getListODD(): void {
    this.objectifoddService.list().subscribe(
      (data: Array<ObjectifODD>) => {
        this.objectifoddList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }
}
