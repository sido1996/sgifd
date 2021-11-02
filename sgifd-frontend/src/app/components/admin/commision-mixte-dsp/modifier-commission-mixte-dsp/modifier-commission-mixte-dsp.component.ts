import { Component, OnInit } from '@angular/core';
import { Ptf } from '../../../../models/Ptf';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Structure } from '../../../../models/Structure';
import { ProjetIdee } from '../../../../models/ProjetIdee';
import { Exercice } from '../../../../models/Exercice';
import { Secteur } from '../../../../models/Secteur';
import { DomainePTF } from '../../../../models/DomainePTF';
import { NiveauMaturite } from '../../../../models/NiveauMaturite';
import { ZoneLocalite } from '../../../../models/ZoneLocalite';
import { Pays } from '../../../../models/Pays';
import { TypeFondSpecifique } from '../../../../models/TypeFondSpecifique';
import { User } from '../../../../models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjetideeService } from '../../../../services/projetidee.service';
import { ExerciceService } from '../../../../services/exercice.service';
import { PtfService } from '../../../../services/ptf.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { SecteurService } from '../../../../services/secteur.service';
import { ZoneLocaliteService } from '../../../../services/zone-localite.service';
import { DomainePtfService } from '../../../../services/domaine-ptf.service';
import { PaysService } from '../../../../services/pays.service';
import { StructureService } from '../../../../services/structure.service';
import { NiveauMaturiteService } from '../../../../services/niveau-maturite.service';
import { FondSpecifiqueService } from '../../../../services/fond-specifique.service';
import { DepartementService } from '../../../../services/departement.service';
import { CommuneService } from '../../../../services/commune.service';
import { ArrondissementService } from '../../../../services/arrondissement.service';
import { TokenStorage } from '../../../../utils/token.storage';
import { TypeFondSpecifiqueService } from '../../../../services/type-fond-specifique.service';
import { PPP } from '../../../../models/PPP';
import { PPPService } from '../../../../services/ppp.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Departement } from '../../../../models/Departement';
import { Commune } from '../../../../models/Commune';
import { Arrondissement } from '../../../../models/Arrondissement';
import { Envergure } from '../../../../models/Envergure';
import { EnvergureService } from '../../../../services/envergure.service';
import { PilierPAG } from '../../../../models/PilierPAG';
import { PiliersPagService } from '../../../../services/piliers-pag.service';
import { FindValues } from '../../../../payload/FindValues';
import { SousSecteur } from '../../../../models/SousSecteur';
import { AxePrioritaire } from '../../../../models/AxePrioritaire';
import { ObjectifODD } from '../../../../models/ObjectifODD';
import { SousSecteurService } from '../../../../services/sous-secteur.service';
import { AxePrioritaireService } from '../../../../services/axe-prioritaire.service';
import { ObjectifOddService } from '../../../../services/objectif-odd.service';
import { CommissionMixteDspService } from '../../../../services/commission-mixte-dsp.service';
import { DeviseMonaie } from '../../../../models/DeviseMonaie';
import { DeviseMonaieService } from '../../../../services/devise-monaie.service';
import { AxePrioritaireCommission } from '../../../../models/AxePrioritaireCommission';
import {CommissionMixteDsp} from "../../../../models/CommissionMixteDsp";

@Component({
  selector: 'app-modifier-commission-mixte-dsp',
  templateUrl: './modifier-commission-mixte-dsp.component.html',
  styleUrls: ['./modifier-commission-mixte-dsp.component.css']
})
export class ModifierCommissionMixteDspComponent implements OnInit {
  validateFormCommissionMixteDsp: FormGroup;
  validateFormAxe: FormGroup;
  indexAxePrioritaire: number;

  ptfList: Array<Ptf> = [];
  institutionsPtf: Ptf = null;
  projetideeList: Array<ProjetIdee> = [];
  sousSecteurList: Array<SousSecteur> = [];
  domaineList: Array<DomainePTF> = [];
  deviseMonaieList: Array<DeviseMonaie> = [];
  axesPrioritaireList: Array<AxePrioritaire> = [];
  oddList: Array<ObjectifODD> = [];

  isVisibleModalProjetList: boolean = false;
  isVisibleModalZone: boolean = false;
  btnFermerText: string = 'Fermer';

  nombreAxes: number = null;

  user: User = null;
  filter: any;

  projetIdeesSubmit: Array<ProjetIdee> = [];
  axePrioritaireSubmit: Array<AxePrioritaireCommission> = [];
  commissionMixteDspSubmit: CommissionMixteDsp = null;
  axePrioritaire: AxePrioritaireCommission;

  paramKey: number;

  private findValues: FindValues = new FindValues();

  constructor(private fb: FormBuilder,
    private router: Router,
    private projetideeService: ProjetideeService,
    private ptfService: PtfService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private sousSecteurService: SousSecteurService,
    private DomainePTFService: DomainePtfService,
    private axePrioritaireService: AxePrioritaireService,
    private activeRoute: ActivatedRoute,
    private oddService: ObjectifOddService,
    private deviseMonaieService: DeviseMonaieService,
    private commissionMixteDspService: CommissionMixteDspService,
    private tokenStorage: TokenStorage, ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.indexAxePrioritaire = -1;
    this.getListDomaines();
    this.getListProjetIdee();
    this.getListPTF();
    this.getListSousSecteurs();
    this.getListAxePrioritaire();
    this.getListOdd();
    this.getListDevise();
    this.makeFormAxe();
    this.paramKey = this.activeRoute.snapshot.params['paramKey'];

    this.makeFormCommissionMixteDsp();

    this.commissionMixteDspService.getById(this.paramKey).subscribe(
      (data: CommissionMixteDsp) => {
        this.commissionMixteDspSubmit = data;
        this.projetIdeesSubmit = data.projetProgrammeIdees;
        this.axePrioritaireSubmit = data.axePrioritaireCommissions;
        console.log(this.axePrioritaireSubmit);
        this.makeFormCommissionMixteDsp();
      });

  }


  /* enregistrement d'un fon spécifique */
  enregistrerCommissionMixteDsp(): void {
    if (this.validateFormCommissionMixteDsp.valid && this.projetIdeesSubmit.length > 0) {

      const formData = this.validateFormCommissionMixteDsp.value;
      console.log(formData);

      this.commissionMixteDspSubmit.institutionsPtf = this.findValues.getObjectInList(formData.institutionsPtf, this.ptfList);
      this.commissionMixteDspSubmit.dateApprobation = formData.dateApprobation;
      this.commissionMixteDspSubmit.dateOrAnneeDebutPeriode = formData.dateOrAnneeDebutPeriode;
      this.commissionMixteDspSubmit.dateOrAnneeFinPeriode = formData.dateOrAnneeFinPeriode;
      this.commissionMixteDspSubmit.periodicite = formData.periodicite;
      this.commissionMixteDspSubmit.lieuDerniereCommission = formData.lieuDerniereCommission;
      this.commissionMixteDspSubmit.libelle = formData.libelle;
      this.commissionMixteDspSubmit.sousSecteurs = this.findValues.getObjectListInList(formData.sousSecteurs, this.sousSecteurList);
      this.commissionMixteDspSubmit.odd = this.findValues.getObjectListInList(formData.odd, this.oddList);
      this.commissionMixteDspSubmit.montantPrevisionnelDevise = formData.montantPrevisionnelDevise;
      this.commissionMixteDspSubmit.deviseMonnaie = this.findValues.getObjectInList(formData.deviseMonnaie, this.deviseMonaieList);
      this.commissionMixteDspSubmit.montantPrevisionnelFcfa = formData.montantPrevisionnelFcfa;
      this.commissionMixteDspSubmit.obligations = formData.obligations;
      this.commissionMixteDspSubmit.recommandation = formData.recommandation;
      this.commissionMixteDspSubmit.axePrioritaireCommissions = this.axePrioritaireSubmit;
      this.commissionMixteDspSubmit.projetProgrammeIdees = this.projetIdeesSubmit;
      this.commissionMixteDspSubmit.createBy = this.user.username;


      console.log(this.commissionMixteDspSubmit);

      this.commissionMixteDspService.save(this.commissionMixteDspSubmit).subscribe(
        (data: CommissionMixteDsp) => {
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<p> La commission Mixte Dsp,  <strong>'  +
              '</strong> de montant prévisionnel <strong>' + data.montantPrevisionnelFcfa + ' francs CFA </strong> a été ' +
              'enregistré avec succès.</p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () =>  this.router.navigate(['admin/commision-dsp/list-commission-mixte-dsp'])
          });
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('danger', 'Echec de l\'enregistrement de la Commission Mixte Dsp !');
        });
    } else {

    }
  }

  initialiseFormulaire(): void {
    this.validateFormCommissionMixteDsp.reset();
    this.projetIdeesSubmit = [];
    this.isVisibleModalProjetList = false;
  }


  handleCancel(): void {
    this.isVisibleModalProjetList = false;
  }

  /*fin enregistrement*/



  /* fin des choix*/

  /* les actions sur les projets jusqu'à l'enregistrement d'un nouveau projet */


  showModalProjetList(): void {
    this.isVisibleModalProjetList = true;
  }




  /* fin des actions sur les projets */

  /*Réalisation des formulaires*/
  makeFormCommissionMixteDsp(): void {
    this.validateFormCommissionMixteDsp = this.fb.group({
      institutionsPtf: [(this.commissionMixteDspSubmit != null) ? this.commissionMixteDspSubmit.institutionsPtf.id : null,
      [Validators.required,]],
      dateApprobation: [(this.commissionMixteDspSubmit != null) ? new Date(this.commissionMixteDspSubmit.dateApprobation) : null,
      [Validators.required,]],
      dateOrAnneeDebutPeriode: [(this.commissionMixteDspSubmit != null) ? this.commissionMixteDspSubmit.dateOrAnneeDebutPeriode : null,
      [Validators.required,]],
      dateOrAnneeFinPeriode: [(this.commissionMixteDspSubmit != null) ? this.commissionMixteDspSubmit.dateOrAnneeFinPeriode : null,
      [Validators.required,]],
      periodicite: [(this.commissionMixteDspSubmit != null) ? this.commissionMixteDspSubmit.periodicite : null,
      [Validators.required,]],
      lieuDerniereCommission: [(this.commissionMixteDspSubmit != null) ? this.commissionMixteDspSubmit.lieuDerniereCommission : null,
      [Validators.required,]],

      libelle: [null,],
      domaines: [null,],
      sousSecteurs: [(this.commissionMixteDspSubmit != null) ? this.findValues.getArrayId(this.commissionMixteDspSubmit.sousSecteurs) :
        null, [Validators.required,]],
      odd: [(this.commissionMixteDspSubmit != null) ? this.findValues.getArrayId(this.commissionMixteDspSubmit.odd) : null,
      [Validators.required,]],
      montantPrevisionnelDevise: [(this.commissionMixteDspSubmit != null) ? this.commissionMixteDspSubmit.montantPrevisionnelDevise : null,
      [Validators.required,  Validators.min(0)]],
      deviseMonnaie: [(this.commissionMixteDspSubmit != null) ? this.commissionMixteDspSubmit.deviseMonnaie.id : null,
      [Validators.required,]],
      montantPrevisionnelFcfa: [(this.commissionMixteDspSubmit != null) ? this.commissionMixteDspSubmit.montantPrevisionnelFcfa : null,
      [Validators.required,  Validators.min(0)]],
      obligations: [(this.commissionMixteDspSubmit != null) ? this.commissionMixteDspSubmit.obligations : null,],
      recommandation: [(this.commissionMixteDspSubmit != null) ? this.commissionMixteDspSubmit.recommandation : null,],
    });
  }

  makeFormAxe(): void {
    this.validateFormAxe = this.fb.group({
      libelle: [(this.axePrioritaire != null) ? this.axePrioritaire.libelle : null,
        [Validators.required,]],
      montantPrevisionnelDevise: [(this.axePrioritaire != null) ? this.axePrioritaire.montantPrevisionnelDevise : null,
        [Validators.required, Validators.min(0)]],
      deviseMonnaie: [(this.axePrioritaire != null) ? this.axePrioritaire.deviseMonnaie.id : null,
        [Validators.required,  Validators.min(0)]],
      montantPrevisionnelFcfa: [(this.axePrioritaire != null) ? this.axePrioritaire.montantPrevisionnelFcfa : null,
        [Validators.required,  Validators.min(0)]],
    });
  }

  /* fin formulaires */

  /*début obtention des listes */


  getListPTF(): void {
    this.ptfService.list().subscribe(
      (data: Array<Ptf>) => {
        this.ptfList = data;
        console.log(this.ptfList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListDomaines(): void {
    this.DomainePTFService.list().subscribe(
      (data: Array<DomainePTF>) => {
        this.domaineList = data;
        console.log(this.domaineList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListProjetIdee(): void {
    this.projetideeService.listGlobal().subscribe(
      (data: Array<ProjetIdee>) => {
        this.projetideeList = data;
        console.log(this.projetideeList)
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
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

  getListSousSecteurs() {
    this.sousSecteurService.list().subscribe(
      (data: Array<SousSecteur>) => {
        this.sousSecteurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListAxePrioritaire() {
    this.axePrioritaireService.list().subscribe(
      (data: Array<AxePrioritaire>) => {
        this.axesPrioritaireList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListOdd() {
    this.oddService.list().subscribe(
      (data: Array<ObjectifODD>) => {
        this.oddList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  enregistrerAxe() {


    if (this.validateFormAxe.valid) {
      const  formData = this.validateFormAxe.value;
      const axe : AxePrioritaireCommission = new AxePrioritaireCommission(null, formData.libelle,
        formData.montantPrevisionnelDevise, this.findValues.getObjectInList(formData.deviseMonnaie, this.deviseMonaieList),
        formData.montantPrevisionnelFcfa, this.user.username, null, )

        this.axePrioritaireSubmit.splice(this.indexAxePrioritaire, this.indexAxePrioritaire > -1 ? 1 : 0);


      this.axePrioritaireSubmit.unshift(axe);
      this.validateFormAxe.reset();
      this.indexAxePrioritaire = -1;
    } else {
      this.modalService.error({
        nzTitle: 'Erreur',
        nzContent: '<p> Echec.</p>',
        nzOkText: null,
        nzCancelText: 'Ok',
        nzOnCancel: () => console.log(),
      });
    }

  }

  annulerSelection(): void {
    this.axePrioritaire = null;
    this.indexAxePrioritaire = -1;
    this.makeFormAxe();
  }

  selectionnerAxe(axe: AxePrioritaireCommission, i: number): void {
    this.indexAxePrioritaire = i;
    this.axePrioritaire = axe;
    this.makeFormAxe();
  }

  enleverAxe(a: AxePrioritaireCommission) {
    this.axePrioritaireSubmit.splice(this.indexOfElement(a.id, this.axePrioritaireSubmit), 1);
  }

  /* fin des listes */

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


  /* action sur les changements de zones */

  calculNombreAxes(elt: Array<any>): void {
    this.nombreAxes = (elt != null) ? elt.length : 0;
  }



  choisirProjetIdee(p: ProjetIdee): void {
    let i = this.indexOfElement(p.id, this.projetIdeesSubmit);
    this.projetIdeesSubmit.splice(i, i > -1 ? 1 : 0);
    this.projetIdeesSubmit.unshift(p);

  }

  enleverProjetIdee(p: ProjetIdee): void {
    this.projetIdeesSubmit.splice(this.indexOfElement(p.id, this.projetIdeesSubmit), 1);
  }

  // Debut méthode format monnetaire
  formatNumber(num: number) : string{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  // Fin méthode format monnetaire
}
