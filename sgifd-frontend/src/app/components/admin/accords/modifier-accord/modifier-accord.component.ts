import { NatureAssistance } from './../../../../models/NatureAssistance';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SousSecteur } from '../../../../models/SousSecteur';
import { Envergure } from '../../../../models/Envergure';
import { ObjectifODD } from '../../../../models/ObjectifODD';
import { NatureFinancement } from '../../../../models/NatureFinancement';
import { Ptf } from '../../../../models/Ptf';
import { Structure } from '../../../../models/Structure';
import { PilierPAG } from '../../../../models/PilierPAG';
import { ProjetIdee } from '../../../../models/ProjetIdee';
import { Exercice } from '../../../../models/Exercice';
import { Secteur } from '../../../../models/Secteur';
import { NiveauMaturite } from '../../../../models/NiveauMaturite';
import { TypeAccord } from '../../../../models/TypeAccord';
import { User } from '../../../../models/User';
import { ConditionSuspensiveAccord } from '../../../../models/ConditionSuspensiveAccord';
import { ConditionSuspensiveUnDecaissement } from '../../../../models/ConditionSuspensiveUnDecaissement';
import { ActivatedRoute, Router } from '@angular/router';
import { SecteurService } from '../../../../services/secteur.service';
import { NiveauMaturiteService } from '../../../../services/niveau-maturite.service';
import { SousSecteurService } from '../../../../services/sous-secteur.service';
import { TokenStorage } from '../../../../utils/token.storage';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { EnvergureService } from '../../../../services/envergure.service';
import { ObjectifOddService } from '../../../../services/objectif-odd.service';
import { PtfService } from '../../../../services/ptf.service';
import { PiliersPagService } from '../../../../services/piliers-pag.service';
import { StructureService } from '../../../../services/structure.service';
import { ProjetideeService } from '../../../../services/projetidee.service';
import { NatureFinancementService } from '../../../../services/nature-financement.service';
import { ExerciceService } from '../../../../services/exercice.service';
import { AccordService } from '../../../../services/accord.service';
import { TypeAccordsService } from '../../../../services/type-accords.service';
import { ConditionSuspensiveUnDecaissementService } from '../../../../services/condition-suspensive-un-decaissement.service';
import { ConditionSuspensiveAccordService } from '../../../../services/condition-suspensive-accord.service';
import { Accord } from '../../../../models/Accord';
import { HttpErrorResponse } from '@angular/common/http';
import { Ide } from '../../../../models/Ide';
import { FindValues } from '../../../../payload/FindValues';
import { NatureAssistanceService } from 'src/app/services/nature-assistance.service';
import { ProjetProgramme } from "../../../../models/ProjetProgramme";
import { DeviseMonaieService } from "../../../../services/devise-monaie.service";
import { DeviseMonaie } from "../../../../models/DeviseMonaie";
import { ProjetProgrammeService } from "../../../../services/projet-programme.service";
import { ProjetProgrammeIdee } from "../../../../models/ProjetProgrammeIdee";
import { StatusAccordService } from 'src/app/services/status-accord.service';
import { StatusAccord } from 'src/app/models/StatusAccord';


@Component({
  selector: 'app-modifier-accord',
  templateUrl: './modifier-accord.component.html',
  styleUrls: ['./modifier-accord.component.css']
})
export class ModifierAccordComponent implements OnInit {

  validateFormProjetIdee: FormGroup;
  validateFormConditionSuspensive: FormGroup;
  validateFormConditionSuspensiveUnDecaissement: FormGroup;
  validateFormAccord: FormGroup;

  selectedValue: string = '';

  soussecteurList: Array<SousSecteur> = [];
  envergureList: Array<Envergure> = [];
  objectifoddList: Array<ObjectifODD> = [];
  naturefinancementList: Array<NatureFinancement> = [];
  natureassistanceList: Array<NatureAssistance> = [];
  ptfList: Array<Ptf> = [];
  structureList: Array<Structure> = [];
  pilierpagList: Array<PilierPAG> = [];
  projetideeList: Array<ProjetProgrammeIdee> = [];
  exerciceList: Array<Exercice> = [];
  statusAccordList: Array<StatusAccord> = [];

  secteurList: Array<Secteur> = [];
  niveaumaturiteList: Array<NiveauMaturite> = [];
  typeaccordList: Array<TypeAccord> = [];

  paramKey: number;

  user: User = null;
  filter: any;
  isVisibleModalPtf: boolean = false;
  isVisibleModalStructure: boolean = false;
  isVisibleModalProjetNew: boolean = false;
  isVisibleModalProjetList: boolean = false;
  btnFermerText: string = 'Fermer';
  deviseMonaieList: Array<DeviseMonaie> = [];
  accordSubmit: Accord = null;
  ptfSubmit: Array<Ptf> = [];
  structureSubmit: Structure = null;
  projetIdeesSubmit: Array<ProjetProgrammeIdee> = [];
  conditionSuspensiveAccords: Array<ConditionSuspensiveAccord> = [];
  conditionSuspensiveUnDecaissements: Array<ConditionSuspensiveUnDecaissement> = [];

  private findValues: FindValues = new FindValues();

  exerciceModel: Exercice;
  structureModel: Structure;

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

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
    private activeRoute: ActivatedRoute,
    private message: NzMessageService,
    private pilierpagService: PiliersPagService,
    private structureService: StructureService,
    private projetideeService: ProjetProgrammeService,
    private naturefinancementService: NatureFinancementService,
    private exerciceService: ExerciceService,
    private statusAccordService: StatusAccordService,
    private deviseMonaieService: DeviseMonaieService,
    private natureassistanceService: NatureAssistanceService,
    private accordService: AccordService,
    private typeaccordsService: TypeAccordsService,
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
    this.getListDevise();
    this.getListSecteurs();
    this.getListNiveauMaturites();
    this.getListNatureAssistance();

    this.makeFormProjetIdee();

    this.paramKey = this.activeRoute.snapshot.params['paramKey'];
    this.makeFormAccord();
    console.log(this.paramKey);

    this.accordService.getById(this.paramKey).subscribe(
      (data: Accord) => {
        console.log(data);
        this.accordSubmit = data;
        console.log(this.accordSubmit);
        this.ptfSubmit = data.ptfBailleurFrs;
        this.structureSubmit = data.structureBeneficiaire;
        this.projetIdeesSubmit = data.projetProgrammeIdees;
        this.conditionSuspensiveUnDecaissements = data.conditionSuspensiveUnDecaissements;
        this.selectedValue = this.accordSubmit.categorie;
        this.makeFormAccord();
      });
    //console.log(this.accordSubmit.categorie);
    // this.selectedValue = 'this.accordSubmit.categorie'

  }
  log(value: string) {
    this.selectedValue == value;
    console.log(this.selectedValue);
  }

  initialiseFormulaire(): void {
    this.router.navigate(['admin/accords/list-accord/']);
  }

  /* enregistrement d'un accord */
  enregistrerAccord(): void {
    if (this.validateFormAccord.valid) {

      const formData = this.validateFormAccord.value;

      //const accord  = new Accord(
      this.accordSubmit.annee = formData.annee;
      this.accordSubmit.natureAssistance = formData.natureAssistance;
      this.accordSubmit.conditionSuspensiveUnDecaissements = this.conditionSuspensiveUnDecaissements;
      this.accordSubmit.createBy = this.user.username;
      this.accordSubmit.dateSignature = formData.dateSignature;
      this.accordSubmit.envergure = formData.envergure;
      this.accordSubmit.intitule = formData.intitule;
      this.accordSubmit.natureFinancement = formData.natureFinancement;
      this.accordSubmit.odds = formData.odds;
      this.accordSubmit.ptfBailleurFrs = formData.ptfBailleurFrs;
      this.accordSubmit.pilierPAGs = formData.pilierPAGs;
      this.accordSubmit.projetProgrammeIdees = this.projetIdeesSubmit;
      this.accordSubmit.reference = formData.reference;
      this.accordSubmit.sousSecteurs = formData.sousSecteurs ;
      this.accordSubmit.structureBeneficiaire =  formData.structureBeneficiaire;
      this.accordSubmit.typeAccord =  formData.typeAccord;
      this.accordSubmit.montant = formData.montant;
      this.accordSubmit.montantDevise = formData.montantDevise;
      this.accordSubmit.deviseMonnaie = formData.deviseMonnaie ;
      this.accordSubmit.categorie = formData.categorie;

      this.accordSubmit.dateRatification = formData.dateRatification;
      this.accordSubmit.dateFinAccord = formData.dateFinAccord;
      this.accordSubmit.dateDeMiseEnVigueurPtf = formData.dateDeMiseEnVigueurPtf;
      this.accordSubmit.contrePartieNationale = formData.contrePartieNationale;
      this.accordSubmit.apportPtf = formData.apportPtf;
      this.accordSubmit.nomDuSignataire = formData.nomDuSignataire;
      this.accordSubmit.dureeAccord = formData.dureeAccord;
      this.accordSubmit.apportPtfDevise = formData.apportPtfDevise;
      this.accordSubmit.lieuDuSignature = formData.lieuDuSignature;
      this.accordSubmit.depositaire = formData.depositaire;
      this.accordSubmit.retombees = formData.retombees;
      this.accordSubmit.avenants = formData.avenants;
      this.accordSubmit.statusAccord =  formData.statusAccord ;

      //);

      this.accordService.save(this.accordSubmit).subscribe(
        (data: Accord) => {
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<p> L\'accord Réf. <strong>' + data.reference +
              '</strong> a été modifiée avec succès.</p>',
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

  showModalPtf(): void {
    this.isVisibleModalPtf = true;
  }

  showModalStructure(): void {
    this.isVisibleModalStructure = true;
  }

  errorPtf(): void {
    this.ptfSubmit = null;
  }

  errorStructure(): void {
    this.structureSubmit = null;
  }

  choisirUneStructure(s: Structure): void {
    this.structureSubmit = s;
  }

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

  /* les actions sur les conditions suspensive de l'accord*/
  enleverConditionSuspensive(c: ConditionSuspensiveAccord): void {
    this.conditionSuspensiveAccordService.delete(c).subscribe(
      (data: ConditionSuspensiveAccord) => {
        this.conditionSuspensiveAccords.splice(this.indexOfElement(c.id, this.conditionSuspensiveAccords), 1);
      },
      (error: HttpErrorResponse) => {
        //   this.router.navigate(['dashboard']);
        this.createMessage('danger', 'Echec de l\'enregistrement du projet !');
      });
  }

  enregistrerConditionSuspensive(): void {
    if (this.validateFormConditionSuspensive.valid) {

      const formData = this.validateFormConditionSuspensive.value;
      const condition = new ConditionSuspensiveAccord(this.user.username, null, formData.etat,
        null, formData.libelle, formData.observations);

    }
  }

  /* fin des actions sur les conditions suspensives*/

  /* les actions sur les projets jusqu'à l'enregistrement d'un nouveau projet */

  showModalProjetNew(): void {
    this.isVisibleModalProjetNew = true;
  }

  showModalProjetList(): void {
    this.isVisibleModalProjetList = true;
    this.exerciceModel = null;
    this.structureModel = null;
  }

  handleCancelProjetNew(): void {
    this.isVisibleModalProjetNew = false;
  }

  enleverProjetIdee(p: ProjetIdee): void {
    this.projetIdeesSubmit.splice(this.indexOfElement(p.id, this.projetIdeesSubmit), 1);
  }

  /* confirmerSuppressionProjetIdee(p: ProjetIdee): void {
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
    //this.selectedValue = this.accordSubmit.categorie;
    /*console.log(this.accordSubmit);*/

    this.validateFormAccord = this.fb.group({
      reference: [this.accordSubmit != null ? this.accordSubmit.reference : null,
      [Validators.required,]],
      intitule: [this.accordSubmit != null ? this.accordSubmit.intitule : null,],
      montant: [this.accordSubmit != null ? this.accordSubmit.montant : null,
      [Validators.required, Validators.min(0)]],
      annee: [this.accordSubmit != null ? this.accordSubmit.annee : null,
      [Validators.required,]],
      montantDevise: [(this.accordSubmit != null) ? this.accordSubmit.montantDevise : null,
      [Validators.required, Validators.min(0)]],
      deviseMonnaie: [(this.accordSubmit != null && this.accordSubmit.deviseMonnaie != null) ? this.accordSubmit.deviseMonnaie : null,
      [Validators.required,]],
      dateSignature: [this.accordSubmit != null && this.accordSubmit.dateSignature != null? this.convert(this.accordSubmit.dateSignature) : null,
      [Validators.required,]],
      envergure: [this.accordSubmit != null && this.accordSubmit.envergure != null ? this.accordSubmit.envergure : null,],
      natureAssistance: [this.accordSubmit != null && this.accordSubmit.natureAssistance != null ? this.accordSubmit.natureAssistance : null,],
      natureFinancement: [this.accordSubmit != null && this.accordSubmit.natureFinancement != null ? this.accordSubmit.natureFinancement : null,],
      odds: [this.accordSubmit != null ? this.accordSubmit.odds : null,],
      ptfBailleurFrs: [this.accordSubmit != null ? this.accordSubmit.ptfBailleurFrs : null,],
      pilierPAGs: [this.accordSubmit != null ? this.accordSubmit.pilierPAGs : null,],
      sousSecteurs: [this.accordSubmit != null ? this.accordSubmit.sousSecteurs : null,],
      typeAccord: [this.accordSubmit != null && this.accordSubmit.typeAccord != null ? this.accordSubmit.typeAccord : null,],
      structureBeneficiaire: [this.accordSubmit != null && this.accordSubmit.structureBeneficiaire != null ? this.accordSubmit.structureBeneficiaire : null,],
      categorie: [this.accordSubmit != null ? this.accordSubmit.categorie : null,
      [Validators.required,]],

      dateRatification: [this.accordSubmit != null && this.accordSubmit.dateRatification!= null? this.convert(this.accordSubmit.dateRatification) : null,
      [Validators.required,]],
      dateFinAccord: [this.accordSubmit != null && this.accordSubmit.dateFinAccord != null? this.convert(this.accordSubmit.dateFinAccord) : null,
      [Validators.required,]],
      dateDeMiseEnVigueurPtf: [this.accordSubmit != null && this.accordSubmit.dateDeMiseEnVigueurPtf != null? this.convert(this.accordSubmit.dateDeMiseEnVigueurPtf) : null,
      [Validators.required,]],
      contrePartieNationale: [(this.accordSubmit != null) ? this.accordSubmit.contrePartieNationale : null,
      [Validators.min(0),]],
      apportPtf: [(this.accordSubmit != null) ? this.accordSubmit.apportPtf : null,
      [Validators.min(0),]],
      nomDuSignataire: [(this.accordSubmit != null) ? this.accordSubmit.nomDuSignataire : null,
      [Validators.required,]],
      dureeAccord: [(this.accordSubmit != null) ? this.accordSubmit.dureeAccord : null,
      [Validators.min(0),]],
      apportPtfDevise: [(this.accordSubmit != null) ? this.accordSubmit.apportPtfDevise : null,
      [Validators.min(0),]],
      lieuDuSignature: [(this.accordSubmit != null) ? this.accordSubmit.lieuDuSignature : null,],
      retombees: [(this.accordSubmit != null) ? this.accordSubmit.retombees : null],
      avenants: [(this.accordSubmit != null) ? this.accordSubmit.avenants : null],
      statusAccord: [this.accordSubmit != null && this.accordSubmit.statusAccord != null ? this.accordSubmit.statusAccord : null,
      [Validators.required,]],
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

  makeFormConditionSuspensive(): void {
    this.validateFormConditionSuspensive = this.fb.group({
      libelle: [null, [Validators.required,]],
      etat: [null, [Validators.required,]],
      observations: [null],
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

  getListNatureAssistance(): void {
    this.natureassistanceService.list().subscribe(
      (data: Array<NatureAssistance>) => {
        this.natureassistanceList = data;
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
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  // Fin méthode format monnetaire

  /* obtenir l'index de n'importe qu'elle élément */
  indexOfElement(id: number, listElement: Array<any>): number {
    let index = -1;
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

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
}
