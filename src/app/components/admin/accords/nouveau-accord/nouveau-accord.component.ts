import { NatureAssistance } from './../../../../models/NatureAssistance';
import { Component, OnInit } from '@angular/core';
import { SousSecteur } from '../../../../models/SousSecteur';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecteurService } from '../../../../services/secteur.service';
import { SousSecteurService } from '../../../../services/sous-secteur.service';
import { TokenStorage } from '../../../../utils/token.storage';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpErrorResponse } from '@angular/common/http';
import { Envergure } from '../../../../models/Envergure';
import { EnvergureService } from '../../../../services/envergure.service';
import { ObjectifODD } from '../../../../models/ObjectifODD';
import { ObjectifOddService } from '../../../../services/objectif-odd.service';
import { NatureFinancement } from '../../../../models/NatureFinancement';
import { NatureFinancementService } from '../../../../services/nature-financement.service';
import { Ptf } from '../../../../models/Ptf';
import { PtfService } from '../../../../services/ptf.service';
import { Structure } from '../../../../models/Structure';
import { StructureService } from '../../../../services/structure.service';
import { User } from '../../../../models/User';
import { PiliersPagService } from '../../../../services/piliers-pag.service';
import { PilierPAG } from '../../../../models/PilierPAG';
import { ProjetideeService } from '../../../../services/projetidee.service';
import { ProjetIdee } from '../../../../models/ProjetIdee';
import { ConditionSuspensiveAccord } from '../../../../models/ConditionSuspensiveAccord';
import { ConditionSuspensiveUnDecaissement } from '../../../../models/ConditionSuspensiveUnDecaissement';
import { RequeteFinancement } from '../../../../models/RequeteFinancement';
import { ConditionSuspensiveUnDecaissementService } from '../../../../services/condition-suspensive-un-decaissement.service';
import { ConditionSuspensiveAccordService } from '../../../../services/condition-suspensive-accord.service';
import { Exercice } from '../../../../models/Exercice';
import { ExerciceService } from '../../../../services/exercice.service';
import { Secteur } from '../../../../models/Secteur';
import { NiveauMaturite } from '../../../../models/NiveauMaturite';
import { NiveauMaturiteService } from '../../../../services/niveau-maturite.service';
import { Accord } from '../../../../models/Accord';
import { AccordService } from '../../../../services/accord.service';
import { TypeAccord } from '../../../../models/TypeAccord';
import { TypeAccordsService } from '../../../../services/type-accords.service';
import { NatureAssistanceService } from 'src/app/services/nature-assistance.service';
import {ProjetProgramme} from "../../../../models/ProjetProgramme";
import {DeviseMonaie} from "../../../../models/DeviseMonaie";
import {DeviseMonaieService} from "../../../../services/devise-monaie.service";
import {ProjetProgrammeService} from "../../../../services/projet-programme.service";
import {ProjetProgrammeIdee} from "../../../../models/ProjetProgrammeIdee";
import { StatusAccordService } from 'src/app/services/status-accord.service';
import { StatusAccord } from 'src/app/models/StatusAccord';

@Component({
  selector: 'app-nouveau-accord',
  templateUrl: './nouveau-accord.component.html',
  styleUrls: ['./nouveau-accord.component.css']
})
export class NouveauAccordComponent implements OnInit {

  validateFormProjetIdee: FormGroup;
  validateFormConditionSuspensive: FormGroup;
  validateFormConditionSuspensiveUnDecaissement: FormGroup;
  validateFormAccord: FormGroup;
  natureassistanceList: Array<NatureAssistance> = [];

  soussecteurList: Array<SousSecteur> = [];
  envergureList: Array<Envergure> = [];
  objectifoddList: Array<ObjectifODD> = [];
  naturefinancementList: Array<NatureFinancement> = [];
  ptfList: Array<Ptf> = [];
  structureList: Array<Structure> = [];
  pilierpagList: Array<PilierPAG> = [];
  projetideeList: Array<ProjetProgrammeIdee> = [];
  exerciceList: Array<Exercice> = [];
  statusAccordList: Array<StatusAccord> = [];
  secteurList: Array<Secteur> = [];
  niveaumaturiteList: Array<NiveauMaturite> = [];
  typeaccordList: Array<TypeAccord> = [];

  user: User = null;
  filter: any;
  isVisibleModalPtf: boolean = false;
  isVisibleModalStructure: boolean = false;
  isVisibleModalProjetNew: boolean = false;
  isVisibleModalProjetList: boolean = false;
  btnFermerText: string = 'Fermer';

  selectedValue: string = 'AVECPROJET';

  ptfSubmit: Array<Ptf> = [];
  deviseMonaieList: Array<DeviseMonaie> = [];
  structureSubmit: Structure = null;
  projetIdeesSubmit: Array<ProjetProgrammeIdee> = [];
  conditionSuspensiveAccords: Array<ConditionSuspensiveAccord> = [];
  conditionSuspensiveUnDecaissements: Array<ConditionSuspensiveUnDecaissement> = [];

  exerciceModel: Exercice;
  structureModel: Structure;

  constructor(private fb: FormBuilder,
    private router: Router,
    private secteurService: SecteurService,
    private niveaumaturiteService: NiveauMaturiteService,
    private soussecteurService: SousSecteurService,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,
    private envergureService: EnvergureService,
    private objectifoddService: ObjectifOddService,
    private ptfService: PtfService,
    private message: NzMessageService,
    private pilierpagService: PiliersPagService,
    private structureService: StructureService,
    private projetideeService: ProjetProgrammeService,
    private naturefinancementService: NatureFinancementService,
    private deviseMonaieService: DeviseMonaieService,
    private exerciceService: ExerciceService,
    private statusAccordService: StatusAccordService,
    private accordService: AccordService,
    private typeaccordsService: TypeAccordsService,
    private natureassistanceService: NatureAssistanceService,
    private conditionSuspensiveUnDecaissementService: ConditionSuspensiveUnDecaissementService,
    private conditionSuspensiveAccordService: ConditionSuspensiveAccordService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getListSousSecteurs();
    this.getListEnvergure();
    this.getListNatureFinancement();
    this.getListTypeAccord();
    this.getListPTF();
    this.getListStructure();
    this.getListPilierPAG();
    this.getListODD();
    //this.getListProjetIdee();
    this.getListExercice();
    this.getListStatusAccord();
    this.getListSecteurs();
    this.getListDevise();
    this.getListNiveauMaturites();
    this.getListNatureAssistance();
    this.makeFormProjetIdee();
    this.makeFormConditionSuspensiveUnDecaissement();
    this.makeFormAccord();

  }


  log(value: string) {
    this.selectedValue == value;

  }

  initialiseFormulaire(): void {
    this.projetIdeesSubmit = [];
    this.conditionSuspensiveAccords = [];
    this.conditionSuspensiveUnDecaissements = [];
    this.validateFormAccord.reset();
    this.validateFormAccord.get('categorie')
    .setValue("AVECPROJET");
    this.validateFormConditionSuspensiveUnDecaissement.reset();
    this.validateFormProjetIdee.reset();
  }

  /* enregistrement d'un accord */
  enregistrerAccord(): void {
    if (this.validateFormAccord.valid ) {

      const formData = this.validateFormAccord.value;

      const accord = new Accord(
        formData.annee,
        formData.natureAssistance,
        this.conditionSuspensiveUnDecaissements,
        this.user.username,
        formData.dateSignature,
        null,
        formData.envergure,
        null,
        formData.intitule,
        formData.natureFinancement,
        formData.odds,
        formData.ptfBailleurFrs,
        formData.pilierPAGs,
        this.projetIdeesSubmit,
        formData.reference,
        formData.sousSecteurs,
        formData.structureBeneficiaire,
        formData.typeAccord,
        formData.montant,
        formData.categorie,
        null,
        formData.montantDevise,
        formData.deviseMonnaie,

        formData.dateRatification,
        formData.dateFinAccord,
        formData.dateDeMiseEnVigueurPtf,
        formData.contrePartieNationale,
        formData.apportPtf,
        formData.nomDuSignataire,
        formData.dureeAccord,
        formData.apportPtfDevise,
        formData.lieuDuSignature,
        formData.depositaire,
        formData.retombees,
        formData.avenants,
        formData.statusAccord,
      );

      this.accordService.save(accord).subscribe(
        (data: Accord) => {
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<p> L\'accord Réf. <strong>' + data.reference +
              '</strong> a été enregistré avec succès.</p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => this.initialiseFormulaire()
          });
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('danger', 'Echec de l\'enregistrement du projet !');
        });
    } else {

    }
  }
  /* fin enregistrement d'un accord*/



  /* fin du choisir le PTF et la structure bénéficiaire*/

  /* les actions sur les conditions suspensive du premier décaissement de l'accord*/
  enleverConditionSuspensivePremierDecaissement(c: ConditionSuspensiveUnDecaissement): void {
    this.conditionSuspensiveUnDecaissementService.delete(c).subscribe(
      (data: ConditionSuspensiveUnDecaissement) => {
        this.conditionSuspensiveUnDecaissements.splice(this.indexOfElement(c.id, this.conditionSuspensiveUnDecaissements), 1);
      },
      (error: HttpErrorResponse) => {
        //   this.router.navigate(['dashboard']);
        this.createMessage('danger', 'Echec de l\'enregistrement du projet !');
      });
  }

  enregistrerConditionSuspensivePremierDecaissement(): void {
    if (this.validateFormConditionSuspensiveUnDecaissement.valid) {

      const formData = this.validateFormConditionSuspensiveUnDecaissement.value;
      const condition = new ConditionSuspensiveUnDecaissement(this.user.username, null, formData.etat,
        null, formData.libelle, formData.observations);
      this.conditionSuspensiveUnDecaissementService.save(condition).subscribe(
        (data: ConditionSuspensiveUnDecaissement) => {
          this.conditionSuspensiveUnDecaissements.unshift(data);
          this.validateFormConditionSuspensiveUnDecaissement.reset();
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('danger', 'Echec de l\'enregistrement du projet !');
        });
    }
  }
  /* fin des actions sur les conditions suspensives du premier décaissement de l'accord */


  /* fin des actions sur les conditions suspensives*/

  /* les actions sur les projets jusqu'à l'enregistrement d'un nouveau projet */
/*
  showModalProjetNew(): void {
    this.isVisibleModalProjetNew = true;
  }*/

  showModalProjetList(): void {
    this.isVisibleModalProjetList = true;
    this.exerciceModel= null;
    this.structureModel= null;
  }

  handleCancelProjetNew(): void {
    this.isVisibleModalProjetNew = false;
  }

  enleverProjetIdee(p: ProjetProgrammeIdee): void {
    this.projetIdeesSubmit.splice(this.indexOfElement(p.id, this.projetIdeesSubmit), 1);
  }
  /*
    confirmerSuppressionProjetIdee(p: ProjetIdee): void {
      this.modalService.error({
        nzTitle: 'Suppression',
        nzContent: '<p> Confirmez-vous la suppression du projet référence N°: ' + p.reference + ' ?</p>',
        nzOkText: 'Oui',
        nzCancelText: 'Non',
        nzOnOk: () => this.supprimerProjetIdee(p),
        nzOnCancel: () => console.log('cancel')
      });
    }

    supprimerProjetIdee(p: ProjetIdee): void {
      this.projetideeService.delete(p).subscribe(
        (data: ProjetIdee) => {
          this.projetIdeesSubmit.splice(this.indexOfElement(p.id, this.projetIdeesSubmit), 1);
          this.projetideeList.splice(this.indexOfElement(p.id, this.projetideeList), 1);
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('danger', 'Echec de l\'enregistrement du projet !');
        });
    }*/

  ajouterProjetIdee(p: ProjetProgrammeIdee): void {
    let i = this.indexOfElement(p.id, this.projetIdeesSubmit);
    this.projetIdeesSubmit.splice(i, i > -1 ? 1 : 0);
    this.projetIdeesSubmit.unshift(p);
  }

  getListNatureAssistance(): void {
    this.natureassistanceService.list().subscribe(
      (data: Array<NatureAssistance>) => {
        this.natureassistanceList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

/*  enregistrerProjetIdee(): void {
    if (this.validateFormProjetIdee.invalid) {
      this.modalService.error({
        nzTitle: 'Erreur',
        nzContent: '<p> Les informations invalides pour l\'enregistrement du projet.</p>',
        nzOkText: null,
        nzCancelText: 'Ok',
        nzOnCancel: () => console.log('cancel')
      });
    } else {
      const formData = this.validateFormProjetIdee.value;
      const projet = new ProjetIdee(null, formData.libelle, formData.reference, formData.niveaumaturite,
        formData.secteur, formData.objectifs, formData.difficultes);
      this.projetideeService.save(projet).subscribe(
        (data: ProjetIdee) => {
          this.projetideeList.unshift(data);
          this.projetIdeesSubmit.unshift(data);
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('danger', 'Echec de l\'enregistrement du projet !');
        });
    }
  }*/
  /* fin des actions sur les projets */

  /*Réalisation des formulaires*/
  makeFormAccord(): void {
    this.validateFormAccord = this.fb.group({
      reference: [null, [Validators.required,]],
      intitule: [null,],
      montant: [null, [Validators.min(0)]],
      montantDevise: [ null, [Validators.min(0)]],
      deviseMonnaie: [ null],
      annee: [null, [Validators.required,]],
      dateSignature: [null, [Validators.required,]],
      envergure: [null, ],
      natureFinancement: [null, ],
      natureAssistance: [null, ],
      odds: [null,],
      pilierPAGs: [null,],
      sousSecteurs: [null,],
      categorie: [null,],
      typeAccord: [null, ],
      structureBeneficiaire: [null, ],
      ptfBailleurFrs: [null, ],
      dateRatification: [ null, [Validators.required,]],
      dateFinAccord: [ null, [Validators.required,]],
      dateDeMiseEnVigueurPtf: [ null, [Validators.required,]],
      contrePartieNationale: [null, [ Validators.min(0)]],
      apportPtf: [null, [ Validators.min(0)]],
      nomDuSignataire:[ null, [Validators.required,]],
      dureeAccord: [ null, [Validators.required,  Validators.min(0),]],
      apportPtfDevise: [ null, [Validators.min(0),]],
      lieuDuSignature: [ null, []],
      depositaire: [ null, []],

      retombees: [ null],
      avenants: [ null],

      statusAccord: [ null, [Validators.required,]],
    });
  }

  makeFormProjetIdee(): void {
    this.validateFormProjetIdee = this.fb.group({
      reference: [null, [Validators.required,]],
      libelle: [null, [Validators.required,]],
      niveaumaturite: [null],
      secteur: [null, [Validators.required,]],
      objectifs: [null, [Validators.required,]],
      difficultes: [null],
    });
  }

  makeFormConditionSuspensiveUnDecaissement(): void {
    this.validateFormConditionSuspensiveUnDecaissement = this.fb.group({
      libelle: [null, [Validators.required,]],
      etat: [null, [Validators.required,]],
      observations: [null],
    });
  }
  /*fin des formulaires nécéssaires*/

  /*Obtenir la liste des informations de base*/

  getListExercice(): void {
    this.exerciceService.list().subscribe(
      (data: Array<Exercice>) => {
        this.exerciceList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  getListStatusAccord(): void {
    this.statusAccordService.list().subscribe(
      (data: Array<StatusAccord>) => {
        this.statusAccordList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }


  getListDevise(): void {
    this.deviseMonaieService.list().subscribe(
      (data: Array<DeviseMonaie>) => {
        this.deviseMonaieList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListPilierPAG(): void {
    this.pilierpagService.list().subscribe(
      (data: Array<PilierPAG>) => {
        this.pilierpagList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }


  getListTypeAccord(): void {
    this.typeaccordsService.list().subscribe(
      (data: Array<TypeAccord>) => {
        this.typeaccordList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListNiveauMaturites(): void {
    this.niveaumaturiteService.list().subscribe(
      (data: Array<NiveauMaturite>) => {
        this.niveaumaturiteList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListPTF(): void {
    this.ptfService.list().subscribe(
      (data: Array<Ptf>) => {
        this.ptfList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListSecteurs(): void {
    this.secteurService.list().subscribe(
      (data: Array<Secteur>) => {
        this.secteurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListProjetIdee(): void {
    if (this.exerciceModel == null || this.structureModel == null) {
      this.projetideeList = [];
    } else {
      this.projetideeService.listByAnneeByStructure(this.exerciceModel.id, this.structureModel.id).subscribe(
        (data: Array<ProjetProgrammeIdee>) => {
          this.projetideeList = data;
        },
        (error: HttpErrorResponse) => {
          console.log('Echec !');
        });
    }
  }

  getListSousSecteurs(): void {
    this.soussecteurService.list().subscribe(
      (data: Array<SousSecteur>) => {
        this.soussecteurList = data;
        console.log( this.soussecteurList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListEnvergure(): void {
    this.envergureService.list().subscribe(
      (data: Array<Envergure>) => {
        this.envergureList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListODD(): void {
    this.objectifoddService.list().subscribe(
      (data: Array<ObjectifODD>) => {
        this.objectifoddList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListNatureFinancement(): void {
    this.naturefinancementService.list().subscribe(
      (data: Array<NatureFinancement>) => {
        this.naturefinancementList = data;
        console.log(this.naturefinancementList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
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
  /*fin de la liste des informations de base*/


  // Debut méthode format monnetaire
formatNumber(num: number) : string{
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}
// Fin méthode format monnetaire

  /* obtenir l'index de n'importe qu'elle élément */
  indexOfElement(id: number, listElement: Array<any>): number {
    let index = - 1;
    let rep: boolean = false;
    let i = 0;
    while (i < listElement.length && rep === false) {
      if (listElement[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleModalPtf = false;
    this.isVisibleModalStructure = false;
    this.isVisibleModalProjetNew = false;
    this.isVisibleModalProjetList = false;
  }

}
