import { Component, OnInit } from '@angular/core';
import { NiveauMaturite } from '../../../../models/NiveauMaturite';
import { HttpErrorResponse } from '@angular/common/http';
import { Structure } from '../../../../models/Structure';
import { Secteur } from '../../../../models/Secteur';
import { Cible } from '../../../../models/Cible';
import { Ptf } from '../../../../models/Ptf';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../../utils/token.storage';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { NiveauMaturiteService } from '../../../../services/niveau-maturite.service';
import { SecteurService } from '../../../../services/secteur.service';
import { CibleService } from '../../../../services/cible.service';
import { PtfService } from '../../../../services/ptf.service';
import { StructureService } from '../../../../services/structure.service';
import { ProjetideeService } from '../../../../services/projetidee.service';
import { User } from '../../../../models/User';
import { TypeCooperation } from '../../../../models/TypeCooperation';
import { Exercice } from '../../../../models/Exercice';
import { TypeCooperationService } from '../../../../services/type-cooperation.service';
import { GrandSecteurService } from '../../../../services/grand-secteur.service';
import { GrandSecteur } from '../../../../models/GrandSecteur';
import { AxePrioritaire } from '../../../../models/AxePrioritaire';
import { AxePrioritaireService } from '../../../../services/axe-prioritaire.service';
import { TypeRessourceInterieure } from '../../../../models/TypeRessourceInterieure';
import { TypeRessourceInterieureService } from '../../../../services/type-ressource-interieure.service';
import { SousSecteur } from '../../../../models/SousSecteur';
import { SousSecteurService } from '../../../../services/sous-secteur.service';
import { ExerciceService } from '../../../../services/exercice.service';
import { Envergure } from '../../../../models/Envergure';
import { EnvergureService } from '../../../../services/envergure.service';
import { CategorieProjet } from '../../../../models/CategorieProjet';
import { CategorieProjetService } from '../../../../services/categorie-projet.service';
import { RessourceExeterieureService } from '../../../../services/ressource-exeterieure.service';
import { ConditionSuspensiveAccord } from '../../../../models/ConditionSuspensiveAccord';
import { RegroupementClubPtf } from '../../../../models/RegroupementClubPtf';
import { RegroupementClubPtfService } from '../../../../services/regroupement-club-ptf.service';
import { DeviseMonaie } from '../../../../models/DeviseMonaie';
import { DeviseMonaieService } from '../../../../services/devise-monaie.service';
import { ConditionSuspensiveAccordService } from '../../../../services/condition-suspensive-accord.service';
import { TypeAssistance } from '../../../../models/TypeAssistance';
import { TypeAssistantService } from '../../../../services/type-assistant.service';
import { NatureFinancement } from '../../../../models/NatureFinancement';
import { NatureFinancementService } from '../../../../services/nature-financement.service';
import { NatureAssistance } from '../../../../models/NatureAssistance';
import { NatureAssistanceService } from '../../../../services/nature-assistance.service';
import { RessourceExterieure } from '../../../../models/RessourceExterieure';
import { Departement } from '../../../../models/Departement';
import { DepartementService } from '../../../../services/departement.service';
import { Commune } from '../../../../models/Commune';
import { Arrondissement } from '../../../../models/Arrondissement';
import { ArrondissementService } from '../../../../services/arrondissement.service';
import { CommuneService } from '../../../../services/commune.service';
import { Localisation } from '../../../../models/Localisation';
import { LocalisationService } from '../../../../services/localisation.service';
import { ProjetProgrammeService } from '../../../../services/projet-programme.service';
import { ProjetProgramme } from '../../../../models/ProjetProgramme';
import { ConditionSuspensiveDecaissement } from '../../../../models/ConditionSuspensiveDecaissement';
import { ConditionSuspensiveDecaissementService } from '../../../../services/condition-suspensive-decaissement.service';
import { ProrogationProjetService } from '../../../../services/prorogation-projet.service';
import { ProrogationProjet } from '../../../../models/ProrogationProjet';
import { RequetePtfService } from '../../../../services/requete-ptf.service';
import { FindValues } from '../../../../payload/FindValues';
import { ProjetFinance } from '../../../../models/adminPtf/ProjetFinance';
import {SearchProjetDoublonComponent} from "../../../shared/search-projet-doublon/search-projet-doublon.component";
import {ProjetProgrammeFinalise} from "../../../../models/ProjetProgrammeFinalise";
import {DocumentProgrammatique} from "../../../../models/document-programmatique";


interface ProjetFinancePTF {
  id: number;
  reference: string;
  libelle: string;
}

@Component({
  selector: 'app-nouveau-projet-ptf',
  templateUrl: './nouveau-projet-ptf.component.html',
  styleUrls: ['./nouveau-projet-ptf.component.css']
})
export class NouveauProjetPtfComponent implements OnInit {

  validateFormConditionSuspensive: FormGroup;
  validateFormConditionSuspensiveDecaissement: FormGroup;
  validateFormRessourceExterieure: FormGroup;
  validateFormProjetIdee: FormGroup;
  validateFormLocalisation: FormGroup;

  validateFormProrogationProjet: FormGroup;

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

  idP: number;

  btnTitle: string;

  p: ProjetFinancePTF = null;
  requeteList: Array<ProjetFinancePTF> = [];
  //requeteList[]
  reqList

  conditionSuspensiveDecaissementsList: Array<ConditionSuspensiveDecaissement> = [];
  conditionsuspensiveList: Array<ConditionSuspensiveAccord> = [];
  ressourcesExterieureList: Array<RessourceExterieure> = [];
  localisationList: Array<Localisation> = [];

  ressourceExterieure: RessourceExterieure = null;

  prorogationProjetSubmit: Array<ProrogationProjet> = [];
  documentProgrammatiqueList: Array<DocumentProgrammatique> = [];

  modifProro: boolean = false;

  projetSubmit: ProjetProgrammeFinalise = null;
  private findValues: FindValues = new FindValues();

  prorogationProjet: ProrogationProjet = null;

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

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
    private prorogationProjetService: ProrogationProjetService,
    private conditionSuspensiveDecaissementService: ConditionSuspensiveDecaissementService,
    private natureassistanceService: NatureAssistanceService,
    private conditionSuspensiveAccordService: ConditionSuspensiveAccordService,
    private message: NzMessageService,
    private devisemonaieService: DeviseMonaieService,
    private requetePtfService: RequetePtfService,
    private typecooperationService: TypeCooperationService,
    private localisationService: LocalisationService,
    private grandsecteurService: GrandSecteurService, ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(this.user);
    this.makeListeProjet()

    this.getCibleList();
    this.getNiveauMaturiteList();
    this.getPTFList();
    //this.getSecteurList();
    this.getStructureList();
    //this.getListTypeCooperation();
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

    this.makeFormFond();
    this.makeFormConditionSuspensiveDecaissement();
    this.makeFormConditionSuspensive();
    this.makeFormLocalisation();
    this.makeFormRessourceExterieure();
    this.makeFormProrogationProjet(null);
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  makeListeProjet(): void {
    this.requetePtfService.listProjetFinances().subscribe(
      (data) => {
        console.log(data);
        this.reqList = data;
        let i = 0;
        while (i < this.reqList.length) {
          this.requeteList.unshift({id: this.reqList[i][0], reference: this.reqList[i][1],
          libelle: this.reqList[i][2]});
          i++;
        }

        console.log(this.requeteList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  enregistrerProjet(): void {
    if (this.validateFormProjetIdee.valid) {

      const formData = this.validateFormProjetIdee.value;
      // if (formData.contrePartieNationale + formData.coutTotalRessourcesExterieures == formData.coutGlobalProjet) {
      console.log(this.projetSubmit);
      if (this.projetSubmit === null) {
        this.projetSubmit = new ProjetProgrammeFinalise();
      }
        // const projet = new ProjetProgramme(
        this.projetSubmit.annee = this.findValues.getObjectInList(formData.annee, this.exerciceList);
        this.projetSubmit.axePrioritaires = this.findValues.getObjectListInList(formData.axePrioritaires, this.axeprioritaireList);
        this.projetSubmit.categorieProjet = this.findValues.getObjectInList(formData.categorieProjet, this.categorieprojetList);
        this.projetSubmit.cibles = this.findValues.getObjectListInList(formData.cibles, this.cibleList);

        this.projetSubmit.createBy = this.user.username;

        this.projetSubmit.difficultes = formData.difficultes;

        this.projetSubmit.envergure = this.findValues.getObjectInList(formData.envergure, this.envergureList);
        //this.projetSubmit.grandSecteur = this.findValues.getObjectInList(formData.grandSecteur, this.grandsecteurList);

        this.projetSubmit.libelle = formData.libelle;
        this.projetSubmit.localisations = this.localisationList;
        this.projetSubmit.nbreProrogation = formData.nbreProrogation;
        //this.projetSubmit.niveaumaturite = this.findValues.getObjectInList(formData.niveaumaturite, this.niveaumaturiteList);
        this.projetSubmit.objectifgeneral = formData.objectifgeneral;
        this.projetSubmit.objectifs = formData.objectifs;
        this.projetSubmit.reference = formData.reference;
        this.projetSubmit.ressourceExterieures = this.ressourcesExterieureList;

        this.projetSubmit.structureAgenceExecution = formData.structureAgenceExecution;
        this.projetSubmit.structureSousTutelle = formData.structureSousTutelle;
        //this.projetSubmit.typeCooperations = this.findValues.getObjectListInList(formData.typeCooperation, this.typecooperationList);
        this.projetSubmit.typeRessourceInterieures = this.findValues.getObjectInList(formData.typeRessourceInterieure, this.typeressourceinterieureList);

        //this.projetSubmit.prorogationProjets = this.prorogationProjetSubmit;
        this.projetSubmit.solutionEnvisagee = formData.solutionEnvisagee;
        this.projetSubmit.realisationAudit = formData.realisationAudit;

        this.requetePtfService.save(this.projetSubmit).subscribe(
          (data: ProjetProgrammeFinalise) => {
            this.idP = data.id;
            this.initialiseFormulaire(this.idP);

          },
          (error: HttpErrorResponse) => {
            //   this.router.navigate(['dashboard']);
            this.createMessage('error', 'Echec de l\'enregistrement du projet !');
          });

      } else {
        this.createMessage('error', 'Formulaire invalide !');
      }
  }

  initialiseFormulaire(idP: number): void {
    this.validateFormProjetIdee.reset();
    this.validateFormLocalisation.reset();
    this.validateFormRessourceExterieure.reset();
    this.validateFormConditionSuspensive.reset();
    this.localisationList = [];
    this.ressourcesExterieureList = [];
    this.conditionsuspensiveList = [];
    this.conditionSuspensiveDecaissementsList = [];
    this.prorogationProjetSubmit = [];
    this.prorogationProjet = null;
    this.ressourceExterieure = null;
    this.router.navigate(['admin-ptf/suivi-projet-ptf/' + idP]);
  }

  getTotalMontantRessourceExterieure(): number {
    let montantRessource: number = 0;
    this.ressourcesExterieureList.forEach(r => {
      montantRessource += r.montantRessourceProgrammer;
    });
    return montantRessource;
  }

  getTotalMontantRessourceExterieureDevise(): number {
    let montantRessource: number = 0;
    this.ressourcesExterieureList.forEach(r => {
      montantRessource += r.montantRessourceDevise;
    });
    return montantRessource;
  }

  enregistrerRessourceExterieure(): void {
    if (this.validateFormRessourceExterieure.valid) {

      const formData = this.validateFormRessourceExterieure.value;
      if(this.ressourcesExterieureList.find(r => r.natureFinancement.id == formData.natureFinancement.id        )){
          this.modalService.error({
            nzTitle: 'Erreur',
            nzContent: '<p> Cette nature de financement est déjà introduite',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => console.log(),
          });
        }else{

      const ressource: RessourceExterieure = new RessourceExterieure(null, null, null, null,
        null, null, null, null, null, null, null);

      ressource.montantRessourceProgrammer = formData.montantRessourceProgrammer;
      ressource.natureFinancement = formData.natureFinancement;
      ressource.ptfBailleurFrs = this.user.ptf;
      ressource.deviseMonnaie = formData.deviseMonnaie;
      ressource.montantRessourceDevise = formData.montantRessourceDevise;
      ressource.natureAssistance = formData.natureAssistance;

      this.ressourcesExterieureList.unshift(ressource);
      this.ressourcesExterieureList = [...this.ressourcesExterieureList];
      this.validateFormRessourceExterieure.reset();

    }
    }
  }


  //metode blur sur ref
  chargerProjetByRef() {
    let ref = this.validateFormProjetIdee.get('reference').value;
    //let ref = this.validateFormProjetIdee.markAsUntouched;
    this.requetePtfService.getProjetByRef(ref).subscribe(
      (data: ProjetProgrammeFinalise) => {

        console.log(data);

        if (data == null) {
          this.modalService.error({
            nzTitle: 'Erreur',
            nzContent: '<p> Aucun projet ne porte cette référence <b>' + ref + '</b>.</p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => console.log(),
          });
        }else{
        this.projetSubmit = data;
        /* this.grandSecteurChange(this.projetSubmit.grandSecteur.id);
        this.secteurChange(this.projetSubmit.secteur.id); */
        this.conditionSuspensiveDecaissementsList = data.conditionSuspensiveDecaissements;
        this.conditionsuspensiveList = data.conditionSuspensiveAccords;
        this.ressourcesExterieureList = data.ressourceExterieures;
        this.localisationList = data.localisations;
        this.prorogationProjetSubmit = data.prorogationProjets;
        this.makeFormFond();
      }

      },
      (error: HttpErrorResponse) => {
        //   this.router.navigate(['dashboard']);
        this.createMessage('error', 'Echec de l\'enregistrement du projet !');
      });
  }



//get projet by idP
getProjet() {
  this.requetePtfService.getDetailProjetFinancesByIdP(this.p.id).subscribe(
    (data: ProjetProgrammeFinalise) => {
      console.log(data);

      if (data == null) {
        this.modalService.error({
          nzTitle: 'Erreur',
          nzContent: '<p> Aucun projet ne porte le numéro d\'enregistrement <b>' + this.p.id + '</b>.</p>',
          nzOkText: null,
          nzCancelText: 'Ok',
          nzOnCancel: () => console.log(),
        });
      }else{
        this.initialiseProjetToForm(data);
    }

    },
    (error: HttpErrorResponse) => {
      //   this.router.navigate(['dashboard']);
      this.createMessage('error', 'Echec de l\'enregistrement du projet !');
    });
}

initialiseProjetToForm(data: ProjetProgrammeFinalise): void {
  this.projetSubmit = data;

  this.conditionSuspensiveDecaissementsList = data.conditionSuspensiveDecaissements;
  this.conditionsuspensiveList = data.conditionSuspensiveAccords;
  this.ressourcesExterieureList = [];
  console.log(data.ressourceExterieures);
  if(data.ressourceExterieures != null && data.ressourceExterieures.length > 0) {
    data.ressourceExterieures.forEach(rprojet => {
      console.log(rprojet);
      if(rprojet.ptfBailleurFrs.id == this.user.ptf.id) {
        this.ressourcesExterieureList.unshift(rprojet);
      }
    });
  }
  this.ressourcesExterieureList = [...this.ressourcesExterieureList];
  this.localisationList = data.localisations;
  console.log(this.ressourcesExterieureList);
  this.prorogationProjetSubmit = data.prorogationProjets;
  this.makeFormFond();
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

  annulerProrogationProjet() {
    this.validateFormProrogationProjet.reset();
    this.btnTitle = 'Enregistrer';
  }


  enregistrerProrogationProjet(): void {
    const formData = this.validateFormProrogationProjet.value;
    if (this.prorogationProjet == null) {
      this.prorogationProjet = new ProrogationProjet(
        null,
        formData.motif,
        formData.dateDebut,
        formData.dateFin,
        formData.nbreMois,
        this.user.username,
        null);
    } else {
      this.prorogationProjet.motif = formData.motif;
      this.prorogationProjet.dateDebut = formData.dateDebut;
      this.prorogationProjet.dateFin = formData.dateFin;
      this.prorogationProjet.nbreMois = formData.nbreMois;
      this.prorogationProjet.createBy = this.user.username;
    }
    console.log(this.prorogationProjet);
    if (this.checkDoublonElementProrogationProjet(this.prorogationProjet) === false) {


      this.prorogationProjetSubmit.unshift(this.prorogationProjet);
      this.validateFormProjetIdee.get('nbreProrogation')
        .setValue(this.prorogationProjetSubmit.length);
      this.prorogationProjet = null;
      this.btnTitle = 'Enregistrer';
      this.modifProro = false;
      this.validateFormProrogationProjet.reset();

    } else {

      if (this.modifProro) {
        this.prorogationProjetSubmit.splice(this.indexOfElementProrogationProjet(this.prorogationProjet), 1);
        this.prorogationProjetSubmit.unshift(this.prorogationProjet);
        this.validateFormProjetIdee.get('nbreProrogation')
          .setValue(this.prorogationProjetSubmit.length);
        this.prorogationProjet = null;
        this.btnTitle = 'Enregistrer';
        this.modifProro = false;
        this.validateFormProrogationProjet.reset();
      } else {
        this.modalService.error({
          nzTitle: 'Erreur',
          nzContent: '<p> La période allant du ' + this.prorogationProjet.dateDebut + ' à ' + this.prorogationProjet.dateFin +
            ', a déjà été asociée à une prorogation.</p>' +
            '<p> Voulez-vous redéfinir la prorogation ?</p>',
          nzOkText: 'oui',
          nzCancelText: 'non',
          nzOnCancel: () => console.log(),
          nzOnOk: () => this.redéfinirProrogationProjet(),
        });
      }

    }

  }



  redéfinirProrogationProjet() {
    let i = this.indexOfElementProrogationProjet(this.prorogationProjet);
    this.prorogationProjetSubmit.splice(i, 1);
    this.prorogationProjetSubmit.unshift(this.prorogationProjet);
    this.validateFormProjetIdee.get('nbreProrogation')
      .setValue(this.prorogationProjetSubmit.length);
    this.prorogationProjet = null;
    this.btnTitle = 'Enregistrer';
    this.modifProro = false;
    this.validateFormProrogationProjet.reset();
  }




  modifierProrogationProjet(prorogationProjet: ProrogationProjet) {
    this.makeFormProrogationProjet(prorogationProjet);
    this.btnTitle = 'Modifier';
    this.modifProro = true;
  }



  enleverProrogationProjet(p: ProrogationProjet): void {
    this.prorogationProjetSubmit.splice(this.indexOfElementProrogationProjet(p), 1);
    this.validateFormProjetIdee.get('nbreProrogation')
      .setValue(this.prorogationProjetSubmit.length);
  }




  /*Réalisation des formulaires*/


  makeFormProrogationProjet(prorogationProjet: ProrogationProjet): void {
    this.validateFormProrogationProjet = this.fb.group({
      motif: [(prorogationProjet != null) ? prorogationProjet.motif : null,
      [Validators.required]],
      dateDebut: [(prorogationProjet != null) ? prorogationProjet.dateDebut : null,
      [Validators.required,]],
      nbreMois: [(prorogationProjet != null) ? prorogationProjet.nbreMois : null,
      [Validators.required]],
      dateFin: [(prorogationProjet != null) ? prorogationProjet.dateFin : null,
      [Validators.required,]],
    });
    this.prorogationProjet = prorogationProjet;
  }

  makeFormRessourceExterieure(): void {
    this.validateFormRessourceExterieure = this.fb.group({
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
      annee: [(this.projetSubmit != null && this.projetSubmit.annee != null) ? this.projetSubmit.annee.id : null,
      [Validators.required,]],
      objectifgeneral: [(this.projetSubmit != null) ? this.projetSubmit.objectifgeneral : null,
      [Validators.required,]],
      reference: [(this.projetSubmit != null) ? this.projetSubmit.reference : null,
      [Validators.required,]],
      libelle: [(this.projetSubmit != null) ? this.projetSubmit.libelle : null
        , [Validators.required,]],
      difficultes: [(this.projetSubmit != null) ? this.projetSubmit.difficultes : null,],
      solutionEnvisagee: [(this.projetSubmit != null) ? this.projetSubmit.solutionEnvisagee : null,],
      realisationAudit: [(this.projetSubmit != null) ? this.projetSubmit.realisationAudit : null,],
      objectifs: [(this.projetSubmit != null) ? this.projetSubmit.objectifs : null,],
      structureSousTutelle: [(this.projetSubmit != null && this.projetSubmit.structureSousTutelle != null) ? this.projetSubmit.structureSousTutelle : null,
      [Validators.required,]],
      structureAgenceExecution: [(this.projetSubmit != null && this.projetSubmit.structureAgenceExecution != null) ? this.projetSubmit.structureAgenceExecution : null,
      [Validators.required,]],
      envergure: [(this.projetSubmit != null && this.projetSubmit.envergure != null) ? this.projetSubmit.envergure.id : null,
      [Validators.required,]],
      categorieProjet: [(this.projetSubmit != null && this.projetSubmit.categorieProjet != null) ? this.projetSubmit.categorieProjet.id : null,
      [Validators.required,]],
      axePrioritaires: [(this.projetSubmit != null && this.projetSubmit.axePrioritaires != null) ?
        this.findValues.getArrayId(this.projetSubmit.axePrioritaires) : null],
      cibles: [(this.projetSubmit != null && this.projetSubmit.cibles != null) ?
        this.findValues.getArrayId(this.projetSubmit.cibles) : null],
      typeCooperations: [this.projetSubmit != null ? this.projetSubmit.typeCooperations : null,
        [Validators.required]],
      documentProgrammatique: [this.projetSubmit != null ? this.projetSubmit.documentProgrammatique : null,
        [Validators.required]],
    });

    this.reviewListDocprogramAndTypeCooper();
  }

  calculDureeProjet(elt: Array<any>): void {
    this.validateFormProjetIdee.get('dureeProjet').setValue(elt != null ? elt.length : 0);
  }

  /* grandSecteurChange(grandSecteur: GrandSecteur): void {
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
  } */


  grandSecteurChange(grandSecteur: number): void {
    if (grandSecteur != null) {
      this.secteurService.listByGrandSecteur(grandSecteur)
        .subscribe((data: Array<Secteur>) => {
          this.secteurList = data;
        }, err => {
          console.log(err);
        });
    }
  }

  secteurChange(secteur: number): void {
    console.log(secteur)
    if (secteur != null) {
      this.soussecteurService.listBySecteur(secteur)
        .subscribe((data: Array<SousSecteur>) => {
          this.soussecteurList = data;
          console.log(this.soussecteurList)
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
  // Debut méthode format monnetaire
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  // Fin méthode format monnetaire
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

  makeDateFin(): void {
    this.validateFormProrogationProjet.get('dateFin')
      .setValue(this.augmenterDeMois(this.validateFormProrogationProjet.get('dateDebut').value,
        this.validateFormProrogationProjet.get('nbreMois').value));
  }

  makeDateDemmaragePrevue(): void {
    this.validateFormProjetIdee.get('dateDemarrage')
      .setValue(this.diminuerDeMois(this.validateFormProjetIdee.get('dateAchevementPrevue').value,
        this.validateFormProjetIdee.get('dureeProjet').value));
  }

  makeDateDebut(): void {
    this.validateFormProrogationProjet.get('dateDebut')
      .setValue(this.diminuerDeMois(this.validateFormProrogationProjet.get('dateFin').value,
        this.validateFormProrogationProjet.get('nbreMois').value));
  }

  augmenterDeMois(date: Date, nbreMois): Date {
    var newDate = new Date(date);
    var thisMonth = newDate.getUTCMonth();
    newDate.setUTCMonth(thisMonth + nbreMois);
    return newDate;
  }

  diminuerDeMois(date: Date, nbreMois): Date {
    var newDate = new Date(date);
    var thisMonth = newDate.getUTCMonth();
    newDate.setUTCMonth(thisMonth - nbreMois);
    return newDate;
  }

  indexOfElementProrogationProjet(prorogationProjet: ProrogationProjet): number {
    let index = - 1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.prorogationProjetSubmit.length && rep === false) {
      if (this.prorogationProjetSubmit[i].dateDebut === prorogationProjet.dateDebut && this.prorogationProjetSubmit[i].dateFin === prorogationProjet.dateFin) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }


  checkDoublonElementProrogationProjet(prorogationProjet: ProrogationProjet): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.prorogationProjetSubmit.length && rep === false) {
      if (this.prorogationProjetSubmit[i].dateDebut === prorogationProjet.dateDebut && this.prorogationProjetSubmit[i].dateFin === prorogationProjet.dateFin) {
        rep = true;
      }
      i++;
    }
    return rep;
  }

  //gestion des doublons
  openDialogToSearchDoublon(): void {
    if (true) {
      const modal = this.modalService.create({
        nzTitle: 'Vérification de doublons',
        nzContent: SearchProjetDoublonComponent,
        nzWidth: 1000,
        nzClosable: false,
        nzStyle: {top: '50px'},
        nzComponentParams: {
          keyWordSearching: this.validateFormProjetIdee.value['libelle']
        },
        nzFooter: null
      });
      modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
      // Return a result when closed
      modal.afterClose.subscribe(result => {
        if (result != null) {
          this.initialiseProjetToForm(result);
        }
      });

    } else {
      this.modalService.error({
        nzTitle: 'Erreur',
        nzContent: 'Entrer un intitulé de projet valide !'
      });
    }
  }

  reviewListDocprogramAndTypeCooper(): void {
    this.typecooperationList = [];
    this.documentProgrammatiqueList = [];
    console.log(this.validateFormProjetIdee.value['structureSousTutelle']);
    const structureTutelle: Structure = this.validateFormProjetIdee.value['structureSousTutelle'];
    if (structureTutelle != null) {
      this.typecooperationList = structureTutelle.typestructure ? structureTutelle.typestructure.typeCooperationList : [];
      this.typecooperationList = this.typecooperationList != null ? [...this.typecooperationList] : [];
      this.documentProgrammatiqueList = structureTutelle.typestructure ? structureTutelle.typestructure.documentProgrammatiqueList : [];
      this.documentProgrammatiqueList =  this.documentProgrammatiqueList != null ? [...this.documentProgrammatiqueList] : [];
    }
  }

}
