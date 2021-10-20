import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Promoteur} from "../../../../models/Promoteur";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {PromoteurService} from "../../../../services/promoteur.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-promoteur',
  templateUrl: './promoteur.component.html',
  styleUrls: ['./promoteur.component.css']
})
export class PromoteurComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;
  isPersonneMorale: boolean = false;

  promoteur: Promoteur = null;
  promoteurList: Array<Promoteur> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private promoteurService: PromoteurService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.promoteur = null;
    this.promoteurList = [];
    this.getList();
  }

  makeForm(promoteur: Promoteur): void {
    this.validateForm = this.fb.group({

    nomcomplet: [(promoteur != null) ? promoteur.nomcomplet : null,
        [Validators.required]],
      email: [(promoteur != null) ? promoteur.email : null,
        [Validators.required]],
      tel: [(promoteur != null) ? promoteur.tel : null,
        [Validators.required]],
      type: [(promoteur != null) ? promoteur.type : null,
        [Validators.required]],
      adresse: [(promoteur != null) ? promoteur.adresse : null,],
      anneeCreation: [(promoteur != null) ? promoteur.anneeCreation : null],
    });
    this.promoteur = promoteur;
    this.changePersonnality();
  }

  changePersonnality() {
   if(this.validateForm.get('type').value == 'PERSONNE_MORALE')   {
     this.isPersonneMorale = true;
   } else {
     this.isPersonneMorale = false;
   }
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      if(this.promoteur == null) {
        this.promoteur = new Promoteur(null,
          formData.nomcomplet,
          formData.tel,
          formData.email,
          formData.type,
          formData.adresse,
          formData.anneeCreation,
        );
      } else {
        this.promoteur.nomcomplet =  formData.nomcomplet;
        this.promoteur.tel =  formData.tel;
        this.promoteur.email =  formData.email;
        this.promoteur.type =  formData.type;
        this.promoteur.adresse =  formData.adresse;
        this.promoteur.anneeCreation =  formData.anneeCreation;
      }

      console.log(this.promoteur);
        this.promoteurService.save(this.promoteur).subscribe(
          (data: Promoteur) => {
            if(this.promoteur.id != null) {
              let i = this.indexOfElement(data.id);
              this.promoteurList.splice(i, i > -1 ? 1 : 0);
            }
            this.promoteurList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.promoteur = null;
            this.submitted = false;
            this.btnTitle = 'Enregistrer';
            this.validateForm.reset();
          },
          (error: HttpErrorResponse) => {
            this.notificationForm('danger', 'Echec de l\'enregistrement !');
          }
        );
    } else {
      this.notificationForm('danger', 'Formulaire invalide !');
    }
  }

  cancelForm(): void {
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.submitted = false;
    this.promoteur = null;
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

  openModification(promoteur: Promoteur) {
    this.makeForm(promoteur);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(promoteur: Promoteur) {
    this.promoteur = promoteur;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {

    this.promoteurService.delete(this.promoteur).subscribe(
      (data: Promoteur) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.promoteur = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.promoteurList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.promoteurService.list().subscribe(
      (data: Array<Promoteur>) => {
        this.promoteurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(promoteur: Promoteur): void {
    this.promoteur = promoteur;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ promoteur.nomcomplet+'</b> ?</p>',
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
    while (i < this.promoteurList.length && rep === false) {
      if (this.promoteurList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

}
