import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {NzModalService} from "ng-zorro-antd";
import {RegroupementClubPtf} from "../../../../models/RegroupementClubPtf";
import {User} from "../../../../models/User";
import {TokenStorage} from "../../../../utils/token.storage";
import {PaysService} from "../../../../services/pays.service";
import {DomainePtfService} from "../../../../services/domaine-ptf.service";
import {CategoriePtfService} from "../../../../services/categorie-ptf.service";
import {RegroupementClubPtfService} from "../../../../services/regroupement-club-ptf.service";
import {PtfService} from "../../../../services/ptf.service";
import {Ptf} from "../../../../models/Ptf";
import {Pays} from "../../../../models/Pays";
import {CategoriePTF} from "../../../../models/CategoriePTF";
import {DomainePTF} from "../../../../models/DomainePTF";
import {HttpErrorResponse} from "@angular/common/http";
import {FindValues} from "../../../../payload/FindValues";
import {Structure} from "../../../../models/Structure";

declare var $ :any;

@Component({
  selector: 'app-ptf-fournisseur',
  templateUrl: './ptf-fournisseur.component.html',
  styleUrls: ['./ptf-fournisseur.component.css']
})
export class PtfFournisseurComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  ptf: Ptf = null;
  ptfList: Array<Ptf> = [];
  paysList: Array<Pays> = [];
  categorieptfList: Array<CategoriePTF> = [];
  domaineptfList: Array<DomainePTF> = [];
  regroupementClubPtfList: Array<RegroupementClubPtf> = [];

  filter: any;
  user: User = null;

  private findValues: FindValues = new FindValues();

  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorage,
              private modalService: NzModalService,
              private paysService: PaysService,
              private domaineptfService: DomainePtfService,
              private categorieptfService: CategoriePtfService,
              private regroupemementclubptfService: RegroupementClubPtfService,
              private ptfService: PtfService,
              ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.ptf = null;
    this.ptfList = [];
    this.makeListDomainePTF();
    this.makeListPays();
    this.makeListCategoriePtf();
    this.makeListRegroupementClubPtf();
    this.getList();
  }

  makeForm(ptf: Ptf): void {
    console.log(ptf);
    this.validateForm = this.fb.group({
      denominationPtf: [(ptf != null) ? ptf.denominationptf : null,
        [Validators.required,]],
      siglePtf: [(ptf != null) ? ptf.sigleptf : null],
      telPtf: [(ptf != null) ? ptf.telptf : null],
      emailPtf: [(ptf != null) ? ptf.emailptf : null],
      adressePtf: [(ptf != null) ? ptf.adresseptf : null],
      domaineptfs: [(ptf != null) ? this.findValues.getArrayId(ptf.domaineptfs) : null,
        [Validators.required,]],
      categorieptf: [(ptf != null) ? ptf.categorieptf.id : null,
        [Validators.required,]],
      regroupementclubPtf: [(ptf != null && ptf.regroupementclub != null) ? ptf.regroupementclub.id : null,
        [Validators.required,]],
      pays: [(ptf != null) ? ptf.pays.id : null],
      adresseptfEtrangere: [(ptf != null) ? ptf.adresseptfEtrangere : null],
    });
    this.ptf = ptf;
  }


  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      if(this.ptf == null) {
        this.ptf = new Ptf(null,
          formData.denominationPtf,
          formData.siglePtf,
          formData.emailPtf,
          formData.telPtf,
          formData.adressePtf,
          this.findValues.getObjectListInList(formData.domaineptfs, this.domaineptfList),
          this.findValues.getObjectInList(formData.categorieptf, this.categorieptfList),
          this.findValues.getObjectInList(formData.regroupementclubPtf, this.regroupementClubPtfList),
          this.findValues.getObjectInList(formData.pays, this.paysList),
          this.user.username,
          null);
        this.ptf.adresseptfEtrangere = formData.adresseptfEtrangere;
      } else {
        this.ptf.denominationptf = formData.denominationPtf;
        this.ptf.sigleptf = formData.siglePtf;
        this.ptf.emailptf = formData.emailPtf;
        this.ptf.telptf = formData.telPtf;
        this.ptf.adresseptf = formData.adressePtf;
        this.ptf.domaineptfs = this.findValues.getObjectListInList(formData.domaineptfs, this.domaineptfList);
        this.ptf.categorieptf = this.findValues.getObjectInList(formData.categorieptf, this.categorieptfList);
        this.ptf.regroupementclub = this.findValues.getObjectInList(formData.regroupementclubPtf, this.regroupementClubPtfList);
        this.ptf.pays = this.findValues.getObjectInList(formData.pays, this.paysList);
        this.ptf.createBy = this.user.username;
        this.ptf.adresseptfEtrangere = formData.adresseptfEtrangere;
      }
      console.log(this.ptf);
      if (this.checkDoublonElement(this.ptf) === false) {
        //this.typeptfList.unshift(this.typeptf);
        this.ptfService.save(this.ptf).subscribe(
          (data: Ptf) => {
            if(this.ptf.id != null) {
              this.ptfList.splice(this.ptfList.findIndex(p=> p.id===data.id), 1);
            }
            this.ptfList.unshift(data);
            this.ptfList = [...this.ptfList];
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.ptf = null;
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
     this.ptf = null;
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

   openModification(ptf: Ptf) {
     this.makeForm(ptf);
     this.btnTitle = 'Modifier';
   }

   openDeleteDialog(ptf: Ptf) {
     this.ptf = ptf;
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

   makeListDomainePTF(): void {
     this.domaineptfService.list().subscribe(
       (data: Array<DomainePTF>) => {
         this.domaineptfList = data;
       },
       (error: HttpErrorResponse) => {
         console.log('Echec !');
       });
   }
   makeListCategoriePtf(): void {
     this.categorieptfService.list().subscribe(
       (data: Array<CategoriePTF>) => {
         this.categorieptfList = data;
       },
       (error: HttpErrorResponse) => {
         console.log('Echec !');
       });
   }
   makeListRegroupementClubPtf(): void {
     this.regroupemementclubptfService.list().subscribe(
       (data: Array<RegroupementClubPtf>) => {
         this.regroupementClubPtfList = data;
       },
       (error: HttpErrorResponse) => {
         console.log('Echec !');
       });
   }


 deleteElement() {
   this.ptf.deleteBy = this.user.username;
   this.ptfService.delete(this.ptf).subscribe(
     (data: Ptf) => {
       //this.getList();
       this.closeNotificationForm();
       this.notificationTable('info', 'Suppression effectuée avec succès !');
       this.ptf = null;
       this.submitted = false;
       this.btnTitle = 'Enregistrer';
       this.validateForm.reset();
       this.ptfList.splice(this.ptfList.findIndex(p=> p.id===data.id), 1);
       this.ptfList = [...this.ptfList];
     },
     (error: HttpErrorResponse) => {
       console.log('Echec !');
       this.notificationTable('danger', 'Echec de la suppression !');
     }
   );
 }

 error(ptf: Ptf): void {
   this.ptf = ptf;
   this.modalService.error({
     nzTitle: 'Suppression',
     nzContent: '<p> Confirmez-vous la suppression de <b>'+ ptf.denominationptf+'</b> ?</p>',
     nzOkText    : 'Oui',
     nzOkType    : 'danger',
     nzOnOk      : () => this.deleteElement(),
     nzCancelText: 'Non',
     nzOnCancel  : () => this.cancelForm()
   });
 }

 getList(): void {
   this.ptfService.list().subscribe(
     (data: Array<Ptf>) => {
       this.ptfList = data;
     },
     (error: HttpErrorResponse) => {
       console.log('Echec !');
     }
   );
 }

 checkDoublonElement(ptf: Ptf): boolean {
   let rep: boolean = false;
   let i = 0;
   while (i < this.ptfList.length && rep === false) {
     if (this.ptfList[i].categorieptf.id === ptf.categorieptf.id && this.ptfList[i].denominationptf === ptf.denominationptf && this.ptfList[i].id != ptf.id) {
       rep = true;
     }
     i ++;
   }
   return rep;
 }

  ouvrirDetail(ptf: Ptf): void {
    let domaines : string = '<ul>';
    for(let i = 0; i< ptf.domaineptfs.length; i++){
      domaines += '<li><b>'+ptf.domaineptfs[i].libelle+'</b></li>';
    }
    domaines +='</ul>';
    this.modalService.info({
      nzTitle: 'Détails de l\'identité du PTF',
      nzContent:
        '<hr>'+
        '<p> Dénomination : <b>'+ ptf.denominationptf+'</b> </p>'+
        '<p> Sigle : <b>'+ ptf.sigleptf+'</b>  </p>'+
        '<p> Contact(s) : <b>'+ ptf.telptf+'</b>  </p>'+
        '<p> Email : <b>'+ ptf.emailptf+'</b>  </p>'+
        '<p> Pays : <b>'+ ptf.pays.libelle+'</b>  </p>'+
        '<p> Catégorie : <b>'+ ptf.categorieptf.libelle+'</b>  </p>'+
        '<p> Club de regroupement : <b>'+ ptf.regroupementclub.libelle+'</b>  </p>'+
        '<p> Domaines d\'activité : '+
        domaines
        +'</p>'+
        '<p> Adresse : <br><b>'+ ptf.adresseptf+'</b>  </p>'
      ,
      nzOkText: null,
      nzOkType    : null,
      nzCancelText: 'OK',
      nzOnOk      : () => null,
      nzOnCancel: () => console.log('cancel')
    });
  }

}
