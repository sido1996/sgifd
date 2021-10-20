import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ProjetProgrammeService} from "../../../../services/projet-programme.service";
import {User} from "../../../../models/User";
import {RessourceInterieureAnnuelle} from "../../../../models/RessourceInterieureAnnuelle";
import {RessourceInterieureAnnuelleService} from "../../../../services/ressource-interieure-annuelle.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Exercice} from "../../../../models/Exercice";
import {FindValues} from "../../../../payload/FindValues";
import {TypeRessourceInterieure} from '../../../../models/TypeRessourceInterieure';
import {ProjetProgrammeFinalise} from "../../../../models/ProjetProgrammeFinalise";

@Component({
  selector: 'app-suivi-financiere-interieure',
  templateUrl: './suivi-financiere-interieure.component.html',
  styleUrls: ['./suivi-financiere-interieure.component.css']
})
export class SuiviFinanciereInterieureComponent implements OnInit {

  validateFormRessource: FormGroup;
  projetSuivi: ProjetProgrammeFinalise = null;
  exerciceConcernesList: Array<Exercice> = [];
  typeRessourceInterieureList: Array<TypeRessourceInterieure> = [];

  paramKey: any = null;

  ressourceInterieure: RessourceInterieureAnnuelle = null;

  ressourceInterieureAnnuelleList: Array<RessourceInterieureAnnuelle> = [];
  numEnregProjet: number = 0;
  user: User = null;
  private findValues: FindValues = new FindValues();

  filter: any;

  cumulTotal = {
    programmer: 0, ordonnancer: 0, engager: 0
  };

  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorage,
              private modalService: NzModalService,
              private projetProgrammeService: ProjetProgrammeService,
              private message: NzMessageService,
              private activeRoute: ActivatedRoute,
              private ressourceInterieureAnnuelleService: RessourceInterieureAnnuelleService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.paramKey = this.activeRoute.snapshot.params['paramKey'];

    if(this.paramKey != null && this.paramKey > 0) {
      this.numEnregProjet = this.paramKey;
      this.projetProgrammeService.getById(this.paramKey).subscribe(
        (data: ProjetProgrammeFinalise) => {
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
            this.projetSuivi = data;
            this.exerciceConcernesList = data.dureeAnnees;
            this.typeRessourceInterieureList = data.typeRessourceInterieures;
            console.log(this.typeRessourceInterieureList);
            this.ressourceInterieureAnnuelleList = data.ressourceInterieureAnnuelles;
            this.cumulTotal = {
              programmer: this.getTotalProgrammer(),
              ordonnancer: this.getTotalOrdonnancer(), engager: this.getTotalEngager()
            };
          }
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('info', 'Aucune information disponible !');
        });
    }
    this.makeFormRessource();
  }

  enregistrerRessource(): void {
    for (const i in this.validateFormRessource.controls) {
      this.validateFormRessource.controls[i].markAsDirty();
      this.validateFormRessource.controls[i].updateValueAndValidity();
    }

    if (this.validateFormRessource.valid === true) {

      if (this.projetSuivi == null) {
        this.createMessage('error', 'Veuillez rechercher obligatoire le projet !');
      } else {
        const formData = this.validateFormRessource.value;

        /* if (this.ressourceInterieureAnnuelleList.find(r => r.typeRessourceInterieure.id == formData.typeRessourceInterieure.id
         && r.annee.id == formData.typeRessourceInterieure.id)) {
         this.modalService.error({
           nzTitle: 'Erreur',
           nzContent: 'Cet type de ressource intérieure est déjà introduite pour cette année',
           nzOkText: null,
           nzCancelText: 'Ok',
           nzOnCancel: () => console.log(),
         });
       } else { */

        if (this.ressourceInterieure != null && this.ressourceInterieure.id != null) {
          this.cumulTotal.engager = this.cumulTotal.engager - this.ressourceInterieure.montantRessourceEngager;
        }

        if (this.cumulTotal.engager + formData.montantRessourceEngager > this.projetSuivi.contrePartieNationale) {
          this.createMessage('error', 'Montant engager trop élévé au montant restant !');
        } else {
          if (this.isTheSameYearTypeRessource(formData.annee, formData.typeRessourceInterieure) == true) {
            this.createMessage('error', 'Cet type de ressource intérieur  est déjà enregistrer Cette année là !');
          } else {

            if (this.ressourceInterieure == null) {
              this.ressourceInterieure = new RessourceInterieureAnnuelle(null, null, null, null, null, null, null, null)
            }

            if (formData.montantRessourceEngager <= formData.montantRessourceProgrammer
              && formData.montantRessourceEngager <= formData.montantRessourceOrdonnancer
              && formData.montantRessourceOrdonnancer <= formData.montantRessourceProgrammer
              && formData.montantRessourceProgrammer <= (this.projetSuivi.contrePartieNationale - this.cumulTotal.engager)) {
              this.ressourceInterieure.montantRessourceOrdonnancer = formData.montantRessourceOrdonnancer;
              this.ressourceInterieure.montantRessourceEngager = formData.montantRessourceEngager;
              this.ressourceInterieure.montantRessourceProgrammer = formData.montantRessourceProgrammer;
              this.ressourceInterieure.annee = this.findValues.getObjectInList(formData.annee, this.exerciceConcernesList);
              this.ressourceInterieure.typeRessourceInterieure = this.findValues.getObjectInList(formData.typeRessourceInterieure, this.typeRessourceInterieureList);
              this.ressourceInterieureAnnuelleService.save(this.projetSuivi.id, this.ressourceInterieure).subscribe(
                (data: RessourceInterieureAnnuelle) => {
                  console.log(data);

                  if (this.indexOfElementAnneeTypeRessource(data.annee.id, data.typeRessourceInterieure.id) > -1) {
                    this.ressourceInterieureAnnuelleList.splice(this.indexOfElementAnneeTypeRessource(data.annee.id, data.typeRessourceInterieure.id), 1);
                  }

                  this.ressourceInterieureAnnuelleList.unshift(data);
                  this.ressourceInterieure = null;
                  this.makeFormRessource();
                  this.cumulTotal = {
                    programmer: this.getTotalProgrammer(),
                    ordonnancer: this.getTotalOrdonnancer(), engager: this.getTotalEngager()
                  };
                },
                (error: HttpErrorResponse) => {
                  //   this.router.navigate(['dashboard']);
                  this.createMessage('info', 'Aucune information disponible !');
                });
            } else {
              this.createMessage('error', 'Erreur de jugement entre les montants programmer, ordonnancer et angager !');
            }
          }
        }
        //}
      }
    } else {
      this.createMessage('error', 'Formulaire invalide. Veuillez renseigner correctement les champs !');
    }
  }

  modifierAction(ressource: RessourceInterieureAnnuelle): void {
    this.ressourceInterieure = ressource;
    this.makeFormRessource();
  }

  deleteRessource(ressource: RessourceInterieureAnnuelle): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de la ressource de : <b>' +
        (ressource != null && ressource.annee != null ? ressource.annee.libelle : 'N.A') + '</b>' +
        ' montant engager : <b>' + (ressource != null ?
          ressource.montantRessourceEngager : 'N.A') + '</b> francs CFA ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deleteOneRessource(ressource),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneRessource(ressource: RessourceInterieureAnnuelle): void {
    this.ressourceInterieureAnnuelleService.delete(ressource).subscribe(
      (data: RessourceInterieureAnnuelle) => {
        //this.getList();
        this.ressourceInterieureAnnuelleList.splice(this.indexOfElement(data.id), 1);
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


  indexOfElementAnnee(annee: number): number {
    let index = -3;
    index = this.ressourceInterieureAnnuelleList.findIndex(r => r.annee.id === annee);
    return index;
  }


  indexOfElementAnneeTypeRessource(annee: number, type: number): number {
    let index = -3;
    let rep: boolean = false;
    let i = 0;
    while (i < this.ressourceInterieureAnnuelleList.length && rep === false) {
      if (this.ressourceInterieureAnnuelleList[i].annee.id === annee &&
        this.ressourceInterieureAnnuelleList[i].typeRessourceInterieure.id === type) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  indexOfElement(id: number): number {
    let index = -3;
    index  = this.ressourceInterieureAnnuelleList.findIndex(r => r.id === id);
    return index;
  }

  /* isTheSameYear(annee: number): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.ressourceInterieureAnnuelleList.length && rep === false) {
      if (this.ressourceInterieureAnnuelleList[i].annee.id === annee && this.ressourceInterieure == null) {
        rep = true;
      }
      i++;
    }
    return rep;
  } */

  isTheSameYearTypeRessource(annee: number, type: number): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.ressourceInterieureAnnuelleList.length && rep === false) {
      if (this.ressourceInterieureAnnuelleList[i].annee.id === annee &&
        this.ressourceInterieureAnnuelleList[i].typeRessourceInterieure.id === type
        && this.ressourceInterieure == null) {
        rep = true;
      }
      i++;
    }
    return rep;
  }

  getTotalProgrammer(): number {
    let cout = 0;
    this.ressourceInterieureAnnuelleList.forEach(r => {
      cout = cout + r.montantRessourceProgrammer;
    });
    return cout;
  }

  getTotalEngager(): number {
    let cout = 0;
    this.ressourceInterieureAnnuelleList.forEach(r => {
      cout = cout + r.montantRessourceEngager;
    });
    return cout;
  }

  getTotalOrdonnancer(): number {
    let cout = 0;
    this.ressourceInterieureAnnuelleList.forEach(r => {
      cout = cout + r.montantRessourceOrdonnancer;
    });
    return cout;
  }

  /*Réalisation des formulaires*/
  makeFormRessource(): void {
    this.validateFormRessource = this.fb.group({
      annee: [this.ressourceInterieure != null && this.ressourceInterieure.annee != null ? this.ressourceInterieure.annee.id : null,
        [Validators.required,]],
      typeRessourceInterieure: [this.ressourceInterieure != null && this.ressourceInterieure.typeRessourceInterieure != null ? this.ressourceInterieure.typeRessourceInterieure.id : null,
        [Validators.required,]],
      montantRessourceProgrammer: [this.ressourceInterieure != null ? this.ressourceInterieure.montantRessourceProgrammer : 0,
        [Validators.required, Validators.min(0)]],
      montantRessourceEngager: [this.ressourceInterieure != null ? this.ressourceInterieure.montantRessourceEngager : 0,
        [Validators.required, Validators.min(0)]],
      montantRessourceOrdonnancer: [this.ressourceInterieure != null ? this.ressourceInterieure.montantRessourceOrdonnancer : 0,
        [Validators.required, Validators.min(0)]],
    });
  }

  getRessourceInterieureByProjet() {
    if (this.numEnregProjet == 0 || this.numEnregProjet == null) {
      this.createMessage('error', 'Echec de l\'enregistrement du projet !');
    } else {

      this.projetProgrammeService.getById(this.numEnregProjet).subscribe(
        (data: ProjetProgrammeFinalise) => {
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
            this.projetSuivi = data;
            this.exerciceConcernesList = data.dureeAnnees;
            this.typeRessourceInterieureList = data.typeRessourceInterieures;
            console.log(this.typeRessourceInterieureList);
            this.ressourceInterieureAnnuelleList = data.ressourceInterieureAnnuelles;
            this.cumulTotal = {
              programmer: this.getTotalProgrammer(),
              ordonnancer: this.getTotalOrdonnancer(), engager: this.getTotalEngager()
            };
          }
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('info', 'Aucune information disponible !');
        });
    }
  }

  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

}
