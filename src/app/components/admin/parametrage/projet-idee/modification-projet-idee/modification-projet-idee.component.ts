import { RessourceExterieure } from '../../../../../models/RessourceExterieure';

import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cible } from '../../../../../models/Cible';
import { CategorieProjet } from '../../../../../models/CategorieProjet';
import { Envergure } from '../../../../../models/Envergure';
import { Ptf } from '../../../../../models/Ptf';
import { Departement } from '../../../../../models/Departement';
import { Structure } from '../../../../../models/Structure';
import { NiveauMaturite } from '../../../../../models/NiveauMaturite';
import { Secteur } from '../../../../../models/Secteur';
import { TypeCooperation } from '../../../../../models/TypeCooperation';
import { Exercice } from '../../../../../models/Exercice';
import { GrandSecteur } from '../../../../../models/GrandSecteur';
import { AxePrioritaire } from '../../../../../models/AxePrioritaire';
import { DeviseMonaie } from '../../../../../models/DeviseMonaie';
import { NatureFinancement } from '../../../../../models/NatureFinancement';
import { TypeAssistance } from '../../../../../models/TypeAssistance';
import { TypeRessourceInterieure } from '../../../../../models/TypeRessourceInterieure';
import { SousSecteur } from '../../../../../models/SousSecteur';
import { NatureAssistance } from '../../../../../models/NatureAssistance';
import { Commune } from '../../../../../models/Commune';
import { Arrondissement } from '../../../../../models/Arrondissement';
import { User } from '../../../../../models/User';
import { ConditionSuspensiveDecaissement } from '../../../../../models/ConditionSuspensiveDecaissement';
import { ConditionSuspensiveAccord } from '../../../../../models/ConditionSuspensiveAccord';
import { Localisation } from '../../../../../models/Localisation';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorage } from '../../../../../utils/token.storage';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { EnvergureService } from '../../../../../services/envergure.service';
import { AxePrioritaireService } from '../../../../../services/axe-prioritaire.service';
import { NiveauMaturiteService } from '../../../../../services/niveau-maturite.service';
import { SousSecteurService } from '../../../../../services/sous-secteur.service';
import { NatureFinancementService } from '../../../../../services/nature-financement.service';
import { TypeRessourceInterieureService } from '../../../../../services/type-ressource-interieure.service';
import { SecteurService } from '../../../../../services/secteur.service';
import { TypeAssistantService } from '../../../../../services/type-assistant.service';
import { ExerciceService } from '../../../../../services/exercice.service';
import { RessourceExeterieureService } from '../../../../../services/ressource-exeterieure.service';
import { CibleService } from '../../../../../services/cible.service';
import { PtfService } from '../../../../../services/ptf.service';
import { RegroupementClubPtfService } from '../../../../../services/regroupement-club-ptf.service';
import { CategorieProjetService } from '../../../../../services/categorie-projet.service';
import { StructureService } from '../../../../../services/structure.service';
import { ProjetProgrammeService } from '../../../../../services/projet-programme.service';
import { DepartementService } from '../../../../../services/departement.service';
import { ArrondissementService } from '../../../../../services/arrondissement.service';
import { CommuneService } from '../../../../../services/commune.service';
import { ConditionSuspensiveDecaissementService } from '../../../../../services/condition-suspensive-decaissement.service';
import { NatureAssistanceService } from '../../../../../services/nature-assistance.service';
import { ConditionSuspensiveAccordService } from '../../../../../services/condition-suspensive-accord.service';
import { DeviseMonaieService } from '../../../../../services/devise-monaie.service';
import { TypeCooperationService } from '../../../../../services/type-cooperation.service';
import { LocalisationService } from '../../../../../services/localisation.service';
import { GrandSecteurService } from '../../../../../services/grand-secteur.service';
import { ProjetProgramme } from '../../../../../models/ProjetProgramme';
import { HttpErrorResponse } from '@angular/common/http';
import { FindValues } from '../../../../../payload/FindValues';

@Component({
  selector: 'app-modification-projet-idee',
  templateUrl: './modification-projet-idee.component.html',
  styleUrls: ['./modification-projet-idee.component.css']
})
export class ModificationProjetIdeeComponent implements OnInit {

  validateFormConditionSuspensive: FormGroup;
  validateFormConditionSuspensiveDecaissement: FormGroup;
  validateFormRessourceExterieure: FormGroup;
  validateFormProjetIdee: FormGroup;
  validateFormLocalisation: FormGroup;

  projetSubmit: ProjetProgramme = null;

  cibleList: Array<Cible> = [];
  categorieprojetList: Array<CategorieProjet> = [];
  envergureList: Array<Envergure> = [];
  ptfList: Array<Ptf> = [];
  departementList: Array<Departement> = [];
  structureList: Array<Structure> = [];
  niveaumaturiteList: Array<NiveauMaturite> = [];
  secteurList: Array<Secteur> = [];
  typecooperationList: Array<TypeCooperation> = [];
  exerciceList: Array<Exercice> = [];
  grandsecteurList: Array<GrandSecteur> = [];
  axeprioritaireList: Array<AxePrioritaire> = [];
  devisemonaieList: Array<DeviseMonaie> = [];
  naturefinancementList: Array<NatureFinancement> = [];
  typeassistanceList: Array<TypeAssistance> = [];
  typeressourceinterieureList: Array<TypeRessourceInterieure> = [];
  soussecteurList: Array<SousSecteur> = [];
  natureassistanceList: Array<NatureAssistance> = [];
  communeList: Array<Commune> = [];
  arrondissementList: Array<Arrondissement> = [];

  user: User = null;
  filter: any;

  private findValues: FindValues = new FindValues();

  paramKey: number;

  conditionSuspensiveDecaissementsList: Array<ConditionSuspensiveDecaissement> = [];
  conditionsuspensiveList: Array<ConditionSuspensiveAccord> = [];
  ressourcesExterieureList: Array<RessourceExterieure> = [];
  localisationList: Array<Localisation> = [];

  ressourceExterieure: RessourceExterieure = null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorage,
              private modalService: NzModalService,
              private envergureService: EnvergureService,
              private axeprioritaireService: AxePrioritaireService,
              private niveaumaturiteService: NiveauMaturiteService,
              private soussecteurService: SousSecteurService,
              private naturefinancementService: NatureFinancementService,
              private typeressourceinterieureService: TypeRessourceInterieureService,
              private secteurService: SecteurService,
              private typeassistanceService: TypeAssistantService,
              private exerciceService: ExerciceService,
              private ressourceExeterieureService: RessourceExeterieureService,
              private cibleService: CibleService,
              private ptfService: PtfService,
              private regroupemementclubptfService: RegroupementClubPtfService,
              private categorieprojetService: CategorieProjetService,
              private structureService: StructureService,
              private projetProgrammeService: ProjetProgrammeService,
              private departementService: DepartementService,
              private arrondissementService: ArrondissementService,
              private communeService: CommuneService,
              private conditionSuspensiveDecaissementService: ConditionSuspensiveDecaissementService,
              private natureassistanceService: NatureAssistanceService,
              private conditionSuspensiveAccordService: ConditionSuspensiveAccordService,
              private message: NzMessageService,
              private devisemonaieService: DeviseMonaieService,
              private typecooperationService: TypeCooperationService,
              private activeRoute: ActivatedRoute,
              private localisationService: LocalisationService,
              private grandsecteurService: GrandSecteurService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.getCibleList();
    this.getNiveauMaturiteList();
    this.getPTFList();
    //this.getSecteurList();
    this.getStructureList();
    this.getListTypeCooperation();
    this.getListGrandSecteur();
    this.getListExercice();
    this.getListAxesPrioritaires();
    this.getListTypeRessourceInterieure();
    //this.getListSousSecteur();
    this.getListEnvergure();
    this.getListCategorieProjet();
    this.getListDevises();
    this.getListPtfs();
    this.getListNatureFinancement();
    this.getListNatureAssistance();
    this.getListTypeAssistance();
    this.getDepartementList();




    this.paramKey = this.activeRoute.snapshot.params['paramKey'];

    this.makeFormFond();

    this.projetProgrammeService.getById(this.paramKey).subscribe(
      (data: ProjetProgramme) => {

        this.projetSubmit = data;

        console.log(this.projetSubmit);

        this.ressourcesExterieureList = data.ressourceExterieures;
        this.conditionsuspensiveList = data.conditionSuspensiveAccords;
        this.conditionSuspensiveDecaissementsList = data.conditionSuspensiveDecaissements;
        this.localisationList = data.localisations;

        console.log(this.ressourcesExterieureList);
        console.log(this.conditionsuspensiveList);
        console.log(this.conditionSuspensiveDecaissementsList);
        console.log(this.localisationList);

        this.makeFormFond()
      });

      this.makeFormConditionSuspensiveDecaissement();
      this.makeFormConditionSuspensive();
      this.makeFormLocalisation();
      this.makeFormRessourceExterieure();

  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  modificationProjet(): void {
    if (this.validateFormProjetIdee.valid) {

      const formData = this.validateFormProjetIdee.value;
      if (formData.contrePartieNationale + formData.coutTotalRessourcesExterieures == formData.coutGlobalProjet) {

        const formData = this.validateFormProjetIdee.value;
        console.log(formData);

        this.projetSubmit.annee = this.findValues.getObjectInList(formData.annee, this.exerciceList);
        this.projetSubmit.axePrioritaires = this.findValues.getObjectListInList(formData.axePrioritaires, this.axeprioritaireList);
        this.projetSubmit.categorieProjet = this.findValues.getObjectInList(formData.categorieProjet, this.categorieprojetList);
        this.projetSubmit.cibles = this.findValues.getObjectListInList(formData.cibles, this.cibleList);
        this.projetSubmit.conditionSuspensiveAccords = this.conditionsuspensiveList;
        this.projetSubmit.contrePartieNationale = formData.contrePartieNationale;
        this.projetSubmit.coutGlobalProjet = formData.coutGlobalProjet;
        this.projetSubmit.coutTotalRessourcesExterieures = formData.coutTotalRessourcesExterieures;
        this.projetSubmit.createBy = this.user.username;
        this.projetSubmit.createdAt = null;
        this.projetSubmit.dateAchevementPrevue = formData.dateAchevementPrevue;
        this.projetSubmit.dateApprobation = formData.dateApprobation;
        this.projetSubmit.dateDemarrage = formData.dateDemarrage;
        this.projetSubmit.dateMiseEnVigueur = formData.dateMiseEnVigueur;
        this.projetSubmit.dateRactification = formData.dateRactification;
        this.projetSubmit.dateSignatureAccord = formData.dateSignatureAccord;
        this.projetSubmit.difficultes = formData.difficultes;
        this.projetSubmit.dureeAnnees = this.findValues.getObjectListInList(formData.dureeAnnees, this.exerciceList);
        this.projetSubmit.dureeProjet = formData.dureeProjet;
        this.projetSubmit.envergure = this.findValues.getObjectInList(formData.envergure, this.envergureList);
        this.projetSubmit.grandSecteur = this.findValues.getObjectInList(formData.grandSecteur, this.grandsecteurList);
        this.projetSubmit.libelle = formData.libelle;
        this.projetSubmit.localisations = this.localisationList;
        this.projetSubmit.nbreProrogation = formData.nbreProrogation;
        this.projetSubmit.niveaumaturite = this.findValues.getObjectInList(formData.niveaumaturite, this.niveaumaturiteList);
        this.projetSubmit.objectifgeneral = formData.objectifgeneral;
        this.projetSubmit.objectifs = formData.objectifs;
        this.projetSubmit.reference = formData.reference;
        this.projetSubmit.ressourceExterieures = this.ressourcesExterieureList;
        this.projetSubmit.ressourceInterieureAnnuelles = null;
        this.projetSubmit.secteur = this.findValues.getObjectInList(formData.secteur, this.secteurList);
        this.projetSubmit.sousSecteur = this.findValues.getObjectInList(formData.sousSecteur, this.soussecteurList);
        this.projetSubmit.structureAgenceExecution = this.findValues.getObjectListInList(formData.structureAgenceExecution, this.structureList);
        this.projetSubmit.structureSousTutelle = this.findValues.getObjectInList(formData.structureSousTutelle, this.structureList);
        this.projetSubmit.type = formData.categorieProjet != null ? formData.categorieProjet.libelle : '#N/A';
        this.projetSubmit.typeCooperations = this.findValues.getObjectListInList(formData.typeCooperation, this.typecooperationList);
        this.projetSubmit.typeRessourceInterieures = this.findValues.getObjectListInList(formData.typeRessourceInterieure, this.typeressourceinterieureList);
        this.projetSubmit.conditionSuspensiveDecaissements = this.conditionSuspensiveDecaissementsList;

        /*console.log(this.projetSubmit);
        console.log(this.ressourcesExterieureList);
        console.log(this.conditionsuspensiveList);
        console.log(this.conditionSuspensiveDecaissementsList);
        console.log(this.localisationList);*/
        this.projetProgrammeService.save(this.projetSubmit).subscribe(
          (data: ProjetProgramme) => {
            this.modalService.info({
              nzTitle: 'Information',
              nzContent: '<p> Le projet été modifié avec succès avec le numéro d\'identifiant : <strong>' + data.id +
                '</strong> dans la base des projets de l\'année : <strong>' + data.annee.libelle + '</strong></p>',
              nzOkText: null,
              nzCancelText: 'Ok',
              nzOnCancel: () => this.initialiseFormulaire()
            });
          },
          (error: HttpErrorResponse) => {
            //   this.router.navigate(['dashboard']);
            this.createMessage('error', 'Echec de l\'enregistrement du projet !');
          });

      } else {
        this.modalService.error({
          nzTitle: 'Erreur',
          nzContent: '<p> Les coûts des ressources intérieures et extérieures ne concordent pas avec le coût global' +
            ' du projet.</p>',
          nzOkText: null,
          nzCancelText: 'Ok',
          nzOnCancel: () => console.log(),
        });
      }
    } else {
      this.createMessage('error', 'Formulaire invalide !');
    }
  }

  initialiseFormulaire(): void {
    this.validateFormProjetIdee.reset();
    this.validateFormLocalisation.reset();
    this.validateFormRessourceExterieure.reset();
    this.validateFormConditionSuspensive.reset();
    this.localisationList = [];
    this.ressourcesExterieureList = [];
    this.conditionsuspensiveList = [];
    this.conditionSuspensiveDecaissementsList = [];
    this.ressourceExterieure = null;
  }

  getTotalMontantRessourceExterieure(): number {
    let montantRessource: number = 0;
    this.ressourcesExterieureList.forEach(r => {
      montantRessource += r.montantRessourceProgrammer;
    });
    return montantRessource;
  }

  enregistrerRessourceExterieure(): void {
    if (this.validateFormRessourceExterieure.valid) {

      const formData = this.validateFormRessourceExterieure.value;
	  
      if(this.ressourcesExterieureList.find(r => r.natureFinancement.id == formData.natureFinancement.id
      && r.ptfBailleurFrs.id == formData.ptfBailleurFrs.id)){
        this.modalService.error({
          nzTitle: 'Erreur',
          nzContent: '<p> Cette nature de financement est déjà introduite pour ce PTF',
          nzOkText: null,
          nzCancelText: 'Ok',
          nzOnCancel: () => console.log(),
        });
      }else{
      if (this.getTotalMontantRessourceExterieure() + formData.montantRessourceProgrammer <=
        this.validateFormProjetIdee.get('coutTotalRessourcesExterieures').value) {
        if (this.ressourceExterieure == null) {
          this.ressourceExterieure = new RessourceExterieure(null, null, null, null,
            null, null, null, null, null, null, null);
        }
        this.ressourceExterieure.montantRessourceProgrammer = formData.montantRessourceProgrammer;
        this.ressourceExterieure.natureFinancement = formData.natureFinancement;
        this.ressourceExterieure.ptfBailleurFrs = formData.ptfBailleurFrs;
        this.ressourceExterieure.deviseMonnaie = formData.deviseMonnaie;
        this.ressourceExterieure.montantRessourceDevise = formData.montantRessourceDevise;
        this.ressourceExterieure.natureAssistance = formData.natureAssistance;

        this.ressourcesExterieureList.unshift(this.ressourceExterieure);
        this.validateFormRessourceExterieure.reset();
        /*this.ressourceExeterieureService.saveAlone(ressource).subscribe(
          (data: RessourceExterieure) => {
            this.ressourcesExterieureList.unshift(data);
            this.validateFormRessourceExterieure.reset();
          },
          (error: HttpErrorResponse) => {
            //   this.router.navigate(['dashboard']);
            this.createMessage('error', 'Echec de l\'enregistrement de la ressource externe !');
          });*/
      } else {
        this.modalService.error({
          nzTitle: 'Erreur',
          nzContent: '<p> Les coûts totaux des ressources extérieures dépassent le total prévu pour le projet.</p>',
          nzOkText: null,
          nzCancelText: 'Ok',
          nzOnCancel: () => console.log(),
        });
      
	  }
    }
  }
}

  supprimerRessource(i: number, ressource: RessourceExterieure): void {
    if (ressource.id != null && ressource.id > 0) {
      this.ressourceExeterieureService.delete(ressource).subscribe(
        (data: RessourceExterieure) => {
          this.validateFormRessourceExterieure.reset();
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('error', 'Echec de l\'enregistrement du projet !');
        });
    }
    this.ressourcesExterieureList.splice(i, 1);
  }

  enregistrerLocalisation(): void {
    const formData = this.validateFormLocalisation.value;
    if (this.validateFormLocalisation.valid && formData.departement != null) {

      const localisation = new Localisation(null, formData.libelle, null, null,
        formData.departement, formData.commune, formData.arrondissement);
      this.localisationList.unshift(localisation);
      this.validateFormLocalisation.reset();
      /*this.localisationService.saveAlone(localisation).subscribe(
        (data: Localisation) => {
          this.localisationList.unshift(data);
          this.validateFormLocalisation.reset();
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('error', 'Echec de l\'enregistrement du projet !');
        });*/
    } else {
      this.createMessage('error', 'Formulaire invalide !');
    }
  }

  supprimerLocalisation(i: number, localisation: Localisation): void {
    if (localisation.id != null && localisation.id > 0) {
      this.localisationService.delete(localisation).subscribe(
        (data: Localisation) => {
          this.validateFormLocalisation.reset();
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('error', 'Echec de l\'enregistrement du projet !');
        });
    }
    this.localisationList.splice(i, 1);
  }


  makeDateDemmaragePrevue(): void {
    this.validateFormProjetIdee.get('dateDemarrage')
      .setValue(this.diminuerDeMois(this.validateFormProjetIdee.get('dateAchevementPrevue').value,
        this.validateFormProjetIdee.get('dureeProjet').value));
  }


  diminuerDeMois(date: Date, nbreMois): Date {
    var newDate = new Date(date);
    var thisMonth = newDate.getUTCMonth();
    newDate.setUTCMonth(thisMonth - nbreMois);
    return newDate;
  }
  
  supprimerCondition(i: number, condition: ConditionSuspensiveAccord): void {
    if (condition.id != null && condition.id > 0) {
      this.conditionSuspensiveAccordService.delete(condition).subscribe(
        (data: ConditionSuspensiveAccord) => {
          this.validateFormConditionSuspensive.reset();
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('error', 'Echec de l\'enregistrement du projet !');
        });
    }
    this.conditionsuspensiveList.splice(i, 1);
  }

  supprimerConditionSuspensiveDecaissement(i: number, condition: ConditionSuspensiveDecaissement): void {
    if (condition.id != null && condition.id > 0) {
      this.conditionSuspensiveDecaissementService.delete(condition).subscribe(
        (data: ConditionSuspensiveDecaissement) => {
          this.validateFormConditionSuspensiveDecaissement.reset();
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('error', 'Echec de l\'enregistrement du projet !');
        });
    }
    this.conditionSuspensiveDecaissementsList.splice(i, 1);
  }

  enregistrerConditionSuspensive(): void {
    if (this.validateFormConditionSuspensive.valid) {

      const formData = this.validateFormConditionSuspensive.value;
      const condition = new ConditionSuspensiveAccord(this.user.username, null, null,
        null, formData.libelle, null);
      this.conditionsuspensiveList.unshift(condition);
      this.validateFormConditionSuspensive.reset();
      /* this.conditionSuspensiveAccordService.saveAlone(condition).subscribe(
         (data: ConditionSuspensiveAccord) => {
           this.conditionsuspensiveList.unshift(data);
           this.validateFormConditionSuspensive.reset();
         },
         (error: HttpErrorResponse) => {
           //   this.router.navigate(['dashboard']);
           this.createMessage('error', 'Echec de l\'enregistrement du projet !');
         });*/
    }
  }

  enregistrerConditionSuspensiveDecaissement(): void {
    if (this.validateFormConditionSuspensiveDecaissement.valid) {

      const formData = this.validateFormConditionSuspensiveDecaissement.value;
      const condition = new ConditionSuspensiveDecaissement(this.user.username, null, formData.etat,
        null, formData.libelle, null);
      this.conditionSuspensiveDecaissementsList.unshift(condition);
      this.validateFormConditionSuspensiveDecaissement.reset();
      /*this.conditionSuspensiveDecaissementService.saveAlone(condition).subscribe(
        (data: ConditionSuspensiveDecaissement) => {
          this.conditionSuspensiveDecaissementsList.unshift(data);
          this.validateFormConditionSuspensiveDecaissement.reset();
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('error', 'Echec de l\'enregistrement du projet !');
        });*/
    }
  }

  /*Réalisation des formulaires*/

  makeFormRessourceExterieure(): void {
    this.validateFormRessourceExterieure = this.fb.group({
      ptfBailleurFrs: [null, [Validators.required,]],
      montantRessourceProgrammer: [0, [Validators.required, Validators.min(0)]],
      montantRessourceDevise: [0, [Validators.required, Validators.min(0)]],
      deviseMonnaie: [null, [Validators.required,]],
      natureAssistance: [null],
      natureFinancement: [null, [Validators.required,]],
    });
  }

  makeFormConditionSuspensive(): void {
    this.validateFormConditionSuspensive = this.fb.group({
      libelle: [null, [Validators.required,]],
    });
  }

  makeFormConditionSuspensiveDecaissement(): void {
    this.validateFormConditionSuspensiveDecaissement = this.fb.group({
      libelle: [null, [Validators.required,]],
      etat: [null, [Validators.required,]],
    });
  }

  makeFormLocalisation(): void {
    this.validateFormLocalisation = this.fb.group({
      libelle: [null,],
      departement: [null],
      commune: [null],
      arrondissement: [null],
    });
  }

  makeFormFond(): void {
    this.validateFormProjetIdee = this.fb.group({
      annee: [this.projetSubmit != null ? this.projetSubmit.annee.id : null,
      [Validators.required,]],
      objectifgeneral: [this.projetSubmit != null ? this.projetSubmit.objectifgeneral : null],
      reference: [this.projetSubmit != null ? this.projetSubmit.reference : null,
      [Validators.required,]],
      libelle: [this.projetSubmit != null ? this.projetSubmit.libelle : null,
      [Validators.required,]],
      difficultes: [this.projetSubmit != null ? this.projetSubmit.difficultes : null,],
      objectifs: [this.projetSubmit != null ? this.projetSubmit.objectifs : null,],
      dateDemarrage: [this.projetSubmit != null ? new Date(this.projetSubmit.dateDemarrage) : null,],
      dateAchevementPrevue: [this.projetSubmit != null ? new Date(this.projetSubmit.dateAchevementPrevue) : null,],
      nbreProrogation: [this.projetSubmit != null ? this.projetSubmit.nbreProrogation : null,],
      dureeAnnees: [this.projetSubmit != null ? this.findValues.getArrayId(this.projetSubmit.dureeAnnees) : null],
      dureeProjet: [this.projetSubmit != null ? this.projetSubmit.dureeProjet : null,],
      coutGlobalProjet: [this.projetSubmit != null ? this.projetSubmit.coutGlobalProjet : null,
      [Validators.required,]],
      typeRessourceInterieure: [this.projetSubmit != null ? this.findValues.getArrayId(this.projetSubmit.typeRessourceInterieures) : null,
      [Validators.required,]],  
      coutTotalRessourcesExterieures: [this.projetSubmit != null ? this.projetSubmit.coutTotalRessourcesExterieures : null],
      contrePartieNationale: [this.projetSubmit != null ? this.projetSubmit.contrePartieNationale : null],
      niveaumaturite: [this.projetSubmit != null ? this.projetSubmit.niveaumaturite.id : null],
      structureSousTutelle: [this.projetSubmit != null ? this.projetSubmit.structureSousTutelle.id : null,
      [Validators.required,]],
      structureAgenceExecution: [(this.projetSubmit != null && this.projetSubmit.structureAgenceExecution != null) ? this.findValues.getArrayId(this.projetSubmit.structureAgenceExecution) : null,
      [Validators.required,]],
      grandSecteur: [this.projetSubmit != null ? this.projetSubmit.grandSecteur.id : null,[Validators.required,]],
      envergure: [this.projetSubmit != null ? this.projetSubmit.envergure.id : null,[Validators.required,]],
      categorieProjet: [this.projetSubmit != null ? this.projetSubmit.categorieProjet.id : null,[Validators.required,]],
      secteur: [this.projetSubmit != null ? this.projetSubmit.secteur.id : null,[Validators.required,]],
      typeCooperation: [this.projetSubmit != null ? this.findValues.getArrayId(this.projetSubmit.typeCooperations) : null],
      sousSecteur: [this.projetSubmit != null ? this.projetSubmit.sousSecteur.id : null,[Validators.required,]],
      axePrioritaires: [this.projetSubmit != null ? this.findValues.getArrayId(this.projetSubmit.axePrioritaires) : null],
      cibles: [this.projetSubmit != null ? this.findValues.getArrayId(this.projetSubmit.cibles) : null],
    });
  }

  calculDureeProjet(elt: Array<any>): void {
    this.validateFormProjetIdee.get('dureeProjet').setValue(elt != null ? elt.length : 0);
  }

  grandSecteurChange(grandSecteur: GrandSecteur): void {
    if (grandSecteur != null) {
      this.secteurService.listByGrandSecteur(grandSecteur.id)
        .subscribe((data: Array<Secteur>) => {
          this.secteurList = data;
        }, err => {
          console.log(err);
        });
    }
  }

  secteurChange(secteur: SousSecteur): void {
    if (secteur != null) {
      this.soussecteurService.listBySecteur(secteur.id)
        .subscribe((data: Array<SousSecteur>) => {
          this.soussecteurList = data;
        }, err => {
          console.log(err);
        });
    }
  }

  departementChange(departement: Departement): void {
    if (departement != null) {
      this.communeService.listParDepartement(departement.id)
        .subscribe((data: Array<Commune>) => {
          this.communeList = data;
        }, err => {
          console.log(err);
        });
    }
  }

  communeChange(p: Commune): void {
    if (p != null) {
      this.arrondissementService.listParCommune(p.id)
        .subscribe((data: Array<Arrondissement>) => {
          this.arrondissementList = data;

        }, err => {
          console.log(err);
        });
    }
  }

  getListPtfs(): void {
    this.ptfService.list().subscribe(
      (data: Array<Ptf>) => {
        this.ptfList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getNiveauMaturiteList(): void {
    this.niveaumaturiteService.list().subscribe(
      (data: Array<NiveauMaturite>) => {
        this.niveaumaturiteList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListTypeRessourceInterieure(): void {
    this.typeressourceinterieureService.list().subscribe(
      (data: Array<TypeRessourceInterieure>) => {
        this.typeressourceinterieureList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListAxesPrioritaires(): void {
    this.axeprioritaireService.list().subscribe(
      (data: Array<AxePrioritaire>) => {
        this.axeprioritaireList = data;
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

  getListNatureFinancement(): void {
    this.naturefinancementService.list().subscribe(
      (data: Array<NatureFinancement>) => {
        this.naturefinancementList = data;
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

  getDepartementList(): void {
    this.departementService.list()
      .subscribe((data: Array<Departement>) => {
        this.departementList = data;
      }, err => {
        console.log(err);
      });
  }

  getListDevises(): void {
    this.devisemonaieService.list().subscribe(
      (data: Array<DeviseMonaie>) => {
        this.devisemonaieList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListTypeAssistance(): void {
    this.typeassistanceService.list().subscribe(
      (data: Array<TypeAssistance>) => {
        this.typeassistanceList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListGrandSecteur(): void {
    this.grandsecteurService.list().subscribe(
      (data: Array<GrandSecteur>) => {
        this.grandsecteurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListCategorieProjet(): void {
    this.categorieprojetService.list().subscribe(
      (data: Array<CategorieProjet>) => {
        this.categorieprojetList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListSousSecteur(): void {
    this.soussecteurService.list().subscribe(
      (data: Array<SousSecteur>) => {
        this.soussecteurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getStructureList(): void {
    this.structureService.list().subscribe(
      (data: Array<Structure>) => {
        this.structureList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListExercice(): void {
    this.exerciceService.list().subscribe(
      (data: Array<Exercice>) => {
        this.exerciceList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getSecteurList(): void {
    this.secteurService.list().subscribe(
      (data: Array<Secteur>) => {
        this.secteurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getCibleList(): void {
    this.cibleService.list().subscribe(
      (data: Array<Cible>) => {
        this.cibleList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getPTFList(): void {
    this.ptfService.list().subscribe(
      (data: Array<Ptf>) => {
        this.ptfList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListTypeCooperation(): void {
    this.typecooperationService.list().subscribe(
      (data: Array<TypeCooperation>) => {
        this.typecooperationList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

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

  makeDateCloturePrevue(): void {
    this.validateFormProjetIdee.get('dateAchevementPrevue')
      .setValue(this.augmenterDeMois(this.validateFormProjetIdee.get('dateDemarrage').value,
        this.validateFormProjetIdee.get('dureeProjet').value));
  }

  augmenterDeMois(date: Date, nbreMois): Date {
    var newDate = new Date(date);
    var thisMonth = newDate.getUTCMonth();
    newDate.setUTCMonth(thisMonth + nbreMois);
    return newDate;
  }

}
