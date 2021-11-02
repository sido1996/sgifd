import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Ptf } from "../../../../models/Ptf";
import { Structure } from "../../../../models/Structure";
import { ProjetIdee } from "../../../../models/ProjetIdee";
import { Exercice } from "../../../../models/Exercice";
import { Secteur } from "../../../../models/Secteur";
import { DomainePTF } from "../../../../models/DomainePTF";
import { NiveauMaturite } from "../../../../models/NiveauMaturite";
import { ZoneLocalite } from "../../../../models/ZoneLocalite";
import { Pays } from "../../../../models/Pays";
import { TypeFondSpecifique } from "../../../../models/TypeFondSpecifique";
import { User } from "../../../../models/User";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjetideeService } from "../../../../services/projetidee.service";
import { ExerciceService } from "../../../../services/exercice.service";
import { PtfService } from "../../../../services/ptf.service";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { SecteurService } from "../../../../services/secteur.service";
import { ZoneLocaliteService } from "../../../../services/zone-localite.service";
import { DomainePtfService } from "../../../../services/domaine-ptf.service";
import { PaysService } from "../../../../services/pays.service";
import { StructureService } from "../../../../services/structure.service";
import { NiveauMaturiteService } from "../../../../services/niveau-maturite.service";
import { FondSpecifiqueService } from "../../../../services/fond-specifique.service";
import { DepartementService } from "../../../../services/departement.service";
import { CommuneService } from "../../../../services/commune.service";
import { ArrondissementService } from "../../../../services/arrondissement.service";
import { TokenStorage } from "../../../../utils/token.storage";
import { TypeFondSpecifiqueService } from "../../../../services/type-fond-specifique.service";
import { FondSpecifique } from "../../../../models/FondSpecifique";
import { Accord } from "../../../../models/Accord";
import { HttpErrorResponse } from "@angular/common/http";
import { Departement } from "../../../../models/Departement";
import { Commune } from "../../../../models/Commune";
import { Arrondissement } from "../../../../models/Arrondissement";
import { FindValues } from "../../../../payload/FindValues";
import { Ide } from "../../../../models/Ide";
import { ProjetProgramme } from '../../../../models/ProjetProgramme';
import { DeviseMonaie } from '../../../../models/DeviseMonaie';
import { DetailFondSpecifique } from '../../../../models/DetailFondSpecifique';
import { ProjetProgrammeService } from '../../../../services/projet-programme.service';
import { DeviseMonaieService } from '../../../../services/devise-monaie.service';
import { DetailFondSpecifiqueService } from '../../../../services/detailFondSpecifique.service';
import { GrandSecteur } from '../../../../models/GrandSecteur';
import { SousSecteur } from '../../../../models/SousSecteur';
import { GrandSecteurService } from '../../../../services/grand-secteur.service';
import { SousSecteurService } from '../../../../services/sous-secteur.service';

@Component({
  selector: 'app-modifier-fond',
  templateUrl: './modifier-fond.component.html',
  styleUrls: ['./modifier-fond.component.css']
})
export class ModifierFondComponent implements OnInit {


  validateFormFondSpecifique: FormGroup;
  validateFormDetailFondSpecifique: FormGroup;

  projetList: Array<ProjetProgramme> = [];
  deviseMonnaieList: Array<DeviseMonaie> = [];
  ptfList: Array<Ptf> = [];
  grandSecteurList: Array<GrandSecteur> = [];
  secteurList: Array<Secteur> = [];
  sousSecteurList: Array<SousSecteur> = [];
  domainePTFList: Array<DomainePTF> = [];
  exerciceList: Array<Exercice> = [];
  typefondspecifiqueList: Array<TypeFondSpecifique> = [];

  isVisibleModalPtf: boolean = false;
  btnFermerText: string = 'Fermer';
  sommeDetailFondSpecifique: number = 0;
  preMontant: number = 0;
  modifFond: boolean = false;

  user: User = null;
  filter: any;


  detailFondSpecifique: DetailFondSpecifique = null;
  btnTitle: string;

  fondSpecifiqueSubmit: FondSpecifique = null;
  detailFondSpecifiqueSubmit: Array<DetailFondSpecifique> = [];
  ptfsSubmit: Array<Ptf> = [];

  private findValues: FindValues = new FindValues();

  paramKey: number;

  constructor(private fb: FormBuilder,
    private router: Router,
    private projetProgrammeService: ProjetProgrammeService,
    private exerciceService: ExerciceService,
    private ptfService: PtfService,
    private modalService: NzModalService,
    private deviseMonaieService: DeviseMonaieService,
    private detailFondSpecifiqueService: DetailFondSpecifiqueService,
    private activeRoute: ActivatedRoute,
    private message: NzMessageService,
    private grandSecteurService: GrandSecteurService,
    private secteurService: SecteurService,
    private sousSecteurService: SousSecteurService,
    private DomainePTFService: DomainePtfService,
    private fondSpeficiqueService: FondSpecifiqueService,
    private tokenStorage: TokenStorage,
    private typefondspecifiqueService: TypeFondSpecifiqueService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getListDomaines();
    this.getListGrandSecteur();
    this.getListSecteurs();
    this.getListSousSecteur();
    this.getListProjet();
    this.getListDeviseMonnaie();
    this.getListPTF();
    this.getListExercice();
    this.getListTypeFondSpecifique();
    this.btnTitle = 'Enregistrer';

    this.paramKey = this.activeRoute.snapshot.params['paramKey'];

    this.makeFormFondSpecifique();

    this.fondSpeficiqueService.getById(this.paramKey).subscribe(
      (data: FondSpecifique) => {
        this.fondSpecifiqueSubmit = data;
        this.detailFondSpecifiqueSubmit = data.detailFondSpecifiques;
        console.log(this.detailFondSpecifiqueSubmit);
        this.ptfsSubmit = data.ptfBailleurFrs;
        this.makeFormFondSpecifique()
      });

    this.makeFormDetailFondSpecifique(null);

  }


  /* enregistrement d'un fon spécifique */
  modificationFondSpecifique(): void {
    if (this.validateFormFondSpecifique.valid && this.ptfsSubmit.length > 0
      && this.detailFondSpecifiqueSubmit.length > 0) {

      const formData = this.validateFormFondSpecifique.value;
      console.log(formData);

      this.fondSpecifiqueSubmit.reference = formData.reference;
      this.fondSpecifiqueSubmit.libelle = formData.libelle;
      this.fondSpecifiqueSubmit.montantDevise = formData.montantDevise;
      this.fondSpecifiqueSubmit.deviseMonnaie = this.findValues.getObjectInList(formData.deviseMonnaie, this.deviseMonnaieList);
      this.fondSpecifiqueSubmit.montantFcfa = formData.montantFcfa;
      this.fondSpecifiqueSubmit.objectifs = formData.objectifs;
      this.fondSpecifiqueSubmit.observations = formData.observations;
      this.fondSpecifiqueSubmit.difficultes = formData.difficultes;
      this.fondSpecifiqueSubmit.solutionsEnvisagees = formData.solutionsEnvisagees;
      this.fondSpecifiqueSubmit.exercice = this.findValues.getObjectInList(formData.exercice, this.exerciceList);
      this.fondSpecifiqueSubmit.ptfBailleurFrs = this.ptfsSubmit;
      this.fondSpecifiqueSubmit.typeFondSpecifique = this.findValues.getObjectInList(formData.typeFondSpecifique, this.typefondspecifiqueList);
      this.fondSpecifiqueSubmit.detailFondSpecifiques = this.detailFondSpecifiqueSubmit;
      this.fondSpecifiqueSubmit.createBy = this.user.username;
      this.fondSpecifiqueSubmit.grandSecteur = this.findValues.getObjectInList(formData.grandSecteur, this.grandSecteurList);
      this.fondSpecifiqueSubmit.secteur = this.findValues.getObjectInList(formData.secteur, this.secteurList);
      this.fondSpecifiqueSubmit.sousSecteurs = this.findValues.getObjectListInList(formData.sousSecteurs, this.sousSecteurList);

      console.log(this.detailFondSpecifiqueSubmit);
      console.log(this.fondSpecifiqueSubmit);
      this.fondSpeficiqueService.save(this.fondSpecifiqueSubmit).subscribe(
        (data: FondSpecifique) => {
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<p> Le fond spécifique Réf. <strong>' + data.reference +
              '</strong> pour un montant de <strong>' + data.montantFcfa + ' ' + 'FCFA' + ' </strong> a été ' +
              'modifié avec succès.</p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => this.initialiseFormulaire()
          });
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('danger', 'Echec de l\'enregistrement du fonds !');
        });
    } else {

    }
  }

  initialiseFormulaire(): void {
    this.router.navigate(['admin/fonds-specifiques/list-fond-specifique/']);
  }



  annulerDetailFondSpecifique() {
    this.validateFormDetailFondSpecifique.reset();
    this.btnTitle = 'Enregistrer';
  }



  supprimerDetailFondSpecifique(d: DetailFondSpecifique): void {
    if (d.id != null && d.id > 0) {
      this.detailFondSpecifiqueService.delete(d).subscribe(
        (data: boolean) => {
          console.log(data + ': supression ok');
        },
        (error: HttpErrorResponse) => {
          this.createMessage('danger', 'Echec de supression !');
        });
    }
    this.detailFondSpecifiqueSubmit.splice(this.indexOfElementDetailFondSpecifique(d.projetProgramme.id), 1);
  }


  getTotalMontantDetailFondSpecifique(): number {
    let montantDetailFondSpecifique: number = 0;
    this.detailFondSpecifiqueSubmit.forEach(r => {
      montantDetailFondSpecifique += r.montantFcfa;
    });
    return montantDetailFondSpecifique;
  }



  enregistrerDetailFondSpecifique(): void {
    if (this.btnTitle = 'Modifier') {
      this.sommeDetailFondSpecifique = this.getTotalMontantDetailFondSpecifique() - this.preMontant;
    }
    this.sommeDetailFondSpecifique += this.validateFormDetailFondSpecifique.value.montantFcfa
    if (this.sommeDetailFondSpecifique <= this.validateFormFondSpecifique.value.montantFcfa) {

      const formData = this.validateFormDetailFondSpecifique.value;
      if (this.detailFondSpecifique == null) {
        this.detailFondSpecifique = new DetailFondSpecifique(
          null,
          formData.montantDevise,
          formData.montantFcfa,
          this.findValues.getObjectInList(formData.deviseMonnaie, this.deviseMonnaieList),
          this.findValues.getObjectInList(formData.projetProgramme, this.projetList),
          this.user.username,
          null);
      } else {
        this.detailFondSpecifique.projetProgramme = this.findValues.getObjectInList(formData.projetProgramme, this.projetList);
        this.detailFondSpecifique.montantDevise = formData.montantDevise;
        this.detailFondSpecifique.deviseMonnaie = this.findValues.getObjectInList(formData.deviseMonnaie, this.deviseMonnaieList);
        this.detailFondSpecifique.montantFcfa = formData.montantFcfa;
        this.detailFondSpecifique.createBy = this.user.username;
      }
      console.log(this.detailFondSpecifique);
      if (this.checkDoublonElementDetailFondSpecifique(this.detailFondSpecifique) === false) {


        this.detailFondSpecifiqueSubmit.unshift(this.detailFondSpecifique);
        this.detailFondSpecifique = null;
        this.btnTitle = 'Enregistrer';
        this.modifFond = false;
        this.validateFormDetailFondSpecifique.reset();

      } else {

        if (this.modifFond) {
          this.detailFondSpecifiqueSubmit.splice(this.indexOfElementDetailFondSpecifique(this.detailFondSpecifique.projetProgramme.id), 1);
          this.detailFondSpecifiqueSubmit.unshift(this.detailFondSpecifique);
          this.detailFondSpecifique = null;
          this.btnTitle = 'Enregistrer';
          this.modifFond = false;
          this.validateFormDetailFondSpecifique.reset();
        } else {
          this.modalService.error({
            nzTitle: 'Erreur',
            nzContent: '<p> Le projet ' + this.detailFondSpecifique.projetProgramme.libelle +
              ', a déjà reçu une allocation du fonds spécifique.</p>' +
              '<p> Voulez-vous redéfinir l\'allocation ?</p>',
            nzOkText: 'oui',
            nzCancelText: 'non',
            nzOnCancel: () => console.log(),
            nzOnOk: () => this.redéfinirDetailFonds(),
          });
        }

      }

    } else {
      this.createMessage('danger', 'dépassement total fonds !');
    }

  }






  /*fin enregistrement*/


  redéfinirDetailFonds() {
    let i = this.indexOfElementDetailFondSpecifique(this.detailFondSpecifique.projetProgramme.id);

    this.detailFondSpecifiqueService.delete(this.detailFondSpecifiqueSubmit[i]).subscribe(
      (data: boolean) => {
        console.log(data + ': supression ok');
        this.detailFondSpecifiqueSubmit.splice(i, 1);
        this.detailFondSpecifiqueSubmit.unshift(this.detailFondSpecifique);
        this.detailFondSpecifique = null;
        this.btnTitle = 'Enregistrer';
        this.modifFond = false;
        this.validateFormDetailFondSpecifique.reset();
      },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de supression !');
      });

  }




  /*Réalisation des formulaires*/
  makeFormFondSpecifique(): void {
    this.validateFormFondSpecifique = this.fb.group({
      exercice: [this.fondSpecifiqueSubmit != null ? this.fondSpecifiqueSubmit.exercice.id : null,
      [Validators.required,]],
      reference: [this.fondSpecifiqueSubmit != null ? this.fondSpecifiqueSubmit.reference : null,
      [Validators.required,]],
      typeFondSpecifique: [this.fondSpecifiqueSubmit != null ? this.fondSpecifiqueSubmit.typeFondSpecifique.id : null,
      [Validators.required,]],
      montantDevise: [this.fondSpecifiqueSubmit != null ? this.fondSpecifiqueSubmit.montantDevise : null,
      [Validators.required,]],
      deviseMonnaie: [this.fondSpecifiqueSubmit != null ? this.fondSpecifiqueSubmit.deviseMonnaie.id : null,
      [Validators.required,]],
      montantFcfa: [this.fondSpecifiqueSubmit != null ? this.fondSpecifiqueSubmit.montantFcfa : null,
      [Validators.required,]],
      libelle: [this.fondSpecifiqueSubmit != null ? this.fondSpecifiqueSubmit.libelle : null,
      [Validators.required,]],
      grandSecteur: [this.fondSpecifiqueSubmit != null ? this.fondSpecifiqueSubmit.grandSecteur.id : null,
      [Validators.required,]],
      secteur: [this.fondSpecifiqueSubmit != null ? this.fondSpecifiqueSubmit.secteur.id : null,
      [Validators.required,]],
      sousSecteurs: [(this.fondSpecifiqueSubmit != null) ? this.findValues.getArrayId(this.fondSpecifiqueSubmit.sousSecteurs) :
      null, [Validators.required,]],
      objectifs: [this.fondSpecifiqueSubmit != null ? this.fondSpecifiqueSubmit.objectifs : null,
      [Validators.required,]],
      observations: [this.fondSpecifiqueSubmit != null ? this.fondSpecifiqueSubmit.observations : null,],
      difficultes: [this.fondSpecifiqueSubmit != null ? this.fondSpecifiqueSubmit.difficultes : null,
      [Validators.required,]],
      solutionsEnvisagees: [this.fondSpecifiqueSubmit != null ? this.fondSpecifiqueSubmit.solutionsEnvisagees : null,],
    });
  }

  makeFormDetailFondSpecifique(detailFondSpecifique: DetailFondSpecifique): void {
    this.validateFormDetailFondSpecifique = this.fb.group({
      projetProgramme: [(detailFondSpecifique != null) ? detailFondSpecifique.projetProgramme.id : null,
      [Validators.required]],
      montantDevise: [(detailFondSpecifique != null) ? detailFondSpecifique.montantDevise : null,
      [Validators.required,]],
      deviseMonnaie: [(detailFondSpecifique != null) ? detailFondSpecifique.deviseMonnaie.id : null,
      [Validators.required]],
      montantFcfa: [(detailFondSpecifique != null) ? detailFondSpecifique.montantFcfa : null,
      [Validators.required,]],
    });
    this.detailFondSpecifique = detailFondSpecifique;
  }

  /* fin formulaires */



  modifierDetailFondSpecifique(detailFondSpecifique: DetailFondSpecifique) {
    this.makeFormDetailFondSpecifique(detailFondSpecifique);
    this.preMontant = detailFondSpecifique.montantFcfa;
    this.btnTitle = 'Modifier';
    this.modifFond = true;
  }






  showModalPtf(): void {
    this.isVisibleModalPtf = true;
  }


  handleCancel(): void {
    this.isVisibleModalPtf = false;
  }


  choisirUnPTF(p: Ptf): void {
    if (this.indexOfElement(p.id, this.ptfsSubmit) == -1) {
      this.ptfsSubmit.unshift(p);
    }
  }

  enleverPtf(p): void {
    this.ptfsSubmit.splice(this.indexOfElement(p.id, this.ptfsSubmit), 1);
  }



  /*début obtention des listes */
  getListTypeFondSpecifique(): void {
    this.typefondspecifiqueService.list().subscribe(
      (data: Array<TypeFondSpecifique>) => {
        this.typefondspecifiqueList = data;
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

  getListGrandSecteur(): void {
    this.grandSecteurService.list().subscribe(
      (data: Array<GrandSecteur>) => {
        this.grandSecteurList = data;
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

  getListSousSecteur(): void {
    this.sousSecteurService.list().subscribe(
      (data: Array<SousSecteur>) => {
        this.sousSecteurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }


  getListDomaines(): void {
    this.DomainePTFService.list().subscribe(
      (data: Array<DomainePTF>) => {
        this.domainePTFList = data;
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


  getListDeviseMonnaie(): void {
    this.deviseMonaieService.list().subscribe(
      (data: Array<DeviseMonaie>) => {
        this.deviseMonnaieList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }




  getListProjet(): void {
    this.projetProgrammeService.listGlobal().subscribe(
      (data: Array<ProjetProgramme>) => {
        this.projetList = data;
        console.log(this.projetList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  /* fin des listes */

  // Debut méthode format monnetaire
formatNumber(num: number) : string{
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}
// Fin méthode format monnetaire

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

  indexOfElementDetailFondSpecifique(id: number): number {
    let index = - 1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.detailFondSpecifiqueSubmit.length && rep === false) {
      if (this.detailFondSpecifiqueSubmit[i].projetProgramme.id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }


  checkDoublonElementDetailFondSpecifique(detailFondSpecifique: DetailFondSpecifique): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.detailFondSpecifiqueSubmit.length && rep === false) {
      if (this.detailFondSpecifiqueSubmit[i].projetProgramme.id === detailFondSpecifique.projetProgramme.id) {
        rep = true;
      }
      i++;
    }
    return rep;
  }

}
