import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Informateur} from "../../../../models/Informateur";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {InformateurService} from "../../../../services/informateur.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Structure} from "../../../../models/Structure";
import {StructureService} from "../../../../services/structure.service";
import {FindValues} from "../../../../payload/FindValues";

@Component({
  selector: 'app-informateur',
  templateUrl: './informateur.component.html',
  styleUrls: ['./informateur.component.css']
})
export class InformateurComponent implements OnInit {


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

  informateur: Informateur = null;
  structureList: Array<Structure> = [];
  informateurList: Array<Informateur> = [];

  user: User = null;
  filter: any;
  private findValues: FindValues = new FindValues();

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private structureService: StructureService,
              private informateurService: InformateurService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.informateur = null;
    this.informateurList = [];
    this.getListStructure();
    this.getList();
  }

  makeForm(informateur: Informateur): void {
    this.validateForm = this.fb.group({
      nom: [(informateur != null) ? informateur.nom : null,
        [Validators.required]],
      prenom: [(informateur != null) ? informateur.prenom : null,
        [Validators.required]],
      tel: [(informateur != null) ? informateur.tel : null,
        [Validators.required]],
      email: [(informateur != null) ? informateur.email : null,
        [Validators.required]],
      profession: [(informateur != null) ? informateur.profession : null,
        [Validators.required]],
      sourceInformation: [(informateur != null && informateur.sourceInformation!=null) ? informateur.sourceInformation.id : null,
        [Validators.required]],
    });
    this.informateur = informateur;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      if(this.informateur == null) {
        this.informateur = new Informateur(null,
          formData.nom,
          formData.prenom,
          formData.tel,
          formData.email,
          formData.profession,
          this.user.username,
          null,
          this.findValues.getObjectInList(formData.sourceInformation, this.structureList),
        );
      } else {
        this.informateur.nom =  formData.nom;
        this.informateur.prenom =  formData.prenom;
        this.informateur.tel =  formData.tel;
        this.informateur.email =  formData.email;
        this.informateur.profession =  formData.profession;
        this.informateur.createBy =   this.user.username;
        this.informateur.sourceInformation =  this.findValues.getObjectInList(formData.sourceInformation, this.structureList);
      }

      console.log(this.informateur);
      this.informateurService.save(this.informateur).subscribe(
        (data: Informateur) => {
          if(this.informateur.id != null) {
            let i = this.indexOfElement(data.id);
            this.informateurList.splice(i, i > -1 ? 1 : 0);
          }
          this.informateurList.unshift(data);
          this.notificationForm('success', 'Enregistrement effectué !');
          this.notificationTable('info', 'Nouvel enregistrement effectué !');
          this.informateur = null;
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
    this.informateur = null;
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

  openModification(informateur: Informateur) {
    this.makeForm(informateur);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(informateur: Informateur) {
    this.informateur = informateur;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {

    this.informateurService.delete(this.informateur).subscribe(
      (data: Informateur) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.informateur = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.informateurList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.informateurService.list().subscribe(
      (data: Array<Informateur>) => {
        this.informateurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(informateur: Informateur): void {
    this.informateur = informateur;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ informateur.nom+'</b> ?</p>',
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
    while (i < this.informateurList.length && rep === false) {
      if (this.informateurList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }


  getListStructure(): void {
    this.structureService.list().subscribe(
      (data: Array<Structure>) => {
        this.structureList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

}
