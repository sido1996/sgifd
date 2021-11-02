import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Rapport} from "../../../../models/rapport";
import {RapportService} from "../../../../services/rapport.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RapportParams} from "../../../../models/rapport-params";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Exercice} from "../../../../models/Exercice";
import {ExerciceService} from "../../../../services/exercice.service";
import {GrandSecteurService} from "../../../../services/grand-secteur.service";
import {GrandSecteur} from "../../../../models/GrandSecteur";
import {NatureAssistance} from "../../../../models/NatureAssistance";
import {NatureAssistanceService} from "../../../../services/nature-assistance.service";
import {NatureFinancement} from "../../../../models/NatureFinancement";
import {NatureFinancementService} from "../../../../services/nature-financement.service";
import {CategoriePTF} from "../../../../models/CategoriePTF";
import {CategoriePtfService} from "../../../../services/categorie-ptf.service";
import {Secteur} from "../../../../models/Secteur";
import {SecteurService} from "../../../../services/secteur.service";
import {Ptf} from "../../../../models/Ptf";
import {PtfService} from "../../../../services/ptf.service";
import {PilierPAG} from "../../../../models/PilierPAG";
import {PiliersPagService} from "../../../../services/piliers-pag.service";
import {ObjectifODD} from "../../../../models/ObjectifODD";
import {ObjectifOddService} from "../../../../services/objectif-odd.service";
import {Cible} from "../../../../models/Cible";
import {CibleService} from "../../../../services/cible.service";
import {AxePrioritaire} from "../../../../models/AxePrioritaire";
import {AxePrioritaireService} from "../../../../services/axe-prioritaire.service";
import {Pays} from "../../../../models/Pays";
import {PaysService} from "../../../../services/pays.service";
import {TypeStructure} from "../../../../models/TypeStructure";
import {TypeStructureService} from "../../../../services/type-structure.service";
import {Structure} from "../../../../models/Structure";
import {StructureService} from "../../../../services/structure.service";
import {TypeAccord} from "../../../../models/TypeAccord";
import {TypeAccordsService} from "../../../../services/type-accords.service";
import {TypeCooperation} from "../../../../models/TypeCooperation";
import {TypeCooperationService} from "../../../../services/type-cooperation.service";
import {TypeFondSpecifique} from "../../../../models/TypeFondSpecifique";
import {TypeFondSpecifiqueService} from "../../../../services/type-fond-specifique.service";

@Component({
  selector: 'app-editer-rapport',
  templateUrl: './editer-rapport.component.html',
  styleUrls: ['./editer-rapport.component.css']
})
export class EditerRapportComponent implements OnInit {

  paramKey: any;
  rapport: Rapport = null;
  rapportParams: RapportParams[] = [];
  exerciceList: Exercice[] = [];
  grandsecteurList: Array<GrandSecteur> = [];
  natureassistanceList: Array<NatureAssistance> = [];
  naturefinancementList: Array<NatureFinancement> = [];
  categorieptfList: Array<CategoriePTF> = [];
  secteurList: Array<Secteur> = [];
  ptfList: Array<Ptf> = [];
  pilierpagList: Array<PilierPAG> = [];
  objectifoddList: Array<ObjectifODD> = [];
  cibleList: Array<Cible> = [];
  axeprioritaireList: Array<AxePrioritaire> = [];
  paysList: Array<Pays> = [];
  typestructureList: Array<TypeStructure> = [];
  structureList: Array<Structure> = [];
  typeaccordList: Array<TypeAccord> = [];
  typecooperationList: Array<TypeCooperation> = [];
  typefondspecifiqueList: Array<TypeFondSpecifique> = [];
  thirdForm: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private rapportService: RapportService,
    private fb: FormBuilder,
    private exerciceService: ExerciceService,
    private grandsecteurService: GrandSecteurService,
    private natureassistanceService: NatureAssistanceService,
    private naturefinancementService: NatureFinancementService,
    private categorieptfService: CategoriePtfService,
    private secteurService: SecteurService,
    private ptfService: PtfService,
    private pilierpagService: PiliersPagService,
    private objectifoddService: ObjectifOddService,
    private cibleService: CibleService,
    private axeprioritaireService: AxePrioritaireService,
    private paysService: PaysService,
    private typestructureService: TypeStructureService,
    private structureService: StructureService,
    private typeaccordsService: TypeAccordsService,
    private typecooperationService: TypeCooperationService,
    private typefondspecifiqueService: TypeFondSpecifiqueService
  ) {
  }

  ngOnInit() {
    this.thirdForm = this.fb.group({
      rapportParams: this.fb.array([]),
    });
    this.paramKey = this.activeRoute.snapshot.params['paramKey'];
    this.rapportService.detail(this.paramKey).subscribe(
      (data: Rapport) => {
        this.rapport = data;
        this.rapportParams = data.rapportParams;
        this.rapportParams.forEach(r => {
          const rapportParam = this.fb.group({
            id: [r.id],
            cle: [r.cle, Validators.required],
            valeur: [r.valeur, Validators.required],
            libelle: [r.libelle, Validators.required],
            estChampsDeSaisie: [r.estChampsDeSaisie,
              Validators.required],
            fonctionnaliteName: [r.fonctionnaliteName,
              Validators.required],
            selectionRetourneId: [r.selectionRetourneId,
              Validators.required],
            selectionRetourneCode: [r.selectionRetourneCode,
              Validators.required],
            selectionRetourneLibelle: [r.selectionRetourneLibelle,
              Validators.required],
          });
          this.paramsForms.push(rapportParam);
          this.chargerFieldList(r.fonctionnaliteName);
        });

        this.paramsForms.controls = [...this.paramsForms.controls];
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });

  }

  get paramsForms() {
    return this.thirdForm.get('rapportParams') as FormArray;
  }

  editerRapport(): void {
    const rapportParams = [];
    const rapportParamsArray: any[] = this.paramsForms.value as any[];
    rapportParamsArray.forEach(a => {
      const tempItem = Object.assign({}, a);
      rapportParams.push(tempItem);
    });
    this.rapport != null ? this.rapport.rapportParams = rapportParams :
      this.rapportParams = [];

    this.rapportService.rapport(this.rapport).subscribe(resp => {
      let file, fileURL;
      file = new Blob([resp], {type: 'application/pdf'});
      fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  chargerFieldList(filed: string): void {
    if (filed === 'ANNEE') {
      this.exerciceService.list().subscribe(
        (data: Array<Exercice>) => {
          this.exerciceList = data;
        });
    }
    if (filed === 'GRAND_SECTEUR') {
      this.grandsecteurService.list().subscribe(
        (data: Array<GrandSecteur>) => {
          this.grandsecteurList = data;
        });
    }
    if (filed === 'NATURE_ASSISTANCE') {
      this.natureassistanceService.list().subscribe(
        (data: Array<NatureAssistance>) => {
          this.natureassistanceList = data;
        });
    }
    if (filed === 'NATURE_FINANCEMENT') {
      this.naturefinancementService.list().subscribe(
        (data: Array<NatureFinancement>) => {
          this.naturefinancementList = data;
        });
    }
    if (filed === 'CATEGORIE_PTF') {
      this.categorieptfService.list().subscribe(
        (data: Array<CategoriePTF>) => {
          this.categorieptfList = data;
        });
    }
    if (filed === 'SECTEUR') {
      this.secteurService.list().subscribe(
        (data: Array<Secteur>) => {
          this.secteurList = data;
        });
    }
    if (filed === 'REPERTOIRE_PTF') {
      this.ptfService.list().subscribe(
        (data: Array<Ptf>) => {
          this.ptfList = data;
        });
    }
    if (filed === 'PILIER_PAG') {
      this.pilierpagService.list().subscribe(
        (data: Array<PilierPAG>) => {
          this.pilierpagList = data;
        });
    }
    if (filed === 'OBJECTIF_DEVELOPPEMENT_DURABLE') {
      this.objectifoddService.list().subscribe(
        (data: Array<ObjectifODD>) => {
          this.objectifoddList = data;
        });
    }
    if (filed === 'CIBLE_PRIORITAIRE') {
      this.cibleService.list().subscribe(
        (data: Array<Cible>) => {
          this.cibleList = data;
        });
    }
    if (filed === 'AXE_PRIORITAIRE') {
      this.axeprioritaireService.list().subscribe(
        (data: Array<AxePrioritaire>) => {
          this.axeprioritaireList = data;
        });
    }
    if (filed === 'PAYS') {
      this.paysService.list().subscribe(
        (data: Array<Pays>) => {
          this.paysList = data;
        });
    }
    if (filed === 'TYPE_STRUCTURE') {
      this.typestructureService.list().subscribe(
        (data: Array<TypeStructure>) => {
          this.typestructureList = data;
        });
    }
    if (filed === 'REPERTOIRE_STRUCTURE') {
      this.structureService.list().subscribe(
        (data: Array<Structure>) => {
          this.structureList = data;
        });
    }
    if (filed === 'TYPE_ACCORD') {
      this.typeaccordsService.list().subscribe(
        (data: Array<TypeAccord>) => {
          this.typeaccordList = data;
        });
    }
    if (filed === 'TYPE_COOPERATION') {
      this.typecooperationService.list().subscribe(
        (data: Array<TypeCooperation>) => {
          this.typecooperationList = data;
        });
    }
    if (filed === 'TYPE_FOND_SPECIFIQUE') {
      this.typefondspecifiqueService.list().subscribe(
        (data: Array<TypeFondSpecifique>) => {
          this.typefondspecifiqueList = data;
        });
    }
  }

}
