import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjetProgramme} from "../../../../models/ProjetProgramme";
import {Exercice} from "../../../../models/Exercice";
import {RessourceExterieure} from "../../../../models/RessourceExterieure";
import {RessourceExterieureAnnuelle} from "../../../../models/RessourceExterieureAnnuelle";
import {User} from "../../../../models/User";
import {FindValues} from "../../../../payload/FindValues";
import {Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ProjetProgrammeService} from "../../../../services/projet-programme.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RessourceInterieureAnnuelle} from "../../../../models/RessourceInterieureAnnuelle";
import {RessourceExeterieureAnnuelleService} from "../../../../services/ressource-exeterieure-annuelle.service";
import {ProjetProgrammeFinalise} from "../../../../models/ProjetProgrammeFinalise";

@Component({
  selector: 'app-suivi-financiere-exterieure',
  templateUrl: './suivi-financiere-exterieure.component.html',
  styleUrls: ['./suivi-financiere-exterieure.component.css']
})
export class SuiviFinanciereExterieureComponent implements OnInit {

  validateFormRessource: FormGroup;
  @Input() projetSuivi: ProjetProgrammeFinalise = null;
  exerciceConcernesList: Array<Exercice> = [];

  ressourceExterieure: RessourceExterieure = null;
  ressourceExterieureAnnuelle: RessourceExterieureAnnuelle = null;

  ressourceExterieureAnnuelleList: Array<RessourceExterieureAnnuelle> = [];

  numEnregProjet: number = 0;
  user: User = null;
  private findValues: FindValues = new FindValues();

  cumulTotal = {
    programmer: 0, ordonnancer: 0, engager: 0, ordonnancerFcfa: 0, consommeFcfa: 0
  };

  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorage,
              private modalService: NzModalService,
              private projetProgrammeService: ProjetProgrammeService,
              private message: NzMessageService,
              private ressourceExeterieureAnnuelleService: RessourceExeterieureAnnuelleService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    if(this.projetSuivi != null) {
      this.exerciceConcernesList = this.projetSuivi.dureeAnnees;
      this.ressourceExterieureAnnuelleList = [];
      this.ressourceExterieure = null;
    }
    this.makeFormRessource();
  }


  /*Réalisation des formulaires*/
  makeFormRessource(): void {
    this.validateFormRessource = this.fb.group({
      annee: [this.ressourceExterieureAnnuelle != null ? this.ressourceExterieureAnnuelle.annee.id : null,
        [Validators.required,]],
      montantRessourceProgrammer: [this.ressourceExterieureAnnuelle != null ? this.ressourceExterieureAnnuelle.montantRessourceProgrammer : 0,
        [Validators.required, Validators.min(0)]],
      montantRessourceApprouver: [this.ressourceExterieureAnnuelle != null ? this.ressourceExterieureAnnuelle.montantRessourceApprouver : 0,
        [Validators.required, Validators.min(0)]],
      montantRessourceDecaisser: [this.ressourceExterieureAnnuelle != null ? this.ressourceExterieureAnnuelle.montantRessourceDecaisser : 0,
        [Validators.required, Validators.min(0)]],
      montantRessourceDecaisserFcfa: [this.ressourceExterieureAnnuelle != null ? this.ressourceExterieureAnnuelle.montantRessourceDecaisserFcfa : 0,
        [Validators.required, Validators.min(0)]],
      montantConsommeFcfa: [this.ressourceExterieureAnnuelle != null ? this.ressourceExterieureAnnuelle.montantConsommeFcfa : 0,
        [Validators.required, Validators.min(0)]],
    });
  }

/*  getRessourceInterieureByProjet() {
    if (this.numEnregProjet == 0 || this.numEnregProjet == null) {
      this.createMessage('error', 'Echec de l\'enregistrement du projet !');
    } else {

      this.projetProgrammeService.getById(this.numEnregProjet).subscribe(
        (data: ProjetProgramme) => {
          console.log(data);
          if (data == null) {
            this.modalService.error({
              nzTitle: 'Erreur',
              nzContent: '<p> Aucun projet ne porte le numéro d\'enregistrement <b>' + this.numEnregProjet + '</b>.</p>',
              nzOkText: null,
              nzCancelText: 'Ok',
              nzOnCancel: () => console.log(),
            });
          } else {
            this.exerciceConcernesList = data.dureeAnnees;
            console.log(this.exerciceConcernesList);
          }
          this.projetSuivi = data;
          this.ressourceExterieureAnnuelleList = [];
          this.ressourceExterieure = null;
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('info', 'Aucune information disponible !');
        });
    }
  }*/
/*
  getTotalEngagerByRessource(ressource: RessourceExterieure): number {
    let total = 0;
    ressource.ressourceExterieureAnnuelles.forEach( r=> {
      total= total + r.montantRessourceApprouver;
    });
    return total;
  }*/


  getTotalEngagerForProjet(): number {
    let total = 0;
    this.projetSuivi.ressourceExterieures.forEach( rprojet => {
      total = total + this.getTotalEngagerByOneRessource(rprojet.ressourceExterieureAnnuelles);
    });
    return total;
  }

  getTotalDecaisserFcfaForProjet(): number {
    let total = 0;
    this.projetSuivi.ressourceExterieures.forEach( rprojet => {
      total = total + this.getTotalDecaisserFcfaByOneRessource(rprojet.ressourceExterieureAnnuelles);
    });
    return total;
  }

  modifierAction(ressource: RessourceExterieureAnnuelle): void {
    this.ressourceExterieureAnnuelle = ressource;
    this.makeFormRessource();
  }

  choiceRessourceExterieure(ressource: RessourceExterieure): void {
    this.ressourceExterieureAnnuelleList = ressource.ressourceExterieureAnnuelles;
    this.ressourceExterieure = ressource;
    if(this.ressourceExterieure != null && this.ressourceExterieure.isStatusClose==false){
      this.createMessage('warning', 'Impossible de faire le suivi financier d\'une requête encours !');
    }

    this.cumulTotal = {
      programmer: this.getTotalProgrammer(),
      ordonnancer: this.getTotalOrdonnancer(), engager: this.getTotalEngager(),
      ordonnancerFcfa: this.getTotalOrdonnancerFcfa(),
      consommeFcfa: this.getTotalConsommeFcfa()
    };
  }

  getTotalProgrammer(): number {
    let cout = 0;
    this.ressourceExterieureAnnuelleList.forEach(r => {
      cout = cout + r.montantRessourceProgrammer;
    });
    return cout;
  }

  getTotalEngager(): number {
    let cout = 0;
    this.ressourceExterieureAnnuelleList.forEach(r => {
      cout = cout + r.montantRessourceApprouver;
    });
    return cout;
  }

  getTotalOrdonnancer(): number {
    let cout = 0;
    this.ressourceExterieureAnnuelleList.forEach(r => {
      cout = cout + r.montantRessourceDecaisser;
    });
    return cout;
  }

  getTotalOrdonnancerFcfa(): number {
    let cout = 0;
    this.ressourceExterieureAnnuelleList.forEach(r => {
      cout = cout + r.montantRessourceDecaisserFcfa;
    });
    return cout;
  }

  getTotalConsommeFcfa(): number {
    let cout = 0;
    this.ressourceExterieureAnnuelleList.forEach(r => {
      cout = cout + r.montantConsommeFcfa;
    });
    return cout;
  }

  getTotalEngagerByOneRessource(ressourceList: Array<RessourceExterieureAnnuelle>): number {
    let cout = 0;
    ressourceList.forEach(r => {
      cout = cout + r.montantRessourceApprouver;
    });
    return cout;
  }

  getTotalDecaisserByOneRessource(ressourceList: Array<RessourceExterieureAnnuelle>): number {
    let cout = 0;
    ressourceList.forEach(r => {
      cout = cout + r.montantRessourceDecaisser;
    });
    return cout;
  }

  getTotalDecaisserFcfaByOneRessource(ressourceList: Array<RessourceExterieureAnnuelle>): number {
    let cout = 0;
    ressourceList.forEach(r => {
      cout = cout + r.montantRessourceDecaisserFcfa;
    });
    return cout;
  }


  deleteRessource(ressource: RessourceExterieureAnnuelle): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de la ressource de : <b>' + ressource.annee.libelle + '</b>' +
        ' montant engager : <b>' + ressource.montantRessourceApprouver + '</b> francs CFA ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deleteOneRessource(ressource),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneRessource(ressource: RessourceExterieureAnnuelle): void {
    this.ressourceExeterieureAnnuelleService.delete(ressource).subscribe(
      (data: RessourceExterieureAnnuelle) => {
        //this.getList();
        this.ressourceExterieureAnnuelleList.splice(this.indexOfElement(data.id), 1);
        this.cumulTotal = {
          programmer: this.getTotalProgrammer(),
          ordonnancer: this.getTotalOrdonnancer(), engager: this.getTotalEngager(),
          ordonnancerFcfa: this.getTotalOrdonnancerFcfa(),
          consommeFcfa: this.getTotalConsommeFcfa()
        };
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        //this.notificationTable('danger', 'Echec de la suppression !');
      });
  }

  indexOfElement(id: number): number {
    let index = -3;
    index = this.ressourceExterieureAnnuelleList.findIndex(r => r.id === id);
    return index;
  }

  indexOfElementAnnee(annee: number): number {
    let index = -3;
    index = this.ressourceExterieureAnnuelleList.findIndex(r => r.annee.id === annee);
    return index;
  }

  isTheSameYear(annee: number): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.ressourceExterieureAnnuelleList.length && rep === false) {
      //if (this.ressourceExterieureAnnuelleList[i].annee.id === annee && this.ressourceExterieureAnnuelle.id == null) {
        if (this.ressourceExterieureAnnuelleList[i].annee.id === annee && this.ressourceExterieureAnnuelle === null) {
        rep = true;
      }
      i++;
    }
    return rep;
  }

  enregistrerRessource(): void {
    for (const i in this.validateFormRessource.controls) {
      this.validateFormRessource.controls[i].markAsDirty();
      this.validateFormRessource.controls[i].updateValueAndValidity();
    }

    if (this.validateFormRessource.valid) {

      /* if (this.ressourceExterieureAnnuelle == null) {
        this.ressourceExterieureAnnuelle = new RessourceExterieureAnnuelle(null, null, null, null, null, null, null, null, null)
      } */
      if (this.projetSuivi == null || this.ressourceExterieure == null) {
        this.createMessage('error', 'Veuillez rechercher obligatoire le projet et sélectionner la ressource suivi !');
      } else {
        const formData = this.validateFormRessource.value;

        if (this.ressourceExterieureAnnuelle != null) {
          this.cumulTotal.ordonnancer = this.cumulTotal.ordonnancer - this.ressourceExterieureAnnuelle.montantRessourceDecaisser;
        }

        //if (this.cumulTotal.engager + formData.montantRessourceApprouver > this.projetSuivi.coutTotalRessourcesExterieures) {
        //if (this.cumulTotal.ordonnancerFcfa + formData.montantRessourceDecaisserFcfa > this.ressourceExterieure.montantRessourceProgrammer){
        if (this.cumulTotal.ordonnancer + formData.montantRessourceDecaisser > this.ressourceExterieure.montantRessourceDevise){
        this.createMessage('error', 'Montant décaissé trop élévé au montant restant !');
        } else {
          if (this.isTheSameYear(formData.annee) == true) {
            this.createMessage('error', 'Cette année est déjà enregistrer !');
          } else {

            if (this.ressourceExterieureAnnuelle == null) {
              this.ressourceExterieureAnnuelle = new RessourceExterieureAnnuelle(null, null, null, null, null, null, null, null, null, null)
            }
            if (formData.montantRessourceApprouver <= formData.montantRessourceProgrammer
              && formData.montantRessourceDecaisser <= formData.montantRessourceApprouver
              && formData.montantRessourceDecaisser <= formData.montantRessourceProgrammer
              && formData.montantRessourceProgrammer <= (this.ressourceExterieure.montantRessourceDevise - this.cumulTotal.ordonnancer)) {
              this.ressourceExterieureAnnuelle.montantRessourceDecaisser = formData.montantRessourceDecaisser;
              this.ressourceExterieureAnnuelle.montantRessourceDecaisserFcfa = formData.montantRessourceDecaisserFcfa;
              this.ressourceExterieureAnnuelle.montantConsommeFcfa = formData.montantConsommeFcfa;
              this.ressourceExterieureAnnuelle.montantRessourceApprouver = formData.montantRessourceApprouver;
              this.ressourceExterieureAnnuelle.montantRessourceProgrammer = formData.montantRessourceProgrammer;
              this.ressourceExterieureAnnuelle.annee = this.findValues.getObjectInList(formData.annee, this.exerciceConcernesList);
              this.ressourceExeterieureAnnuelleService.save(this.ressourceExterieure.id, this.ressourceExterieureAnnuelle).subscribe(
                (data: RessourceExterieureAnnuelle) => {
                  console.log(data);
                  /* const i = this.indexOfElement(data.id);
                  this.ressourceExterieureAnnuelleList.splice(i, i > -1? 1 : 0); */

                  if(this.indexOfElementAnnee(data.annee.id)>=0){
                    this.ressourceExterieureAnnuelleList.splice(this.indexOfElementAnnee(data.annee.id), 1);
                  }

                  this.ressourceExterieureAnnuelleList.unshift(data);
                  this.ressourceExterieureAnnuelle = null;
                  this.makeFormRessource();
                  this.cumulTotal = {
                    programmer: this.getTotalProgrammer(),
                    ordonnancer: this.getTotalOrdonnancer(), engager: this.getTotalEngager(),
                    ordonnancerFcfa: this.getTotalOrdonnancerFcfa(),
                    consommeFcfa: this.getTotalConsommeFcfa()
                  };
                },
                (error: HttpErrorResponse) => {
                  //   this.router.navigate(['dashboard']);
                  this.createMessage('error', 'Echec de l\'enregistrement du projet !');
                });
            } else {
              this.createMessage('error', 'Erreur de jugement entre les montants programmer, ordonnancer et angager !');
            }
          }
        }
      }
    } else {
      this.createMessage('error', 'Formulaire invalide. Veuillez renseigner correctement les champs !');
    }

  }



/* Debut méthode format monnetaire */
formatNumber(num: number): string {
  return num != null ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '):  '0';
}
/* Fin méthode format monnetaire */



  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
}
