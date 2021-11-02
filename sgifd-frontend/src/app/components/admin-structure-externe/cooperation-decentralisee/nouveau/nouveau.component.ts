import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Ptf } from '../../../../models/Ptf';
import { Structure } from '../../../../models/Structure';
import { ProjetIdee } from '../../../../models/ProjetIdee';
import { Exercice } from '../../../../models/Exercice';
import { Informateur } from '../../../../models/Informateur';
import { TypeCooperation } from '../../../../models/TypeCooperation';
import { DeviseMonaie } from '../../../../models/DeviseMonaie';
import { FindValues } from '../../../../payload/FindValues';
import { User } from '../../../../models/User';
import { NiveauMaturite } from '../../../../models/NiveauMaturite';
import { Secteur } from '../../../../models/Secteur';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeCooperationService } from '../../../../services/type-cooperation.service';
import { TokenStorage } from '../../../../utils/token.storage';
import { DeviseMonaieService } from '../../../../services/devise-monaie.service';
import { InformateurService } from '../../../../services/informateur.service';
import { NiveauMaturiteService } from '../../../../services/niveau-maturite.service';
import { SecteurService } from '../../../../services/secteur.service';
import { StructureService } from '../../../../services/structure.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { PtfService } from '../../../../services/ptf.service';
import { ExerciceService } from '../../../../services/exercice.service';
import { CooperationDecentralisee } from '../../../../models/CooperationDecentralisee';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { ProjetProgramme } from '../../../../models/ProjetProgramme';
import { ProjetProgrammeService } from '../../../../services/services-structure-externe/projet-programme.service';
import { CooperationDecentraliseeService } from '../../../../services/services-structure-externe/cooperation-decentralisee.service';

@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.component.html',
  styleUrls: ['./nouveau.component.css']
})
export class NouveauComponent implements OnInit {

  validateFormProjetIdee: FormGroup;
  validateFormCooperation: FormGroup;
  //validateFormInformateur: FormGroup;

  ptfList: Array<Ptf> = [];
  structureList: Array<Structure> = [];
  projetideeList: Array<ProjetIdee> = [];
  exerciceList: Array<Exercice> = [];
  informateurList: Array<Informateur> = [];
  typecooperationList: Array<TypeCooperation> = [];
  deviseMonaieList: Array<DeviseMonaie> = [];
  btnTitle: string;

  isVisibleModalPtf: boolean = false;
  isVisibleModalStructure: boolean = false;
  isVisibleModalProjetNew: boolean = false;
  isVisibleModalProjeSoumistList: boolean = false;
  isVisibleModalProjeElustList: boolean = false;
  isVisibleInformateur: boolean = false;
  btnFermerText: string = 'Fermer';

  private findValues: FindValues = new FindValues();

  user: User = null;
  filter: any;

  ptfsSubmit: Array<Ptf> = [];
  informateur: Informateur = null;
  structureSubmit: Structure = null;
  projetIdeesSoumis: Array<ProjetIdee> = [];
  projetIdeesElus: Array<ProjetIdee> = [];

  niveaumaturiteList: Array<NiveauMaturite> = [];
  secteurList: Array<Secteur> = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projetProgrammeService: ProjetProgrammeService,
    private exerciceService: ExerciceService,
    private ptfService: PtfService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private structureService: StructureService,
    private secteurService: SecteurService,
    private niveaumaturiteService: NiveauMaturiteService,
    private informateurService: InformateurService,
    private deviseMonaieService: DeviseMonaieService,
    private tokenStorage: TokenStorage,
    private typecooperationService: TypeCooperationService,
    private cooperationDecentraliseeService: CooperationDecentraliseeService, ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.rechercheInformateur();
    this.getListExercice();
    this.getListProjetIdee();
    this.getListPTF();
    this.getListStructure();
    this.getListTypeCoopration();
    this.getListInformateur();
    this.getListDevise();
    this.getNiveauMaturiteList();
    this.getListSecteurs();

    this.makeFormCooperation();
    this.makeFormProjetIdee();
    this.structureSubmit = this.user.structureBeneficiaire;
    console.log(this.structureSubmit);
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
        console.log(this.informateur);
      }
      console.log(this.informateur);
      /* if (this.checkDoublonElementInformateur(this.informateur) === false) { */
        //this.communeList.unshift(this.commune);

        this.informateurService.save(this.informateur).subscribe(
          (data: Informateur) => {
            console.log(data);
            this.informateur = data;
            console.log(this.informateur);
            if (this.informateur.id != null) {
              this.informateurList.splice(this.indexOfElement(this.informateur.id, this.informateurList), 1);
            }
            this.informateurList.unshift(data);

            if (this.validateFormCooperation.valid && this.ptfsSubmit.length > 0) {

              const formData = this.validateFormCooperation.value;

              const cooperation = new CooperationDecentralisee(
                null,
                formData.reference,
                formData.libelle,
                formData.montantFcfa,
                formData.observations,
                formData.resultats,
                formData.defis,
                formData.difficultes,
                formData.exercice,
                this.informateur,
                null,
                this.ptfsSubmit,
                this.structureSubmit,
                this.projetIdeesElus,
                this.projetIdeesSoumis,
                this.user.username,
                null,
                formData.typeCooperation,
                formData.montantDevise,
                formData.deviseMonnaie,
              );

              console.log(cooperation);

              this.cooperationDecentraliseeService.save(cooperation).subscribe(
                (data: CooperationDecentralisee) => {
                  console.log(data);
                  this.modalService.info({
                    nzTitle: 'Information',
                    nzContent: '<p> La coopération décentralisée Réf. <strong>' + data.reference +
                      '</strong> pour un montant global de <strong>' + data.montant + ' francs CFA </strong> a été ' +
                      'enregistrée avec succès.</p>',
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
      /* } else {
        this.createMessage('danger', 'Doublon d\'enregistrement de l\'informateur !');
      } */
    } else {
      this.createMessage('danger', 'Formulaire de l\'informateur invalide !');
    }

  }

  initialiseFormulaire(): void {
    this.validateFormProjetIdee.reset();
    this.validateFormCooperation.reset();
    this.ptfsSubmit = [];
    this.projetIdeesSoumis = [];
    this.projetIdeesElus = [];
    this.structureSubmit = null;
    this.informateur = null;
    this.isVisibleModalPtf = false;
    this.isVisibleModalStructure = false;
    this.isVisibleModalProjetNew = false;
    this.isVisibleModalProjeElustList = false;
    this.isVisibleModalProjeSoumistList = false;
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

  errorStructure(): void {
    this.structureSubmit = null;
  }



  /*Réalisation des formulaires*/
  makeFormCooperation(): void {
    this.validateFormCooperation = this.fb.group({
      reference: [null, [Validators.required,]],
      libelle: [null, [Validators.required,]],
      typeCooperation: [null, [Validators.required,]],
      observations: [null],
      exercice: [null, [Validators.required,]],
      montantDevise: [null, [Validators.required,]],
      deviseMonnaie: [null, [Validators.required,]],
      montantFcfa: [null, [Validators.required,]],
      resultats: [null],
      defis: [null],
      difficultes: [null],
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

  supprimerProjetIdee(p: any): void {
    this.projetProgrammeService.delete(p).subscribe(
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
    this.projetProgrammeService.listGlobal().subscribe(
      (data: Array<ProjetProgramme>) => {
        this.projetideeList = data;
        console.log(this.projetideeList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListTypeCoopration(): void {
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

  getNiveauMaturiteList(): void {
    this.niveaumaturiteService.list().subscribe(
      (data: Array<NiveauMaturite>) => {
        this.niveaumaturiteList = data;
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

}
