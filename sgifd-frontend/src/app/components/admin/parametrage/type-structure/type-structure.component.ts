import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TypeStructureService} from "../../../../services/type-structure.service";
import {Secteur} from "../../../../models/Secteur";
import {TypeStructure} from "../../../../models/TypeStructure";
import {Pays} from "../../../../models/Pays";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../../models/User";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {TypeCooperation} from "../../../../models/TypeCooperation";
import {DocumentProgrammatique} from "../../../../models/document-programmatique";
import {DocumentProgrammatiqueService} from "../../../../services/document-programmatique.service";
import {TypeCooperationService} from "../../../../services/type-cooperation.service";

declare var $ :any;

@Component({
  selector: 'app-type-structure',
  templateUrl: './type-structure.component.html',
  styleUrls: ['./type-structure.component.css']
})
export class TypeStructureComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  typestructure: TypeStructure = null;
  typestructureList: Array<TypeStructure> = [];

  typecooperationList: Array<TypeCooperation> = [];
  documentProgrammatiqueList: Array<DocumentProgrammatique> = [];

  user: User = null;
  filter: any;

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private typestructureService: TypeStructureService,
              private documentProgrammatiqueService: DocumentProgrammatiqueService,
              private typecooperationService: TypeCooperationService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getListParam();
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.typestructure = null;
    this.typestructureList = [];
    this.getList();
  }


  getListParam(): void {
    this.documentProgrammatiqueService.list().subscribe(
      (data: Array<DocumentProgrammatique>) => {
        this.documentProgrammatiqueList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
    this.typecooperationService.list().subscribe(
      (data: Array<TypeCooperation>) => {
        this.typecooperationList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  makeForm(typestructure: TypeStructure): void {
    this.validateForm = this.fb.group({
      id: [(typestructure != null) ? typestructure.id : null],
      libelle: [(typestructure != null) ? typestructure.libelle : null,
        [Validators.required]],
      typeCooperationList: [(typestructure != null) ? typestructure.typeCooperationList : null,
        [Validators.required]],
      documentProgrammatiqueList: [(typestructure != null) ? typestructure.documentProgrammatiqueList : null,
        [Validators.required]],
    });
    this.typestructure = typestructure;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
        this.typestructure = formData;
      this.typestructure.createBy = this.user.username;
      console.log(this.typestructure);
      if (this.checkDoublonElement(this.typestructure) === false) {

        this.typestructureService.save(this.typestructure).subscribe(
          (data: TypeStructure) => {
            if(this.typestructure.id != null) {
              this.typestructureList.splice(this.indexOfElement(data.id), 1);
            }
            this.typestructureList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.typestructure = null;
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
    this.typestructure = null;
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

  openModification(typestructure: TypeStructure) {
    this.makeForm(typestructure);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(typestructure: TypeStructure) {
    this.typestructure = typestructure;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.typestructure.deleteBy = this.user.username;
    this.typestructureService.delete(this.typestructure).subscribe(
      (data: TypeStructure) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.typestructure = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.typestructureList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.typestructureService.list().subscribe(
      (data: Array<TypeStructure>) => {
        this.typestructureList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(typestructure: TypeStructure): void {
    this.typestructure = typestructure;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ typestructure.libelle+'</b> ?</p>',
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
    while (i < this.typestructureList.length && rep === false) {
      if (this.typestructureList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(typestructure: TypeStructure): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.typestructureList.length && rep === false) {
      if (this.typestructureList[i].libelle === typestructure.libelle && this.typestructureList[i].id != typestructure.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
