import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";
import {NatureAideAlimentaire} from "../../../../models/nature-aide-alimentaire";
import {NatureAideAlimentaireService} from "../../../../services/nature-aide-alimentaire.service";

@Component({
  selector: 'app-nature-aide-alimentaire',
  templateUrl: './nature-aide-alimentaire.component.html',
  styleUrls: ['./nature-aide-alimentaire.component.css']
})
export class NatureAideAlimentaireComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  natureAideAlimentaire: NatureAideAlimentaire = null;
  natureAideAlimentaireList: Array<NatureAideAlimentaire> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private natureAideAlimentaireService: NatureAideAlimentaireService) { }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.natureAideAlimentaire = null;
    this.natureAideAlimentaireList = [];
    this.getList();
  }

  makeForm(natureAideAlimentaire: NatureAideAlimentaire): void {
    this.validateForm = this.fb.group({
      id: [(natureAideAlimentaire != null) ? natureAideAlimentaire.id : null],
      libelle: [(natureAideAlimentaire != null) ? natureAideAlimentaire.libelle : null,
        [Validators.required]],
      caracteristique: [(natureAideAlimentaire != null) ? natureAideAlimentaire.caracteristique : null],
    });
    this.natureAideAlimentaire = natureAideAlimentaire;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      //(this.natureAideAlimentaire == null) ?
      //this.natureAideAlimentaire = new NatureAideAlimentaire(null, formData.libelle, this.user.username, null):
      this.natureAideAlimentaire = formData;
      this.natureAideAlimentaire.createBy = this.user.username;
      console.log(this.natureAideAlimentaire);
      if (this.checkDoublonElement(this.natureAideAlimentaire) === false) {

        this.natureAideAlimentaireService.save(this.natureAideAlimentaire).subscribe(
          (data: NatureAideAlimentaire) => {
            if(this.natureAideAlimentaire.id != null) {
              this.natureAideAlimentaireList.splice(this.indexOfElement(data.id), 1);
            }
            this.natureAideAlimentaireList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.natureAideAlimentaire = null;
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
    this.natureAideAlimentaire = null;
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

  openModification(natureAideAlimentaire: NatureAideAlimentaire) {
    this.makeForm(natureAideAlimentaire);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(natureAideAlimentaire: NatureAideAlimentaire) {
    this.natureAideAlimentaire = natureAideAlimentaire;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.natureAideAlimentaire.deleteBy = this.user.username;
    this.natureAideAlimentaireService.delete(this.natureAideAlimentaire).subscribe(
      (data: NatureAideAlimentaire) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.natureAideAlimentaire = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.natureAideAlimentaireList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.natureAideAlimentaireService.list().subscribe(
      (data: Array<NatureAideAlimentaire>) => {
        this.natureAideAlimentaireList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(natureAideAlimentaire: NatureAideAlimentaire): void {
    this.natureAideAlimentaire = natureAideAlimentaire;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ natureAideAlimentaire.libelle+'</b> ?</p>',
      nzOkText    : 'Oui',
      nzOkType    : 'danger',
      nzOnOk      : () => this.deleteElement(),
      nzCancelText: 'Non',
      nzOnCancel  : () => this.cancelForm()
    });
  }

  indexOfElement(id: number): number {
    let index = - 1;
    index = this.natureAideAlimentaireList.findIndex( t => t.id == id);
    return index;
  }

  checkDoublonElement(natureAideAlimentaire: NatureAideAlimentaire): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.natureAideAlimentaireList.length && rep === false) {
      if (this.natureAideAlimentaireList[i].libelle === natureAideAlimentaire.libelle && this.natureAideAlimentaireList[i].id != natureAideAlimentaire.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}

