import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Ptf } from '../../../../models/Ptf';
import { Structure } from '../../../../models/Structure';
import { ProjetIdee } from '../../../../models/ProjetIdee';
import { Exercice } from '../../../../models/Exercice';
import { Informateur } from '../../../../models/Informateur';
import { DeviseMonaie } from '../../../../models/DeviseMonaie';
import { TypeCooperation } from '../../../../models/TypeCooperation';
import { NiveauMaturite } from '../../../../models/NiveauMaturite';
import { Secteur } from '../../../../models/Secteur';
import { CooperationDecentralisee } from '../../../../models/CooperationDecentralisee';
import { FindValues } from '../../../../payload/FindValues';
import { User } from '../../../../models/User';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjetideeService } from '../../../../services/projetidee.service';
import { ExerciceService } from '../../../../services/exercice.service';
import { PtfService } from '../../../../services/ptf.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { SecteurService } from '../../../../services/secteur.service';
import { PaysService } from '../../../../services/pays.service';
import { DomainePtfService } from '../../../../services/domaine-ptf.service';
import { StructureService } from '../../../../services/structure.service';
import { CommuneService } from '../../../../services/commune.service';
import { InformateurService } from '../../../../services/informateur.service';
import { NiveauMaturiteService } from '../../../../services/niveau-maturite.service';
import { DeviseMonaieService } from '../../../../services/devise-monaie.service';
import { TokenStorage } from '../../../../utils/token.storage';
import { ActivatedRoute } from '@angular/router';
import { TypeCooperationService } from '../../../../services/type-cooperation.service';
import { CooperationDecentraliseeService } from '../../../../services/cooperation-decentralisee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {

  validateFormProjetIdee: FormGroup;
  validateFormCooperation: FormGroup;
  ptfList: Array<Ptf> = [];
  structureList: Array<Structure> = [];
  projetideeList: Array<ProjetIdee> = [];
  exerciceList: Array<Exercice> = [];
  informateurList: Array<Informateur> = [];
  deviseMonaieList: Array<DeviseMonaie> = [];
  typecooperationList: Array<TypeCooperation> = [];

  niveaumaturiteList: Array<NiveauMaturite> = [];
  secteurList: Array<Secteur> = [];
  btnTitle: string;

  isVisibleModalPtf: boolean = false;
  isVisibleModalStructure: boolean = false;
  isVisibleModalProjetNew: boolean = false;
  isVisibleModalProjeSoumistList: boolean = false;
  isVisibleModalProjeElustList: boolean = false;
  isVisibleInformateur: boolean = false;
  btnFermerText: string = 'Fermer';

  user: User = null;
  filter: any;

  ptfsSubmit: Array<Ptf> = [];
  informateur: Informateur = null;
  structureSubmit: Structure = null;
  projetIdeesSoumis: Array<ProjetIdee> = [];
  projetIdeesElus: Array<ProjetIdee> = [];




  cooperationSubmit: CooperationDecentralisee = null;

  private findValues: FindValues = new FindValues();

  paramKey: number;

  constructor(private fb: FormBuilder,
    private router: Router,
    private projetideeService: ProjetideeService,
    private exerciceService: ExerciceService,
    private ptfService: PtfService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private secteurService: SecteurService,
    private paysService: PaysService,
    private DomainePTFService: DomainePtfService,
    private structureService: StructureService,
    private communeService: CommuneService,
    private informateurService: InformateurService,
    private niveaumaturiteService: NiveauMaturiteService,
    private deviseMonaieService: DeviseMonaieService,
    private tokenStorage: TokenStorage,
    private activeRoute: ActivatedRoute,
    private typecooperationService: TypeCooperationService,
    private cooperationDecentraliseeService: CooperationDecentraliseeService, ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getListExercice();
    this.getListProjetIdee();
    this.getListPTF();
    this.getListStructure();
    this.getListCoopration();
    this.getListInformateur();
    this.getListDevise();
    this.getNiveauMaturiteList();
    this.getListSecteurs();
    this.rechercheInformateur();

    this.paramKey = this.activeRoute.snapshot.params['paramKey'];
    this.makeFormCooperation();

    this.cooperationDecentraliseeService.getById(this.paramKey).subscribe(
      (data: CooperationDecentralisee) => {
        this.cooperationSubmit = data;
        this.ptfsSubmit = data.ptfBailleurFrs;
        this.structureSubmit = data.structureBeneficiaire;
        this.projetIdeesElus = data.projetsElus;
        this.projetIdeesSoumis = data.projetsSoumis;
        this.informateur = data.informateur;
        this.makeFormCooperation();

      });

    this.makeFormProjetIdee();

  }


  enregistrerCooperation(): void {

    if (this.validateFormCooperation.valid === true) {
      if (this.informateur == null) {
        this.informateur = new Informateur(
            null,
            this.user.lastName,
            this.user.firstName,
            this.user.tel,
            this.user.email,
            this.user.profession,
            this.user.username,
            null,
            this.user.structureBeneficiaire
            );
      } else {

      }
      console.log(this.informateur);
      if (this.checkDoublonElementInformateur(this.informateur) === false) {
        //this.communeList.unshift(this.commune);
        this.informateurService.save(this.informateur).subscribe(
          (data: Informateur) => {
            this.informateur = data;
            if (this.informateur.id != null) {
              this.informateurList.splice(this.indexOfElement(this.informateur.id, this.informateurList), 1);
            }
            this.informateurList.unshift(data);

            if (this.validateFormCooperation.valid && this.ptfsSubmit.length > 0
              && this.structureSubmit != null && this.projetIdeesElus.length > 0 && this.projetIdeesSoumis.length > 0) {

              const formData = this.validateFormCooperation.value;

              this.cooperationSubmit.reference = formData.reference;
              this.cooperationSubmit.libelle = formData.libelle;
              this.cooperationSubmit.montant = formData.montantFcfa;
              this.cooperationSubmit.observation = formData.observations;
              this.cooperationSubmit.resultats = formData.resultats;
              this.cooperationSubmit.defis = formData.defis;
              this.cooperationSubmit.difficultes = formData.difficultes;
              this.cooperationSubmit.exercice = this.findValues.getObjectInList(formData.exercice, this.exerciceList);
              this.cooperationSubmit.informateur = this.informateur;
              this.cooperationSubmit.ptfBailleurFrs = this.ptfsSubmit;
              this.cooperationSubmit.structureBeneficiaire = this.structureSubmit;
              this.cooperationSubmit.projetsElus = this.projetIdeesElus;
              this.cooperationSubmit.projetsSoumis = this.projetIdeesSoumis;
              this.cooperationSubmit.createBy = this.user.username;
              this.cooperationSubmit.typeCooperation = this.findValues.getObjectInList(formData.typeCooperation, this.typecooperationList);
              this.cooperationSubmit.montantDevise = formData.montantDevise;
              this.cooperationSubmit.deviseMonnaie = this.findValues.getObjectInList(formData.deviseMonnaie, this.deviseMonaieList);

              console.log(this.cooperationSubmit);

              this.cooperationDecentraliseeService.save(this.cooperationSubmit).subscribe(
                (data: CooperationDecentralisee) => {
                  this.modalService.info({
                    nzTitle: 'Information',
                    nzContent: '<p> La coopération décentralisée Réf. <strong>' + data.reference +
                      '</strong> pour un montant global de <strong>' + data.montant + ' francs CFA </strong> a été ' +
                      'modifiée avec succès.</p>',
                    nzOkText: null,
                    nzCancelText: 'Ok',
                    nzOnCancel: () => this.initialiseFormulaire()
                  });
                },
                (error: HttpErrorResponse) => {
                  //   this.router.navigate(['dashboard']);
                  this.createMessage('danger', 'Echec de l\'enregistrement de la coopération !');
                });
            } else {

            }
          },
          (error: HttpErrorResponse) => {
            //   this.router.navigate(['dashboard']);
            this.createMessage('danger', 'Echec de l\'enregistrement !');
          });
      } else {
        this.createMessage('danger', 'Doublon d\'enregistrement de l\'informateur !');
      }
    } else {
      this.createMessage('danger', 'Formulaire de l\'informateur invalide !');
    }

  }

  initialiseFormulaire(): void {
    this.router.navigate(['admin-structure-externe/cooperation-decentralisee-structure/list/']);
  }

  handleCancel(): void {
    //console.log('Button cancel clicked!');
    this.isVisibleModalPtf = false;
    this.isVisibleModalStructure = false;
    this.isVisibleModalProjetNew = false;
    this.isVisibleModalProjeElustList = false;
    this.isVisibleModalProjeSoumistList = false;
    this.isVisibleInformateur = false;
  }

  /*opérations sur la structure*/

  choisirUnPTF(p: Ptf): void {
    if (this.indexOfElement(p.id, this.ptfsSubmit) == -1) {
      this.ptfsSubmit.unshift(p);
    }
  }

  enleverPtf(p): void {
    this.ptfsSubmit.splice(this.indexOfElement(p.id, this.ptfsSubmit), 1);
  }

  showModalPtf(): void {
    this.isVisibleModalPtf = true;
  }

  showModalStructure(): void {
    this.isVisibleModalStructure = true;
  }



  /*Réalisation des formulaires*/
  makeFormCooperation(): void {
    this.validateFormCooperation = this.fb.group({
      reference: [this.cooperationSubmit != null ? this.cooperationSubmit.reference : null,
      [Validators.required,]],
      libelle: [this.cooperationSubmit != null ? this.cooperationSubmit.libelle : null,
      [Validators.required,]],
      typeCooperation: [this.cooperationSubmit != null && this.cooperationSubmit.typeCooperation != null ? this.cooperationSubmit.typeCooperation.id : null,
      [Validators.required,]],
      observations: [this.cooperationSubmit != null ? this.cooperationSubmit.observation : null,],
      exercice: [this.cooperationSubmit != null ? this.cooperationSubmit.exercice.id : null,
      [Validators.required,]],
      montantDevise: [this.cooperationSubmit != null ? this.cooperationSubmit.montantDevise : null,
      [Validators.required,]],
      deviseMonnaie: [this.cooperationSubmit != null && this.cooperationSubmit.deviseMonnaie != null ? this.cooperationSubmit.deviseMonnaie.id : null,
      [Validators.required,]],
      montantFcfa: [this.cooperationSubmit != null ? this.cooperationSubmit.montant : null,
      [Validators.required,]],
      resultats: [this.cooperationSubmit != null ? this.cooperationSubmit.resultats : null,],
      defis: [this.cooperationSubmit != null ? this.cooperationSubmit.defis : null,],
      difficultes: [this.cooperationSubmit != null ? this.cooperationSubmit.difficultes : null,],
    });
  }


  makeFormProjetIdee(): void {
    this.validateFormProjetIdee = this.fb.group({
      reference: [null, [Validators.required,]],
      libelle: [null, [Validators.required,]],
      dureeProjet: [null, [Validators.required,]],
      dureeAnnees: [null, [Validators.required,]],
      niveaumaturite: [null],
      secteur: [null, [Validators.required,]],
      objectifs: [null, [Validators.required,]],
      difficultes: [null],
    });
  }

  /* fin formulaires */


  /* les actions sur les projets jusqu'à l'enregistrement d'un nouveau projet */
  showModalProjetSoumis(): void {
    this.isVisibleModalProjeSoumistList = true;
  }

  showModalProjetNew(): void {
    this.isVisibleModalProjetNew = true;
  }

  handleCancelProjetNew(): void {
    this.isVisibleModalProjetNew = false;
  }

  showModalProjetElus(): void {
    this.isVisibleModalProjeElustList = true;
  }

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
        this.projetIdeesElus.splice(this.indexOfElement(p.id, this.projetideeList), 1);
        this.projetIdeesSoumis.splice(this.indexOfElement(p.id, this.projetideeList), 1);
        this.projetideeList.splice(this.indexOfElement(p.id, this.projetideeList), 1);
      },
      (error: HttpErrorResponse) => {
        //   this.router.navigate(['dashboard']);
        this.createMessage('danger', 'Echec de la suppression du projet !');
      });
  }

  ajouterProjetsSoumis(p: ProjetIdee): void {
    if (this.indexOfElement(p.id, this.projetIdeesSoumis) == -1) {
      this.projetIdeesSoumis.unshift(p);
    }
  }

  ajouterProjetsElus(p: ProjetIdee): void {
    if (this.indexOfElement(p.id, this.projetIdeesElus) == -1) {
      this.projetIdeesElus.unshift(p);
    }
  }

  enleverProjetElus(p: ProjetIdee): void {
    this.projetIdeesElus.splice(this.indexOfElement(p.id, this.projetIdeesElus), 1);
  }

  enleverProjetSoumis(p: ProjetIdee): void {
    //this.projetIdeesElus.splice(this.indexOfElement(p.id, this.projetideeList), 1);
    this.projetIdeesSoumis.splice(this.indexOfElement(p.id, this.projetIdeesSoumis), 1);
  }

  enregistrerProjetIdee(): void {
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
      let projet = new ProjetIdee(null, formData.libelle, formData.reference, formData.niveaumaturite,
        formData.secteur, formData.objectifs, formData.difficultes);
      projet.dureeAnnees = formData.dureeAnnees;
      projet.dureeProjet = formData.dureeProjet;
      console.log(projet);
      this.projetideeService.save(projet).subscribe(
        (data: ProjetIdee) => {
          this.projetideeList.unshift(data);
          this.projetIdeesSoumis.unshift(data);
          this.handleCancelProjetNew();
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('danger', 'Echec de l\'enregistrement du projet !');
        });
    }
  }

  calculDureeProjet(elt: Array<any>): void {
    this.validateFormProjetIdee.get('dureeProjet').setValue(elt != null ? elt.length : 0);
  }

  /* fin des actions sur les projets */

  /*début obtention des listes */


  getListExercice(): void {
    this.exerciceService.list().subscribe(
      (data: Array<Exercice>) => {
        this.exerciceList = data;
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

  getListStructure(): void {
    this.structureService.list().subscribe(
      (data: Array<Structure>) => {
        this.structureList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListInformateur(): void {
    this.informateurService.list().subscribe(
      (data: Array<Informateur>) => {
        this.informateurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }



  getListProjetIdee(): void {
    this.projetideeService.list().subscribe(
      (data: Array<ProjetIdee>) => {
        this.projetideeList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListCoopration(): void {
    this.typecooperationService.list().subscribe(
      (data: Array<TypeCooperation>) => {
        this.typecooperationList = data;
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

  checkDoublonElementInformateur(informateur: Informateur): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.informateurList.length && rep === false) {
      if (this.informateurList[i].tel === informateur.tel && this.informateurList[i].email === informateur.email &&
        this.informateurList[i].id != informateur.id) {
        rep = true;
      }
      i++;
    }
    return rep;
  }



  showModalInformateur(): void {
    //this.initFormAssistance();
    this.isVisibleInformateur = true;
  }

  handleOkInformateur(): void {
    console.log('Button ok clicked!');
    this.isVisibleInformateur = false;
  }

  gotoListCooperation() {
    this.router.navigate(['admin/cooperation-decentralisee/list-cooperation']);
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

  rechercheInformateur(): void {
    this.informateurService.rechercheInformateur().subscribe(
      (data: Informateur) => {
        this.informateur = data;
        console.log("===== data ========");
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
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

}
