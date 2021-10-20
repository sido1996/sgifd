import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TypeStructureService} from "../../../../services/type-structure.service";
import {TypeStructure} from "../../../../models/TypeStructure";
import {Structure} from "../../../../models/Structure";
import {User} from "../../../../models/User";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzModalService} from "ng-zorro-antd";
import {StructureService} from "../../../../services/structure.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DomaineActiviteService} from "../../../../services/domaine-activite.service";
import {DomaineActivite} from "../../../../models/DomaineActivite";
import {FindValues} from "../../../../payload/FindValues";

declare var $ :any;

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  structure: Structure = null;
  structureList: Array<Structure> = [];
  typestructureList: Array<TypeStructure> = [];
  domaineactiviteList: Array<DomaineActivite> = [];

  listOfSelectedValueDomaine: Array<DomaineActivite> = [];

  filter: any;
  user: User = null;
  private findValues: FindValues = new FindValues();

  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorage,
              private modalService: NzModalService,
              private structureService: StructureService,
              private typestructureService: TypeStructureService,
              private domaineactiviteService: DomaineActiviteService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.structure = null;
    this.structureList = [];
    this.makeListTypeStructure();
    this.makeListDomaineActivite();
    this.getList();
  }
  makeForm(structure: Structure): void {
    if(structure == null) {
      this.validateForm = this.fb.group({
        denominationStructure: [null, [Validators.required,]],
        sigleStructure: [null],
        telStructure: [null],
        emailStructure: [null],
        adresseStructure: [null],
        domaineActivites: [null,
          [Validators.required,]],
        typestructure: [null, [Validators.required,]],
      });
    } else {
      this.listOfSelectedValueDomaine = structure.domaineActivites;
      this.validateForm = this.fb.group({
        denominationStructure: [structure.denominationStructure, [Validators.required,]],
        sigleStructure: [structure.sigleStructure],
        telStructure: [structure.telStructure],
        emailStructure: [structure.emailStructure],
        adresseStructure: [structure.adresseStructure],
        domaineActivites: [this.findValues.getArrayId(structure.domaineActivites), [Validators.required,]],
        typestructure: [structure.typestructure.id, [Validators.required,]],
      });
    }
   console.log(this.listOfSelectedValueDomaine);
    this.structure = structure;
  }


  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      if(this.structure == null) {
        this.structure = new Structure(null,
          formData.denominationStructure,
          formData.sigleStructure,
          formData.telStructure,
          formData.emailStructure,
          formData.adresseStructure,
          this.findValues.getObjectListInList(formData.domaineActivites, this.domaineactiviteList),
          this.findValues.getObjectInList(formData.typestructure, this.typestructureList),
          this.user.username,
          null);
      } else {
        this.structure.denominationStructure = formData.denominationStructure;
        this.structure.sigleStructure = formData.sigleStructure;
        this.structure.telStructure = formData.telStructure;
        this.structure.emailStructure = formData.emailStructure;
        this.structure.adresseStructure = formData.adresseStructure;
        this.structure.domaineActivites = this.findValues.getObjectListInList(formData.domaineActivites, this.domaineactiviteList);
        this.structure.typestructure = this.findValues.getObjectInList(formData.typestructure, this.typestructureList);
        this.structure.createBy = this.user.username;
      }
      console.log(this.structure);
      if (this.checkDoublonElement(this.structure) === false) {
        //this.typestructureList.unshift(this.typestructure);
        this.structureService.save(this.structure).subscribe(
          (data: Structure) => {
            if(this.structure.id != null) {
              this.structureList.splice(this.structureList.findIndex(s=> s.id === data.id), 1);
            }
            this.structureList.unshift(data);
            this.structureList = [... this.structureList];
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.structure = null;
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
    this.structure = null;
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

  openModification(structure: Structure) {
    console.log(structure);
    this.makeForm(structure);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(structure: Structure) {
    this.structure = structure;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  makeListTypeStructure(): void {
    this.typestructureService.list().subscribe(
      (data: Array<TypeStructure>) => {
        this.typestructureList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  makeListDomaineActivite(): void {
    this.domaineactiviteService.list().subscribe(
      (data: Array<DomaineActivite>) => {
        this.domaineactiviteList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  deleteElement() {
    this.structure.deleteBy = this.user.username;
    this.structureService.delete(this.structure).subscribe(
      (data: Structure) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.structure = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.structureList.splice(this.structureList.findIndex(s=> s.id === data.id), 1);
        this.structureList = [... this.structureList];
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  error(structure: Structure): void {
    this.structure = structure;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ structure.denominationStructure+'</b> ?</p>',
      nzOkText    : 'Oui',
      nzOkType    : 'danger',
      nzOnOk      : () => this.deleteElement(),
      nzCancelText: 'Non',
      nzOnCancel  : () => this.cancelForm()
    });
  }

  getList(): void {
    this.structureService.list().subscribe(
      (data: Array<Structure>) => {
        this.structureList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  checkDoublonElement(structure: Structure): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.structureList.length && rep === false) {
      if (this.structureList[i].denominationStructure === structure.denominationStructure && this.structureList[i].id != structure.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

  ouvrirDetail(structure: Structure): void {
    let domaines : string = '<ul>';
    for(let i = 0; i< structure.domaineActivites.length; i++){
        domaines += '<li><b>'+structure.domaineActivites[i].libelle+'</b></li>';
    }
    domaines +='</ul>';
    this.modalService.info({
      nzTitle: 'Détails de la structurede',
      nzContent:
        '<hr>'+
        '<p> Dénomination : <b>'+ structure.denominationStructure+'</b> </p>'+
        '<p> Sigle : <b>'+ structure.sigleStructure+'</b>  </p>'+
        '<p> Contact(s) : <b>'+ structure.telStructure+'</b>  </p>'+
        '<p> Email : <b>'+ structure.emailStructure+'</b>  </p>'+
        '<p> Type : <b>'+ structure.typestructure.libelle+'</b>  </p>'+
        '<p> Domaines d\'activité : '+
           domaines
        +'</p>'
      ,
      nzOkText: null,
      nzOkType    : null,
      nzCancelText: 'OK',
      nzOnOk      : () => null,
      nzOnCancel: () => console.log('cancel')
    });
  }

}
