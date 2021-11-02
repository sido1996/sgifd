import { RelanceRequeteFinancementService } from './../../../../services/relance-requete-financement.service';
import { ReponseRequeteFinancementService } from './../../../../services/reponse-requete-financement.service';
import {Component, OnInit} from '@angular/core';
import {NiveauMaturite} from "../../../../models/NiveauMaturite";
import {HttpErrorResponse} from "@angular/common/http";
import {Structure} from "../../../../models/Structure";
import {Secteur} from "../../../../models/Secteur";
import {Cible} from "../../../../models/Cible";
import {Ptf} from "../../../../models/Ptf";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {NiveauMaturiteService} from "../../../../services/niveau-maturite.service";
import {SecteurService} from "../../../../services/secteur.service";
import {CibleService} from "../../../../services/cible.service";
import {PtfService} from "../../../../services/ptf.service";
import {StructureService} from "../../../../services/structure.service";
import {ProjetideeService} from "../../../../services/projetidee.service";
import {User} from "../../../../models/User";
import {TypeCooperation} from "../../../../models/TypeCooperation";
import {Exercice} from "../../../../models/Exercice";
import {TypeCooperationService} from "../../../../services/type-cooperation.service";
import {GrandSecteurService} from "../../../../services/grand-secteur.service";
import {GrandSecteur} from "../../../../models/GrandSecteur";
import {AxePrioritaire} from "../../../../models/AxePrioritaire";
import {AxePrioritaireService} from "../../../../services/axe-prioritaire.service";
import {TypeRessourceInterieure} from "../../../../models/TypeRessourceInterieure";
import {TypeRessourceInterieureService} from "../../../../services/type-ressource-interieure.service";
import {SousSecteur} from "../../../../models/SousSecteur";
import {SousSecteurService} from "../../../../services/sous-secteur.service";
import {ExerciceService} from "../../../../services/exercice.service";
import {Envergure} from "../../../../models/Envergure";
import {EnvergureService} from "../../../../services/envergure.service";
import {CategorieProjet} from "../../../../models/CategorieProjet";
import {CategorieProjetService} from "../../../../services/categorie-projet.service";
import {RessourceExeterieureService} from "../../../../services/ressource-exeterieure.service";
import {ConditionSuspensiveAccord} from "../../../../models/ConditionSuspensiveAccord";
import {RegroupementClubPtfService} from "../../../../services/regroupement-club-ptf.service";
import {DeviseMonaie} from "../../../../models/DeviseMonaie";
import {DeviseMonaieService} from "../../../../services/devise-monaie.service";
import {ConditionSuspensiveAccordService} from "../../../../services/condition-suspensive-accord.service";
import {TypeAssistance} from "../../../../models/TypeAssistance";
import {TypeAssistantService} from "../../../../services/type-assistant.service";
import {NatureFinancement} from "../../../../models/NatureFinancement";
import {NatureFinancementService} from "../../../../services/nature-financement.service";
import {NatureAssistance} from "../../../../models/NatureAssistance";
import {NatureAssistanceService} from "../../../../services/nature-assistance.service";
import {RessourceExterieure} from "../../../../models/RessourceExterieure";
import {Departement} from "../../../../models/Departement";
import {DepartementService} from "../../../../services/departement.service";
import {Commune} from "../../../../models/Commune";
import {Arrondissement} from "../../../../models/Arrondissement";
import {ArrondissementService} from "../../../../services/arrondissement.service";
import {CommuneService} from "../../../../services/commune.service";
import {Localisation} from "../../../../models/Localisation";
import {LocalisationService} from "../../../../services/localisation.service";
import {ProjetProgrammeService} from "../../../../services/projet-programme.service";
import {ProjetProgramme} from "../../../../models/ProjetProgramme";
import {ConditionSuspensiveDecaissement} from "../../../../models/ConditionSuspensiveDecaissement";
import {ConditionSuspensiveDecaissementService} from "../../../../services/condition-suspensive-decaissement.service";
import {ProrogationProjetService} from "../../../../services/prorogation-projet.service";
import {ProrogationProjet} from '../../../../models/ProrogationProjet';
import {ZoneLocalite} from '../../../../models/ZoneLocalite';
import {ZoneLocaliteService} from '../../../../services/zone-localite.service';
import {SecteurImpacte} from "../../../../models/SecteurImpacte";
import {ProjetProgrammeFinalise} from "../../../../models/ProjetProgrammeFinalise";
import {SecteurImpacteService} from "../../../../services/secteur-impacte.service";
import { RelanceRequeteFinancement } from '../../../../models/RelanceRequeteFinancement';
import { ReponseRequeteFinancement } from '../../../../models/ReponseRequeteFinancement';
import { RequeteFinancement } from '../../../../models/RequeteFinancement';
import { RequeteFinancementService } from '../../../../services/requete-financement.service';
import {SearchProjetDoublonComponent} from "../../../shared/search-projet-doublon/search-projet-doublon.component";
import {DocumentProgrammatique} from "../../../../models/document-programmatique";
import {ProjetProgrammeIdee} from "../../../../models/ProjetProgrammeIdee";

@Component({
  selector: 'app-nouvelle-requete',
  templateUrl: './nouvelle-requete.component.html',
  styleUrls: ['./nouvelle-requete.component.css']
})
export class NouvelleRequeteComponent implements OnInit {

  validateFormDonneesRequete: FormGroup;
  validateFormConditionSuspensive: FormGroup;
  validateFormConditionSuspensiveDecaissement: FormGroup;
  validateFormRessourceExterieure: FormGroup;
  validateFormProjetIdee_Etape1: FormGroup;
  validateFormProjetIdee_Etape2: FormGroup;
  validateFormProjetIdee_Etape3: FormGroup;
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
  exerciceListGenerer: Array<Exercice> = [];
  naturefinancementList: Array<NatureFinancement> = [];
  typeassistanceList: Array<TypeAssistance> = [];
  typeressourceinterieureList: Array<TypeRessourceInterieure> = [];
  soussecteurList: Array<SousSecteur> = [];
  natureassistanceList: Array<NatureAssistance> = [];
  communeList: Array<Commune> = [];
  arrondissementList: Array<Arrondissement> = [];
  zoneLocaliteList: Array<ZoneLocalite> = [];

  relances: Array<RelanceRequeteFinancement> = [];
  reponses: Array<ReponseRequeteFinancement> = [];

  requetefinancement: RequeteFinancement  = new RequeteFinancement();;

  user: User = null;
  filter: any;

  btnTitle: string;

  conditionSuspensiveDecaissementsList: ConditionSuspensiveDecaissement[] = [];
  conditionsuspensiveList: ConditionSuspensiveAccord[] = [];
  ressourceExterieureList: Array<RessourceExterieure> = new Array<RessourceExterieure>();
  localisationList: Localisation[] = [];
  secteurImpactes: SecteurImpacte[] = [];
  projetSubmit: ProjetProgrammeFinalise = new ProjetProgrammeFinalise();

  ressourceExterieure: RessourceExterieure = null;
  ressourceListe: RessourceExterieure[]= [];

  prorogationProjetSubmit: Array<ProrogationProjet> = [];
  modifProro: boolean = false;

  current = 0;
  prorogationProjet: ProrogationProjet = null;

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

  documentProgrammatiqueList: Array<DocumentProgrammatique> = [];

  paramKey: any = null;

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
              private zoneLocaliteService: ZoneLocaliteService,
              private communeService: CommuneService,
              private prorogationProjetService: ProrogationProjetService,
              private conditionSuspensiveDecaissementService: ConditionSuspensiveDecaissementService,
              private natureassistanceService: NatureAssistanceService,
              private conditionSuspensiveAccordService: ConditionSuspensiveAccordService,
              private message: NzMessageService,
              private reponseRequeteFinancementService: ReponseRequeteFinancementService,
              private relanceRequeteFinancementService: RelanceRequeteFinancementService,
              private devisemonaieService: DeviseMonaieService,
              private typecooperationService: TypeCooperationService,
              private localisationService: LocalisationService,
              private secteurImpacteService: SecteurImpacteService,
              private grandsecteurService: GrandSecteurService,
              private activeRoute: ActivatedRoute,
              private requeteFinancementService: RequeteFinancementService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.paramKey = this.activeRoute.snapshot.params['paramKey'];
    if(this.paramKey != null && this.paramKey != undefined && this.paramKey > 0) {
      this.requeteFinancementService.getById(this.paramKey).subscribe(
        (data: RequeteFinancement) => {
          console.log(data);
          if(data != null && data.isStatusClose == false) {
            let projetProgramme: ProjetProgrammeFinalise = data.projetProgrammeIdee;
            projetProgramme.ressourceExterieures = data.ressourceExterieures;
            this.tokenStorage.saveCurrentRequeteFinancement(data);
            this.tokenStorage.saveCurrentProjet(projetProgramme);
            this.makeFormFond();
          } else {
            this.router.navigate(['admin/requete-financement/list-requete']);
          }
        });
    }

    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
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
    //this.getZoneLocaliteList();

    this.makeFormFond();
    this.makeFormConditionSuspensiveDecaissement();
    this.makeFormConditionSuspensive();
    this.makeFormLocalisation();
    this.makeFormRessourceExterieure();
    this.makeFormProrogationProjet(null);

    console.log(this.ressourceExterieureList);
    console.log(this.ressourceListe);
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  initialiseFormulaire(): void {
    this.tokenStorage.saveCurrentProjet(null);
    this.tokenStorage.saveCurrentRequeteFinancement(null);
    if(this.requetefinancement.id > 0 && this.requetefinancement != null && this.requetefinancement.id != null) {
      this.router.navigate(['admin/requete-financement/list-requete']);
    } else {
      this.validateFormProjetIdee_Etape1.reset();
      this.validateFormProjetIdee_Etape2.reset();
      this.validateFormProjetIdee_Etape3.reset();
      this.validateFormLocalisation.reset();
      this.validateFormRessourceExterieure.reset();
      this.validateFormConditionSuspensive.reset();
      this.validateFormDonneesRequete.reset();
      this.localisationList = [];
      this.ressourceExterieureList = [];
      this.conditionsuspensiveList = [];
      this.conditionSuspensiveDecaissementsList = [];
      this.secteurImpactes = [];
      this.prorogationProjetSubmit = [];
      this.prorogationProjet = null;
      this.ressourceExterieure = null;
      this.current = 0;
    }
  }

  getTotalMontantRessourceExterieure(): number {
    let montantRessource: number = 0;
      this.ressourceExterieureList.forEach(r => {
        montantRessource += r.montantRessourceDevise;
      });
    return montantRessource;
  }

  enregistrerSecteurImpactes(): void {
    if (this.validateFormProjetIdee_Etape3.valid) {
      const formData = this.validateFormProjetIdee_Etape3.value;
      if (this.secteurImpactes.find(s => s.grandSecteur.id == formData.grandSecteur.id
        && s.secteur.id == formData.secteur.id) != null) {
        this.modalService.error({
          nzTitle: 'Erreur',
          nzContent: 'Doublon d\'enregistrement dans la table !',
          nzOkText: null,
          nzCancelText: 'Ok',
          nzOnCancel: () => console.log(),
        });
      } else {
        const secteurImpacte: SecteurImpacte = new SecteurImpacte();
        secteurImpacte.sousSecteur = formData.sousSecteur;
        secteurImpacte.grandSecteur = formData.grandSecteur;
        secteurImpacte.secteur = formData.secteur;

        this.validateFormProjetIdee_Etape3.reset();
        this.validateFormProjetIdee_Etape3.get('secteur').setValue(null);
        this.validateFormProjetIdee_Etape3.get('sousSecteur').setValue(null);
        this.secteurImpactes.unshift(secteurImpacte);
      }
    }
  }

  enregistrerRessourceExterieure(): void {
    if (this.validateFormRessourceExterieure.valid) {

      const formData = this.validateFormRessourceExterieure.value;
      if (this.ressourceExterieureList.find(r => r.natureFinancement.id == formData.natureFinancement.id
        && r.ptfBailleurFrs.id == formData.ptfBailleurFrs.id)) {
        this.modalService.error({
          nzTitle: 'Erreur',
          nzContent: 'Cette nature de financement est déjà introduite pour ce PTF',
          nzOkText: null,
          nzCancelText: 'Ok',
          nzOnCancel: () => console.log(),
        });
      } else {
        if (this.getTotalMontantRessourceExterieure() + formData.montantRessourceProgrammer <=
          this.validateFormProjetIdee_Etape1.get('coutTotalRessourcesExterieures').value) {

          const ressource: RessourceExterieure = new RessourceExterieure(null, null, null, null,
            null, null, null, null, null, null, null);

          ressource.montantRessourceProgrammer = formData.montantRessourceProgrammer;
          ressource.natureFinancement = formData.natureFinancement;
          ressource.ptfBailleurFrs = formData.ptfBailleurFrs;
          ressource.deviseMonnaie = formData.deviseMonnaie;
          ressource.montantRessourceDevise = formData.montantRessourceDevise;
          ressource.natureAssistance = formData.natureAssistance;

          this.ressourceExterieureList.unshift(ressource);
          this.validateFormRessourceExterieure.reset();

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

     this.reponseRequeteFinancementService.list(ressource.id).subscribe(
       (data: Array<ReponseRequeteFinancement>) => {
         this.reponses = data;
         console.log(this.reponses);
         if (this.reponses.length == 0) {

           this.relanceRequeteFinancementService.list(ressource.id).subscribe(
             (data: Array<RelanceRequeteFinancement>) => {
               this.relances = data;
               console.log(this.relances);
               if (this.relances.length == 0) {

                 this.ressourceExeterieureService.delete(ressource).subscribe(
                   (data: RessourceExterieure) => {
                     this.ressourceExterieureList.splice(i, 1);
                     this.validateFormRessourceExterieure.reset();
                   },
                   (error: HttpErrorResponse) => {
                     //   this.router.navigate(['dashboard']);
                     this.createMessage('error', 'Echec de l\'enregistrement du projet !');
                   });
                 //}
                 //this.ressourcesExterieureList.splice(i, 1);

               }else{
                 this.modalService.error({
                   nzTitle: 'Erreur',
                   nzContent: '<p> Impossible de supprimer une ressource extérieure ayant des relances ou des réponses.</p>',
                   nzOkText: null,
                   nzCancelText: 'Ok',
                   nzOnCancel: () => console.log(),
                 });
               }

             });

         } else{
           this.modalService.error({
             nzTitle: 'Erreur',
             nzContent: '<p> Impossible de supprimer une ressource extérieure ayant des relances ou des réponses.</p>',
             nzOkText: null,
             nzCancelText: 'Ok',
             nzOnCancel: () => console.log(),
           });
         }

       });

   }else{
     this.ressourceExterieureList.splice(i, 1);
   }
 }

  enregistrerLocalisation(): void {
    const formData = this.validateFormLocalisation.value;
    if (this.validateFormLocalisation.valid && formData.departement != null) {

      const localisation = new Localisation(null, formData.zoneLocalite, null, null,
        formData.departement, formData.commune, formData.arrondissement);
      this.localisationList.unshift(localisation);
      this.validateFormLocalisation.reset();

    } else {
      this.createMessage('error', 'Formulaire invalide !');
    }
  }

  supprimerSecteurImpacte(i, secteurImpacte: SecteurImpacte): void {
    if (secteurImpacte.id != null && secteurImpacte.id > 0) {
      this.secteurImpacteService.delete(secteurImpacte).subscribe(
        (data: Localisation) => {
          this.validateFormProjetIdee_Etape3.reset();
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('error', 'Echec de l\'enregistrement du secteur !');
        });

    }
    this.secteurImpactes.splice(i, 1);
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
    }
  }

  enregistrerConditionSuspensiveDecaissement(): void {
    if (this.validateFormConditionSuspensiveDecaissement.valid) {

      const formData = this.validateFormConditionSuspensiveDecaissement.value;
      const condition = new ConditionSuspensiveDecaissement(this.user.username, null, formData.etat,
        null, formData.libelle, null);
      this.conditionSuspensiveDecaissementsList.unshift(condition);
      this.validateFormConditionSuspensiveDecaissement.reset();

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

      this.prorogationProjet = null;
      this.btnTitle = 'Enregistrer';
      this.modifProro = false;
      this.validateFormProrogationProjet.reset();

    } else {

      if (this.modifProro) {
        this.prorogationProjetSubmit.splice(this.indexOfElementProrogationProjet(this.prorogationProjet), 1);
        this.prorogationProjetSubmit.unshift(this.prorogationProjet);

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
  }

  /*Réalisation des formulaires*/


  makeFormProrogationProjet(prorogationProjet: ProrogationProjet): void {
    this.validateFormProrogationProjet = this.fb.group({
      motif: [(prorogationProjet != null) ? prorogationProjet.motif : null,
        [Validators.required]],
      dateDebut: [(prorogationProjet != null) ? new Date(prorogationProjet.dateDebut) : null,
        [Validators.required,]],
      nbreMois: [(prorogationProjet != null) ? prorogationProjet.nbreMois : null,
        [Validators.required]],
      dateFin: [(prorogationProjet != null) ? new Date(prorogationProjet.dateFin) : null,
        [Validators.required,]],
    });
    this.prorogationProjet = prorogationProjet;
  }

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
      zoneLocalite: [null,],
      departement: [null],
      commune: [null],
      arrondissement: [null],
    });
  }

  makeFormFond(): void {

    if(this.tokenStorage.getCurrentProjet() != null &&
      (this.tokenStorage.getCurrentProjet().valide == false || this.tokenStorage.getCurrentProjet().id == null)) {
      this.projetSubmit = this.tokenStorage.getCurrentProjet();
    }
    if(this.tokenStorage.getCurrentRequeteFinancement() != null) {
      this.requetefinancement = this.tokenStorage.getCurrentRequeteFinancement();
    }

    this.validateFormProjetIdee_Etape1 = this.fb.group({
      annee: [this.projetSubmit != null ? this.projetSubmit.annee : null,
        [Validators.required,]],
      reference: [this.projetSubmit != null ? this.projetSubmit.reference : null,
        [Validators.required,]],
      envergure: [this.projetSubmit != null ? this.projetSubmit.envergure : null,
        [Validators.required,]],
      categorieProjet: [this.projetSubmit != null ? this.projetSubmit.categorieProjet : null,
        [Validators.required,]],
      libelle: [this.projetSubmit != null ? this.projetSubmit.libelle : null,
        [Validators.required,]],
      dateSignatureAccord: [this.projetSubmit != null && this.projetSubmit.dateSignatureAccord != null ?
        this.projetSubmit.dateSignatureAccord.substring(0, 10) : null],
      dateApprobation: [this.projetSubmit != null ? this.projetSubmit.dateApprobation : null],
      dateRactification: [this.projetSubmit != null ? this.projetSubmit.dateRactification : null],
      dateMiseEnVigueur: [this.projetSubmit != null ? this.projetSubmit.dateMiseEnVigueur : null],
      dateDemarrage: [this.projetSubmit != null && this.projetSubmit.dateDemarrage?
        this.projetSubmit.dateDemarrage.substring(0, 10) : null,
        [Validators.required,]],
      dateAchevementPrevue: [this.projetSubmit != null &&  this.projetSubmit.dateAchevementPrevue ?
        this.projetSubmit.dateAchevementPrevue.substring(0, 10) : null, [Validators.required,]],
      dureeAnnees: [this.projetSubmit != null ? this.projetSubmit.dureeAnnees : null,
        [Validators.required,]],
      dureeProjet: [this.projetSubmit != null ? this.projetSubmit.dureeProjet : 0,
        [Validators.required, Validators.min(0)]],
      axePrioritaires: [this.projetSubmit != null ? this.projetSubmit.axePrioritaires : null,
        [Validators.required,]],
      cibles: [this.projetSubmit != null ? this.projetSubmit.cibles : null,
        [Validators.required,]],
      niveaumaturite: [this.projetSubmit != null ? this.projetSubmit.niveaumaturite : null,
        [Validators.required,]],
      structureSousTutelle: [this.projetSubmit != null ? this.projetSubmit.structureSousTutelle : null,
        [Validators.required,]],
      structureAgenceExecution: [this.projetSubmit != null ? this.projetSubmit.structureAgenceExecution : null],
      coutGlobalProjet: [this.projetSubmit != null ? this.projetSubmit.coutGlobalProjet : 0,
        [Validators.required, Validators.min(0)]],
      typeRessourceInterieures: [this.projetSubmit != null ? this.projetSubmit.typeRessourceInterieures : null,
        [Validators.required,]],
      coutTotalRessourcesExterieures: [this.projetSubmit != null ? this.projetSubmit.coutTotalRessourcesExterieures : 0,
        [Validators.required, Validators.min(0)]],
      contrePartieNationale: [this.projetSubmit != null ? this.projetSubmit.contrePartieNationale : 0,
        [Validators.required, Validators.min(0)]],
      typeCooperations: [this.projetSubmit != null ? this.projetSubmit.typeCooperations : null,
        [Validators.required,]],
      documentProgrammatique: [this.projetSubmit != null ? this.projetSubmit.documentProgrammatique : null,
        [Validators.required]],
    });

    this.validateFormProjetIdee_Etape2 = this.fb.group({
      objectifgeneral: [this.projetSubmit != null ? this.projetSubmit.objectifgeneral : null,
        [Validators.required,]],
      objectifs: [this.projetSubmit != null ? this.projetSubmit.objectifs : null,],
      difficultes: [this.projetSubmit != null ? this.projetSubmit.difficultes : null],
      solutionEnvisagee: [this.projetSubmit != null ? this.projetSubmit.solutionEnvisagee : null],
      realisationAudit: [this.projetSubmit != null ? this.projetSubmit.realisationAudit : null],
    });

    this.validateFormProjetIdee_Etape3 = this.fb.group({
      grandSecteur: [null, [Validators.required,]],
      secteur: [null, [Validators.required,]],
      sousSecteur: [null],
    });

    if (this.projetSubmit != null) {
      this.secteurImpactes = this.projetSubmit.secteurImpactes != null ?
        this.projetSubmit.secteurImpactes : [];
      this.ressourceExterieureList = this.projetSubmit.ressourceExterieures != null ?
        this.projetSubmit.ressourceExterieures : [];
      this.prorogationProjetSubmit = this.projetSubmit.prorogationProjets != null ?
        this.projetSubmit.prorogationProjets: [];
      this.localisationList = this.projetSubmit.localisations != null ?
        this.projetSubmit.localisations: [];
      this.conditionSuspensiveDecaissementsList =  this.projetSubmit.conditionSuspensiveDecaissements != null ?
        this.projetSubmit.conditionSuspensiveDecaissements: [];
      this.conditionsuspensiveList = this.projetSubmit.conditionSuspensiveAccords != null ?
        this.projetSubmit.conditionSuspensiveAccords: [];
      this.reviewListDocprogramAndTypeCooper();
    }

    this.validateFormDonneesRequete = this.fb.group({
      dateMissionPreparation: [this.requetefinancement != null && this.requetefinancement.dateMissionPreparation ?
        this.requetefinancement.dateMissionPreparation.substring(0, 10) : null,],
      aideMemoireMission: [this.requetefinancement != null ? this.requetefinancement.aideMemoireMission : null,],
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
          this.validateFormProjetIdee_Etape3.get('secteur').setValue(null);
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
          this.validateFormProjetIdee_Etape3.get('sousSecteur').setValue(null);
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

  arrondissementChange(a: Arrondissement): void {
    if (a != null) {
      this.zoneLocaliteService.listParArrondissement(a.id)
        .subscribe((data: Array<ZoneLocalite>) => {
          this.zoneLocaliteList = data;

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

  getZoneLocaliteList(): void {
    this.zoneLocaliteService.list()
      .subscribe((data: Array<ZoneLocalite>) => {
        this.zoneLocaliteList = data;
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
    let nbreAnnee = Math.ceil(this.validateFormProjetIdee_Etape1.get('dureeProjet').value / 12);
    const dateFind: Date =
      this.augmenterDeMois(this.validateFormProjetIdee_Etape1.get('dateDemarrage').value,
        this.validateFormProjetIdee_Etape1.get('dureeProjet').value);
    const dateDebut: Date = new Date(this.validateFormProjetIdee_Etape1.get('dateDemarrage').value);
    console.log(nbreAnnee);
    console.log(dateDebut);
    if (dateDebut != null && dateFind != null) {
      let yearComptageDeb = dateDebut.getFullYear();
      let yearComptageFin = dateFind.getFullYear();
      console.log(yearComptageDeb);
      this.exerciceListGenerer = [];
      for (let i = yearComptageDeb; i <= yearComptageFin; i++) {
        console.log(i);
        if (this.exerciceList.find(e => e.libelle == i.toString()) != null) {
          this.exerciceListGenerer.push(this.exerciceList.find(e => e.libelle == i.toString()));
        }
      }
    }
    this.validateFormProjetIdee_Etape1.get('dateAchevementPrevue')
      .setValue(dateFind);
  }


  makeDateFin(): void {
    this.validateFormProrogationProjet.get('dateFin')
      .setValue(this.augmenterDeMois(this.validateFormProrogationProjet.get('dateDebut').value,
        this.validateFormProrogationProjet.get('nbreMois').value));
  }

  makeDateDemmaragePrevue(): void {
    this.validateFormProjetIdee_Etape1.get('dateDemarrage')
      .setValue(this.diminuerDeMois(this.validateFormProjetIdee_Etape1.get('dateAchevementPrevue').value,
        this.validateFormProjetIdee_Etape1.get('dureeProjet').value));
  }

  makeDateDebut(): void {
    this.validateFormProrogationProjet.get('dateDebut')
      .setValue(this.diminuerDeMois(this.validateFormProrogationProjet.get('dateFin').value,
        this.validateFormProrogationProjet.get('nbreMois').value));
  }

  augmenterDeMois(date: Date, nbreMois): Date {
    var newDate = new Date(date);
    var thisMonth = newDate.getUTCMonth();
    //var thisMonth = newDate.getUTCFullYear();
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
    let index = -1;
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

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  verifierDoublonByReference(): void {
    this.projetProgrammeService.verifierDoublonByReferenceRessource
    (this.validateFormProjetIdee_Etape1.get('reference').value.toString()).subscribe(
      (data: Array<ProjetProgramme>) => {
        if(data.length > 0) {
          this.modalService.error({
            nzTitle: 'Information',
            nzContent: '<p> La Référence : <strong>' + data[0].reference +
              '</strong> existe déjà pour un autre projet. ' +
              'Veuillez entrer une autre référence valide.</p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => this.validateFormProjetIdee_Etape1.get('reference').setValue(null)
          });
        }
      });
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.changeContent();
  }

  done(): void {
    if (this.projetSubmit.contrePartieNationale + this.projetSubmit.coutTotalRessourcesExterieures
      == this.projetSubmit.coutGlobalProjet) {

      console.log(this.projetSubmit);
      this.projetSubmit.ressourceExterieures = [];

      this.projetProgrammeService.saveFinal(this.projetSubmit).subscribe(
        (data: ProjetProgrammeFinalise) => {

          const formDataDonneesBase = this.validateFormDonneesRequete.value;
          this.requetefinancement.aideMemoireMission = formDataDonneesBase.aideMemoireMission;
          this.requetefinancement.createBy = this.user.username;
          this.requetefinancement.dateMissionPreparation = formDataDonneesBase.dateMissionPreparation;
          this.requetefinancement.ressourceExterieures = this.ressourceExterieureList;
          console.log(this.requetefinancement);

          this.requetefinancement.projetProgrammeIdee = data;

          this.requeteFinancementService.save(this.requetefinancement).subscribe(
            (data: RequeteFinancement) => {

          this.modalService.info({
                nzTitle: 'Information',
                nzContent: '<p> La requête de financement a été enrégistré avec succès au N°Enreg <strong>' + data.id +
                  '</strong> pour une solicitation d\'un montant global de <strong>' + data.projetProgrammeIdee.coutTotalRessourcesExterieures
                  + '</strong> francs cfa adressé aux partenaires .</p>',
                nzOkText: null,
                nzCancelText: 'Ok',
                nzOnCancel: () => this.initialiseFormulaire()
              });

            },
            (error: HttpErrorResponse) => {
              this.createMessage('danger', 'Echec de l\'enregistrement de la requête !');
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
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        if (this.validateFormProjetIdee_Etape1.valid) {
          this.projetSubmit = Object.assign(this.projetSubmit, this.validateFormProjetIdee_Etape1.value);
          console.log(this.validateFormProjetIdee_Etape1.value);

          console.log(this.projetSubmit);
          this.tokenStorage.saveCurrentProjet(this.projetSubmit);
          this.current += 1;
        } else {

          this.modalService.error({
            nzTitle: 'Erreur',
            nzContent: '<p> Formulaire invalide. Veuillez renseigner tous les champs obligatoires se terminant ' +
              ' par <b>(*)</b></p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => console.log(),
          });
        }

        break;
      }
      case 1: {
        if (this.validateFormProjetIdee_Etape2.valid) {
          this.projetSubmit = Object.assign(this.projetSubmit, this.validateFormProjetIdee_Etape2.value);
          console.log(this.projetSubmit);
          this.tokenStorage.saveCurrentProjet(this.projetSubmit);
          this.current += 1;
        } else {

          this.modalService.error({
            nzTitle: 'Erreur',
            nzContent: '<p> Formulaire invalide. Veuillez renseigner tous les champs obligatoires se terminant ' +
              ' par <b>(*)</b></p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => console.log(),
          });
        }
        break;
      }
      case 2: {
        if (this.secteurImpactes != null && this.secteurImpactes.length <= 0) {
          this.modalService.error({
            nzTitle: 'Erreur',
            nzContent: '<p> Veuillez renseigner le(s) secteur(s) impacté(s) par le projet.</p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => console.log(),
          });
        } else {
          this.projetSubmit.secteurImpactes = this.secteurImpactes;
          console.log(this.projetSubmit);
          this.tokenStorage.saveCurrentProjet(this.projetSubmit);
          this.current += 1;
        }
        break;
      }
      case 3: {
        if (this.projetSubmit.coutTotalRessourcesExterieures > 0
          && this.ressourceExterieureList.length <=0) {
          this.modalService.error({
            nzTitle: 'Erreur',
            nzContent: '<p> Veuillez renseigner le(s) financement(s) extérieurs(s) du projet.</p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => console.log(),
          });
        } else {
          this.projetSubmit.ressourceExterieures = this.ressourceExterieureList;
          console.log(this.projetSubmit);
          this.tokenStorage.saveCurrentProjet(this.projetSubmit);
          this.current += 1;
        }

        break;
      }
      case 4: {
        this.projetSubmit.conditionSuspensiveAccords = this.conditionsuspensiveList;
        console.log(this.projetSubmit);
        this.tokenStorage.saveCurrentProjet(this.projetSubmit);
        this.current += 1;
        break;
      }
      case 5: {
        this.projetSubmit.conditionSuspensiveDecaissements = this.conditionSuspensiveDecaissementsList;
        console.log(this.projetSubmit);
        this.tokenStorage.saveCurrentProjet(this.projetSubmit);
        this.current += 1;
        break;
      }
      case 6: {
        this.projetSubmit.localisations = this.localisationList;
        console.log(this.projetSubmit);
        this.tokenStorage.saveCurrentProjet(this.projetSubmit);
        this.current += 1;
        break;
      }
      case 7: {
        this.projetSubmit.prorogationProjets = this.prorogationProjetSubmit;
        console.log(this.projetSubmit);
        this.tokenStorage.saveCurrentProjet(this.projetSubmit);
        this.current += 1;
        break;
      }
      /* case 8: {
        const formDataDonneesBase = this.validateFormDonneesRequete.value;
        this.requetefinancement.aideMemoireMission = formDataDonneesBase.aideMemoireMission;
        this.requetefinancement.createBy = this.user.username;
        this.requetefinancement.dateMissionPreparation = formDataDonneesBase.dateMissionPreparation;
        console.log(this.requetefinancement);
        this.tokenStorage.saveCurrentRequeteFinancement(this.requetefinancement);
        this.current += 1;
        break;
      } */
      default: {

        this.current += 1;
      }
    }
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
          keyWordSearching: this.validateFormProjetIdee_Etape1.value['libelle']
        },
        nzFooter: null
      });
      modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
      // Return a result when closed
      modal.afterClose.subscribe((result: ProjetProgrammeFinalise) => {
        if (result != null) {
          if(result.valide == false) {
            this.tokenStorage.saveCurrentProjet(result);
            this.makeFormFond();
          } else {
            this.modalService.error({
              nzTitle: 'Erreur',
              nzContent: 'Ce projet a déjà passé l\'étape de requête de financement et est en cours de gestion !'
            });
          }
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
    console.log(this.validateFormProjetIdee_Etape1.value['structureSousTutelle']);
    const structureTutelle: Structure = this.validateFormProjetIdee_Etape1.value['structureSousTutelle'];
    if (structureTutelle != null) {
      this.typecooperationList = structureTutelle.typestructure ? structureTutelle.typestructure.typeCooperationList : [];
      this.typecooperationList = this.typecooperationList != null ? [...this.typecooperationList] : [];
      this.documentProgrammatiqueList = structureTutelle.typestructure ? structureTutelle.typestructure.documentProgrammatiqueList : [];
      this.documentProgrammatiqueList =  this.documentProgrammatiqueList != null ? [...this.documentProgrammatiqueList] : [];
    }
  }

}
