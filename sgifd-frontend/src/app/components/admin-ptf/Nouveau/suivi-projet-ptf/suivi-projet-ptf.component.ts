import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetProgramme } from '../../../../models/ProjetProgramme';
import { Exercice } from '../../../../models/Exercice';
import { RessourceExterieure } from '../../../../models/RessourceExterieure';
import { RessourceExterieureAnnuelle } from '../../../../models/RessourceExterieureAnnuelle';
import { User } from '../../../../models/User';
import { FindValues } from '../../../../payload/FindValues';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorage } from '../../../../utils/token.storage';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ProjetProgrammeService } from '../../../../services/projet-programme.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RessourceInterieureAnnuelle } from '../../../../models/RessourceInterieureAnnuelle';
import { RessourceExeterieureAnnuelleService } from '../../../../services/ressource-exeterieure-annuelle.service';
import { RequetePtfService } from '../../../../services/requete-ptf.service';
import { ExerciceService } from '../../../../services/exercice.service';

@Component({
  selector: 'app-suivi-projet-ptf',
  templateUrl: './suivi-projet-ptf.component.html',
  styleUrls: ['./suivi-projet-ptf.component.css']
})
export class SuiviProjetPtfComponent implements OnInit {


  validateFormRessource: FormGroup;
  projetSuivi: ProjetProgramme = null;
  exerciceConcernesList: Array<Exercice> = [];

  ressourceExterieure: RessourceExterieure = null;
  ressourceExterieureAnnuelle: RessourceExterieureAnnuelle = null;

  ressourceExterieureAnnuelleList: Array<RessourceExterieureAnnuelle> = [];

  idP: number;

  devLib:string;

  numEnregProjet: number = 0;
  user: User = null;
  private findValues: FindValues = new FindValues();

  cumulTotal = {
    programmer: 0, ordonnancer: 0, engager: 0
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorage,
    private activeRoute: ActivatedRoute,
    private modalService: NzModalService,
    private requetePtfService: RequetePtfService,
    private exerciceService: ExerciceService,
    private projetProgrammeService: ProjetProgrammeService,
    private message: NzMessageService,
    private ressourceExeterieureAnnuelleService: RessourceExeterieureAnnuelleService
  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getListExercice();

    this.makeFormRessource();
    this.numEnregProjet = this.activeRoute.snapshot.params['idP'];

    this.getProjetAndRessourceExterieureByProjetId();
  }


  /*Réalisation des formulaires*/
  makeFormRessource(): void {
    this.validateFormRessource = this.fb.group({
      annee: [this.ressourceExterieureAnnuelle != null ? this.ressourceExterieureAnnuelle.annee.id : 1,
      [Validators.required,]],
      montantRessourceProgrammer: [this.ressourceExterieureAnnuelle != null ? this.ressourceExterieureAnnuelle.montantRessourceProgrammer : 0,
      [Validators.required, Validators.min(0)]],
      montantRessourceApprouver: [this.ressourceExterieureAnnuelle != null ? this.ressourceExterieureAnnuelle.montantRessourceApprouver : 0,
      [Validators.required, Validators.min(0)]],
      montantRessourceDecaisser: [this.ressourceExterieureAnnuelle != null ? this.ressourceExterieureAnnuelle.montantRessourceDecaisser : 0,
      [Validators.required, Validators.min(0)]],
      montantRessourceDecaisserFcfa: [this.ressourceExterieureAnnuelle != null ? this.ressourceExterieureAnnuelle.montantRessourceDecaisserFcfa : 0,
      [Validators.required, Validators.min(0)]],
    });
  }


  getProjetAndRessourceExterieureByProjetId() {
    if (this.numEnregProjet == 0 || this.numEnregProjet == null) {
      this.createMessage('error', 'Echec de lors de chargement du projet !');
    } else {

      this.requetePtfService.getDetailProjetFinancesByIdP(this.numEnregProjet).subscribe(
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
          } //else {
            //this.exerciceConcernesList = data.dureeAnnees;
          //}
          this.projetSuivi = data;

        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('error', 'Echec de lors de chargement du projet !');
        });
    }
  }



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
    this.projetSuivi.ressourceExterieures.forEach(rprojet => {
      total = total + this.getTotalEngagerByOneRessource(rprojet.ressourceExterieureAnnuelles);
    });
    return total;
  }


  modifierAction(ressource: RessourceExterieureAnnuelle): void {
    this.ressourceExterieureAnnuelle = ressource;
    this.makeFormRessource();
  }



  /* ressourceExterieureChoice(): void {
    this.cumulTotal = {
      programmer: this.getTotalProgrammer(),
      ordonnancer: this.getTotalOrdonnancer(), engager: this.getTotalEngager()
    };
  } */






  choiceRessourceExterieure(ressource: RessourceExterieure): void {
    this.ressourceExterieureAnnuelleList = ressource.ressourceExterieureAnnuelles;
    this.ressourceExterieure = ressource;
    this.cumulTotal = {
      programmer: this.getTotalProgrammer(),
      ordonnancer: this.getTotalOrdonnancer(), engager: this.getTotalEngager()
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
    console.log(this.ressourceExterieureAnnuelleList);
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
          ordonnancer: this.getTotalOrdonnancer(), engager: this.getTotalEngager()
        };
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        //this.notificationTable('danger', 'Echec de la suppression !');
      });
  }

  indexOfElement(id: number): number {
    let index = -3;
    let rep: boolean = false;
    let i = 0;
    while (i < this.ressourceExterieureAnnuelleList.length && rep === false) {
      if (this.ressourceExterieureAnnuelleList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }



  indexOfElementAnnee(annee: number): number {
    let index = -3;
    let rep: boolean = false;
    let i = 0;
    while (i < this.ressourceExterieureAnnuelleList.length && rep === false) {
      if (this.ressourceExterieureAnnuelleList[i].annee.id === annee) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }



  isTheSameYear(annee: number): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.ressourceExterieureAnnuelleList.length && rep === false) {
      if (this.ressourceExterieureAnnuelleList[i].annee.id === annee && this.ressourceExterieureAnnuelle.id == null) {
        rep = true;
      }
      i++;
    }
    return rep;
  }



   enregistrerRessource(): void {
    if (this.validateFormRessource.valid) {
      if (this.projetSuivi == null || this.ressourceExterieure == null) {
        this.createMessage('error', 'Veuillez rechercher obligatoire le projet et sélectionner la ressource suivi !');
      } else {
        const formData = this.validateFormRessource.value;

        if (this.ressourceExterieureAnnuelle != null) {
          this.cumulTotal.ordonnancer = this.cumulTotal.ordonnancer - this.ressourceExterieureAnnuelle.montantRessourceDecaisser;
        }

        //if (this.cumulTotal.engager + formData.montantRessourceApprouver > this.projetSuivi.coutTotalRessourcesExterieures) {
          //if (this.cumulTotal.engager + formData.montantRessourceApprouver > this.ressourceExterieure.montantRessourceProgrammer) {
        if (this.cumulTotal.ordonnancer + formData.montantRessourceDecaisser > this.ressourceExterieure.montantRessourceDevise){
          //this.createMessage('error', 'Montant engager trop élévé au montant restant !');
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
              this.ressourceExterieureAnnuelle.montantRessourceApprouver = formData.montantRessourceApprouver;
              this.ressourceExterieureAnnuelle.montantRessourceProgrammer = formData.montantRessourceProgrammer;
              this.ressourceExterieureAnnuelle.annee = this.findValues.getObjectInList(formData.annee, this.exerciceConcernesList);
              this.ressourceExeterieureAnnuelleService.save(this.ressourceExterieure.id, this.ressourceExterieureAnnuelle).subscribe(
                (data: RessourceExterieureAnnuelle) => {
                  console.log(data);
                  //this.ressourceExterieureAnnuelleList.splice(this.indexOfElement(data.id), 1);
                  if(this.indexOfElementAnnee(data.annee.id)>=0){
                    this.ressourceExterieureAnnuelleList.splice(this.indexOfElementAnnee(data.annee.id), 1);
                  }

                  this.ressourceExterieureAnnuelleList.unshift(data);
                  this.ressourceExterieureAnnuelle = null;
                  this.makeFormRessource();
                  console.log(this.ressourceExterieureAnnuelleList);
                  this.cumulTotal = {
                    programmer: this.getTotalProgrammer(),
                    ordonnancer: this.getTotalOrdonnancer(), engager: this.getTotalEngager()
                  };
                },
                (error: HttpErrorResponse) => {
                  //   this.router.navigate(['dashboard']);
                  this.createMessage('error', 'Echec de l\'enregistrement de la ressource annuelle !');
                });
            } else {
              this.createMessage('error', 'Erreur de jugement entre les montants programmer, ordonnancer et angager !');
            }
          }
        }
      }
    }
  }





  getListExercice(): void {
    this.exerciceService.list().subscribe(
      (data: Array<Exercice>) => {
        this.exerciceConcernesList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }




  /* Debut méthode format monnetaire */
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  /* Fin méthode format monnetaire */


  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
}
