import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Departement} from "../../../../models/Departement";
import {Pays} from "../../../../models/Pays";
import {Router} from "@angular/router";
import {DepartementService} from "../../../../services/departement.service";
import {User} from "../../../../models/User";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzModalService} from "ng-zorro-antd";
import {HttpErrorResponse} from "@angular/common/http";
import {PaysService} from "../../../../services/pays.service";
import {FindValues} from "../../../../payload/FindValues";

declare var $ :any;

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  departement: Departement = null;
  departementList: Array<Departement> = [];

  paysList: Array<Pays> = [];

  filter: any;
  user: User = null;
  private findValues: FindValues = new FindValues();

  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorage,
              private modalService: NzModalService,
              private paysService: PaysService,
              private departementService: DepartementService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.departement = null;
    this.departementList = [];
    this.makeListPays();
    this.getList();
  }

  makeForm(departement: Departement): void {
    this.validateForm = this.fb.group({
      libelle: [(departement != null) ? departement.libelle : null,
        [Validators.required,]],
      pays: [(departement != null) ? departement.pays.id : null,
        [Validators.required,]],
    });
    this.departement = departement;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      if(this.departement == null) {
        this.departement = new Departement(null, formData.libelle, this.user.username , null,
          this.findValues.getObjectInList(formData.pays, this.paysList))
      } else {
        this.departement.libelle = formData.libelle;
        this.departement.pays = this.findValues.getObjectInList(formData.pays, this.paysList);
        this.departement.createBy = this.user.username;
      }
      console.log(this.departement);
      if (this.checkDoublonElement(this.departement) === false) {
        //this.secteurList.unshift(this.secteur);
        this.departementService.save(this.departement).subscribe(
          (data: Departement) => {
            if(this.departement.id != null) {
              this.departementList.splice(this.indexOfElement(data.id), 1);
            }
            this.departementList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.departement = null;
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
        this.notificationForm('danger', 'Doublon d\'enregistrement !');
      }

    } else {
      this.notificationForm('danger', 'Formulaire invalide !');
    }

  }

  cancelForm(): void {
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.submitted = false;
    this.departement = null;
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

  openModification(departement: Departement) {
    //console.log(departement);
    this.makeForm(departement);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(departement: Departement) {
    this.departement = departement;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  makeListPays(): void {
    this.paysService.list().subscribe(
      (data: Array<Pays>) => {
        this.paysList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  deleteElement() {
    this.departement.deleteBy = this.user.username;
    this.departementService.delete(this.departement).subscribe(
      (data: Departement) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.departement = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.departementList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  error(departement: Departement): void {
    this.departement = departement;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ departement.libelle+'('+ departement.pays.libelle+')</b> ?</p>',
      nzOkText    : 'Oui',
      nzOkType    : 'danger',
      nzOnOk      : () => this.deleteElement(),
      nzCancelText: 'Non',
      nzOnCancel  : () => this.cancelForm()
    });
  }

  getList(): void {
    this.departementService.list().subscribe(
      (data: Array<Departement>) => {
        this.departementList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  indexOfElement(id: number): number {
    let index = - 1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.departementList.length && rep === false) {
      if (this.departementList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(departement: Departement): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.departementList.length && rep === false) {
      if (this.departementList[i].pays.id === departement.pays.id && this.departementList[i].libelle === departement.libelle && this.departementList[i].id != departement.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
