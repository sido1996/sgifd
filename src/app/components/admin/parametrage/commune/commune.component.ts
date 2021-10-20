import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CommuneService} from "../../../../services/commune.service";
import {Commune} from "../../../../models/Commune";
import {User} from "../../../../models/User";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzModalService} from "ng-zorro-antd";
import {HttpErrorResponse} from "@angular/common/http";
import {DepartementService} from "../../../../services/departement.service";
import {Departement} from "../../../../models/Departement";
import {FindValues} from "../../../../payload/FindValues";

declare var $ :any;

@Component({
  selector: 'app-commune',
  templateUrl: './commune.component.html',
  styleUrls: ['./commune.component.css']
})
export class CommuneComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  commune: Commune = null;
  communeList: Array<Commune> = [];
  departementList: Array<Departement> = [];

  filter: any;
  user: User = null;
  private findValues: FindValues = new FindValues();

  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorage,
              private modalService: NzModalService,
              private communeService: CommuneService,
              private departementService: DepartementService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.commune = null;
    this.communeList = [];
    this.makeListDepartement();
    this.getList();
  }
  makeForm(commune: Commune): void {
    this.validateForm = this.fb.group({
      libelle: [(commune != null) ? commune.libelle : null,
        [Validators.required,]],
      departement: [(commune != null) ? commune.departement.id : null,
        [Validators.required,]],
    });
    this.commune = commune;
  }


  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      if(this.commune == null) {
        this.commune = new Commune(null, formData.libelle, this.user.username , null,
          this.findValues.getObjectInList(formData.departement, this.departementList));
      } else {
        this.commune.libelle = formData.libelle;
        this.commune.departement = this.findValues.getObjectInList(formData.departement, this.departementList);
        this.commune.createBy = this.user.username;
      }
      console.log(this.commune);
      if (this.checkDoublonElement(this.commune) === false) {
        //this.departementList.unshift(this.departement);
        this.communeService.save(this.commune).subscribe(
          (data: Commune) => {
            if(this.commune.id != null) {
              this.communeList.splice(this.indexOfElement(data.id), 1);
            }
            this.communeList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.commune = null;
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
    this.commune = null;
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

  openModification(commune: Commune) {
    this.makeForm(commune);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(commune: Commune) {
    this.commune = commune;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  makeListDepartement(): void {
    this.departementService.list().subscribe(
      (data: Array<Departement>) => {
        this.departementList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  deleteElement() {
    this.commune.deleteBy = this.user.username;
    this.communeService.delete(this.commune).subscribe(
      (data: Commune) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.commune = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.communeList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  error(commune: Commune): void {
    this.commune = commune;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ commune.libelle+'('+ commune.departement.libelle+')</b> ?</p>',
      nzOkText    : 'Oui',
      nzOkType    : 'danger',
      nzOnOk      : () => this.deleteElement(),
      nzCancelText: 'Non',
      nzOnCancel  : () => this.cancelForm()
    });
  }

  getList(): void {
    this.communeService.list().subscribe(
      (data: Array<Commune>) => {
        this.communeList = data;
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
    while (i < this.communeList.length && rep === false) {
      if (this.communeList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(commune: Commune): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.communeList.length && rep === false) {
      if (this.communeList[i].departement.id === commune.departement.id && this.communeList[i].libelle === commune.libelle && this.communeList[i].id != commune.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
