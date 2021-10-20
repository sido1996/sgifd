import {RessourceExterieure} from './../../../../models/RessourceExterieure';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorage} from "../../../../utils/token.storage";
import {User} from "../../../../models/User";
import {RequeteFinancement} from "../../../../models/RequeteFinancement";
import {RequeteFinancementService} from "../../../../services/requete-financement.service";
import {RelanceRequeteFinancementService} from "../../../../services/relance-requete-financement.service";
import {ReponseRequeteFinancementService} from "../../../../services/reponse-requete-financement.service";
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from "@angular/common/http";
import {RelanceRequeteFinancement} from "../../../../models/RelanceRequeteFinancement";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ReponseRequeteFinancement} from "../../../../models/ReponseRequeteFinancement";
import {TypeAppreciation} from "../../../../models/TypeAppreciation";
import {TypeAppreciationService} from "../../../../services/type-appreciation.service";
import {environment} from "../../../../../environments/environment";
import {PieceRequeteFinancement} from "../../../../models/Piece/PieceRequeteFinancement";
import {filter} from "rxjs/operators";
import {FileUploadService} from "../../../../services/file-upload.service";
//import {RessourceExterieure} from "../../../../models/RessourceExterieure";

import {saveAs} from 'file-saver';
import {PieceService} from "../../../../services/piece.service";
import {NatureFinancement} from "../../../../models/NatureFinancement";
import {NatureFinancementService} from "../../../../services/nature-financement.service";
import {Piece} from "../../../../models/Piece/Piece";
import {InstructionRequete} from "../../../../models/InstructionRequete";
import {InstructionRequeteService} from "../../../../services/instruction-requete.service";
import {ProrogationProjet} from '../../../../models/ProrogationProjet';
import {RessourceExeterieureService} from '../../../../services/ressource-exeterieure.service';
import {ProjetProgrammeFinalise} from "../../../../models/ProjetProgrammeFinalise";

@Component({
  selector: 'app-detail-requete',
  templateUrl: './detail-requete.component.html',
  styleUrls: ['./detail-requete.component.css']
})
export class DetailRequeteComponent implements OnInit {

  paramKey: any;

  projetProgrammeIdee: ProjetProgrammeFinalise = null;
  requetefinancement: RequeteFinancement;
  relances: Array<RelanceRequeteFinancement> = [];
  reponses: Array<ReponseRequeteFinancement> = [];
  typeappreciationList: Array<TypeAppreciation> = [];
  naturefinancementList: Array<NatureFinancement> = [];

  user: User = null;
  filter: any;

  prorogationProjetSubmit: Array<ProrogationProjet> = [];

  validateFormAjouterReponse: FormGroup;
  validateFormAjouterInstruction: FormGroup;
  validateFormAjouterRelance: FormGroup;
  validateFormCloseRequete: FormGroup;
  validateFormFile: FormGroup;

  btnFermerText = "Fermer";
  isVisibleRelance: boolean = false;
  isVisibleInstruction: boolean = false;
  isVisibleReponse: boolean = false;

  ressourcesExterieureList: Array<RessourceExterieure> = [];

  ressourceExterieure: RessourceExterieure = null;

  pieceInfo: Piece = null;
  isVisiblePieceInfo: boolean = false;
  isVisibleProjet: boolean = false;
  isPTF: boolean = false;

  instructionRequetes: Array<InstructionRequete> = [];
  filesRequete: Array<PieceRequeteFinancement> = [];
  isVisibleFile: boolean = false;
  fileToUpload: File = null;
  url = environment.backend;
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  constructor(private router: Router,
              private fb: FormBuilder,
              private http: HttpClient,
              private  activeRoute: ActivatedRoute,
              private tokenStorage: TokenStorage,
              private message: NzMessageService,
              private modalService: NzModalService,
              private fileService: FileUploadService,
              private pieceService: PieceService,
              private naturefinancementService: NatureFinancementService,
              private requeteFinancementService: RequeteFinancementService,
              private relanceRequeteFinancementService: RelanceRequeteFinancementService,
              private reponseRequeteFinancementService: ReponseRequeteFinancementService,
              private instructionRequeteService: InstructionRequeteService,
              private ressourceExterieureService: RessourceExeterieureService,
              private typeappreciationService: TypeAppreciationService) {

  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(this.user);
    if (this.user != null && this.user.roles != null) {
      this.user.roles.forEach(r => {
        if (r.name == 'ROLE_USER_PTF') {
          this.isPTF = true;
          console.log(this.isPTF);
        }
      });
    }

    this.getListNatureFinancement();
    this.paramKey = this.activeRoute.snapshot.params['paramKey'];

    if(this.paramKey != null && this.paramKey != undefined && this.paramKey > 0) {
      this.requeteFinancementService.getById(this.paramKey).subscribe(
        (data: RequeteFinancement) => {
          this.requetefinancement = data;
          console.log(this.requetefinancement);
          this.projetProgrammeIdee = data.projetProgrammeIdee;
          this.ressourcesExterieureList = data.ressourceExterieures;
          console.log( this.ressourcesExterieureList);
          if (this.isPTF == true) {
            this.ressourcesExterieureList.forEach((r, index) => {
              if (r.ptfBailleurFrs.id != this.user.ptf.id) {
                console.log(r);
                this.ressourcesExterieureList.splice(index, 1);
              }
            });
          }
          this.ressourcesExterieureList = this.ressourcesExterieureList != null ? [...this.ressourcesExterieureList] : [];
          console.log(this.ressourcesExterieureList);
          this.prorogationProjetSubmit = data.projetProgrammeIdee.prorogationProjets;
          this.filesRequete = data.files;
          this.instructionRequetes = data.instructionRequetes;
        });
    }
    this.makeFormCloseRequete();
    this.makeFormRelance();
    this.makeFormReponse();
    this.makeFormFile();
    this.makeFormInstruction();
    this.getTypeAppreciationList();
  }

  makeFormRelance(): void {
    this.validateFormAjouterRelance = this.fb.group({
      libelle: [null, [Validators.required,]],
    });
  }

  makeFormReponse(): void {
    this.validateFormAjouterReponse = this.fb.group({
      natureFinancement: [null, [Validators.required,]],
      montantRessourceProgrammer: [null, [Validators.required,]],
      libelle: [null,],
    });
  }

  makeFormInstruction(): void {
    this.validateFormAjouterInstruction = this.fb.group({
      libelle: [null, [Validators.required,]],
      dateIdentification: [null, [Validators.required,]],
      datePreparation: [null, [Validators.required,]],
      dateEvaluation: [null, [Validators.required,]],
      dateNegociation: [null, [Validators.required,]],
      dateApprobation: [null, [Validators.required,]],
      dateSignature: [null, [Validators.required,]],
    });
  }

  makeFormCloseRequete(): void {
    this.validateFormCloseRequete = this.fb.group({
      typeappreciation: [null, [Validators.required,]],
      closeReason: [null, [Validators.required,]],
    });
  }

  gotoListRequete(): void {
    if(this.isPTF == false) {
      this.router.navigate(['admin/requete-financement/list-requete']);
    } else {
      this.router.navigate(['admin-ptf/list-encours']);
    }
  }

  selectOneRessourceRequete(ressource: RessourceExterieure) {
    this.ressourceExterieure = ressource;
    this.validateFormAjouterReponse.reset();
    this.validateFormAjouterRelance.reset();
    this.reponses = [];
    this.relances = [];

    this.reponseRequeteFinancementService.list(this.ressourceExterieure.id).subscribe(
      (data: Array<ReponseRequeteFinancement>) => {
        this.reponses = data;
      });
    this.relanceRequeteFinancementService.list(this.ressourceExterieure.id).subscribe(
      (data: Array<RelanceRequeteFinancement>) => {
        this.relances = data;
      });
  }


  showModalProjet(): void {
    if(this.isPTF == false) {
      this.router.navigate(['admin/requete-financement/detail-projet/' + this.requetefinancement.projetProgrammeIdee.id]);
    } else {
      this.router.navigate(['admin-ptf/detail-projets-finances/' + this.requetefinancement.projetProgrammeIdee.id]);
    }
  }

  getTotalMontantRessourceExterieure(): number {
    let montantRessource: number = 0;
    this.ressourcesExterieureList.forEach(r => {
      montantRessource += r.montantRessourceDevise;
    });
    return montantRessource;
  }

  getTotalByRessourceExterieure(): number {
    let montantRessource: number = 0;
    this.reponses.forEach(r => {
      montantRessource += r.montantRessourceProgrammer;
    });
    return montantRessource;
  }

  submitFormRelance(): void {
    if (this.validateFormAjouterRelance.valid === true) {
      if (this.ressourceExterieure == null) {
        this.createMessage('error', 'Veuillez sélectionner la requête concernant le P.T.F !');
      } else {
        const formData = this.validateFormAjouterRelance.value;
        const relance = new RelanceRequeteFinancement(null, formData.libelle, null,
          this.ressourceExterieure, this.user.username, null);
        console.log(relance);
        this.relanceRequeteFinancementService.save(relance, this.ressourceExterieure.id).subscribe(
          (data: RelanceRequeteFinancement) => {
            this.createMessage('success', 'Enregistrement effectué !');
            this.relances.unshift(data);
            this.handleCancelRelance();
            this.ngOnInit();
          },
          (error: HttpErrorResponse) => {
          });
      }
    } else {
      this.createMessage('error', 'Formulaire invalide !');
    }
  }

  submitFormInstruction(): void {
    if (this.validateFormAjouterInstruction.valid === true) {
      if (this.requetefinancement == null) {
        this.createMessage('error', 'Impossible, requête sélectionner invalide !');
      } else {
        const formData = this.validateFormAjouterInstruction.value;
        const instruction = new InstructionRequete(null, formData.libelle, formData.dateIdentification,
          formData.datePreparation, formData.dateEvaluation, formData.dateNegociation, formData.dateApprobation, formData.dateSignature);
        console.log(instruction);
        this.instructionRequeteService.save(instruction, this.requetefinancement.id).subscribe(
          (data: InstructionRequete) => {
            this.createMessage('success', 'Enregistrement effectué !');
            this.instructionRequetes.unshift(data);
            this.handleCancelInstruction();
          },
          (error: HttpErrorResponse) => {
          });
      }
    } else {
      this.createMessage('error', 'Formulaire invalide !');
    }
  }

  submitFormReponse(): void {
    if (this.validateFormAjouterReponse.valid === true) {
      if (this.ressourceExterieure == null) {
        this.createMessage('error', 'Veuillez sélectionner la requête concernant le P.T.F !');
      } else {
        const formData = this.validateFormAjouterReponse.value;
        const reponse = new ReponseRequeteFinancement(null, formData.libelle, null,
          formData.montantRessourceProgrammer, formData.natureFinancement, this.ressourceExterieure, this.user.username, null);

        this.reponseRequeteFinancementService.save(reponse, this.ressourceExterieure.id).subscribe(
          (data: ReponseRequeteFinancement) => {
            this.createMessage('success', 'Enregistrement effectué !');
            this.reponses.unshift(data);
            this.handleCancelReponse();
            this.ngOnInit();

          },
          (error: HttpErrorResponse) => {
          });
      }
    } else {
      this.createMessage('error', 'Formulaire invalide !');
    }
  }

  // Debut méthode format monnetaire
  formatNumber(num: number): string {
    return num != null && num != undefined ?num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') : '0';
  }

  showModalRelance(): void {
    this.isVisibleRelance = true;
  }

  showModalReponse(): void {
    this.isVisibleReponse = true;
  }

  handleCancelRelance(): void {
    console.log('Button cancel clicked!');
    this.isVisibleRelance = false;
    this.validateFormAjouterRelance.reset();
  }

  handleCancelInstruction(): void {
    console.log('Button cancel clicked!');
    this.isVisibleInstruction = false;
    this.validateFormAjouterInstruction.reset();
  }

  handleCancelReponse(): void {
    console.log('Button cancel clicked!');
    this.isVisibleReponse = false;
    this.isVisibleFile = false;
    this.isVisibleProjet = false;
    this.validateFormFile.reset();
    this.validateFormAjouterReponse.reset();
    this.getTotalMontantRponse();
  }

  showMessageRelanceDelete(relance: RelanceRequeteFinancement): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de la relance du  <b>' + new Date(relance.dateRelance).toLocaleString() + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deleteOneRelance(relance),
      nzOnCancel: () => console.log('cancel')
    });
  }

  showMessageReponseDelete(reponse: ReponseRequeteFinancement): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de la relance du  <b>' + new Date(reponse.dateReponse).toLocaleString() + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deleteOneReponse(reponse),
      nzOnCancel: () => console.log('cancel')
    });
  }

  showMessageInstructionDelete(instruction: InstructionRequete): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de l\'instruction : <b>' + instruction.libelle + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deleteOneInstruction(instruction),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneRelance(relance: RelanceRequeteFinancement): void {
    this.relanceRequeteFinancementService.delete(relance).subscribe(
      (data: RelanceRequeteFinancement) => {
        this.createMessage('success', 'Suppression effectuée avec succès !');
        this.relances.splice(this.indexOfRelance(data.id), 1);
        this.handleCancelRelance();
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
      });
  }

  deleteOneReponse(reponse: ReponseRequeteFinancement): void {
    this.reponseRequeteFinancementService.delete(reponse).subscribe(
      (data: RelanceRequeteFinancement) => {
        this.createMessage('success', 'Suppression effectuée avec succès !');
        this.reponses.splice(this.indexOfReponse(data.id), 1);
        this.handleCancelReponse();
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
      });
  }

  deleteOneInstruction(instruction: InstructionRequete): void {
    this.instructionRequeteService.delete(instruction).subscribe(
      (data: InstructionRequete) => {
        this.createMessage('success', 'Suppression effectuée avec succès !');
        this.instructionRequetes.splice(this.indexOfReponse(data.id), 1);
        this.handleCancelReponse();
      },
      (error: HttpErrorResponse) => {
      });
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  indexOfRelance(id: number): number {
    let index = -1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.relances.length && rep === false) {
      if (this.relances[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  indexOfReponse(id: number): number {
    let index = -1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.reponses.length && rep === false) {
      if (this.reponses[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }


  showMessageCloseRequete(requete: RequeteFinancement): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la clôture définitive de la requête ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.closeRequeteFinancement(requete),
      nzOnCancel: () => console.log('cancel')
    });
  }

  closeRequeteFinancement(requete: RequeteFinancement): void {
    if (this.validateFormCloseRequete.valid === true) {
      const formData = this.validateFormCloseRequete.value;
      requete.closeReason = formData.closeReason;
      requete.typeAppreciation = formData.typeappreciation;
      requete.closeAppreciation = formData.typeappreciation.libelle;
      this.requeteFinancementService.close(requete).subscribe(
        (data: RequeteFinancement) => {
          this.createMessage('success', 'Requête clôturée avec succès !');
          this.router.navigate(['admin/requete-financement/list-requete/']);
        },
        (error: HttpErrorResponse) => {
        });
    } else {
      this.createMessage('error', 'Formulaire invalide !');
    }
  }


  getTypeAppreciationList(): void {
    this.typeappreciationService.list().subscribe(
      (data: Array<TypeAppreciation>) => {
        this.typeappreciationList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  getTotalMontantRponseInit(ressource: RessourceExterieure): number {
    let i: number = 0;
    ressource.reponseRequeteFinancements.forEach(r => {
      i = i + r.montantRessourceProgrammer;
    });
    return i;
  }

  getTotalMontantRponse(): number {
    if (this.reponses != []) {
      let i: number = 0;
      this.reponses.forEach(r => {
        i = i + r.montantRessourceProgrammer;
      });
      return i;
    } else {
      return 0;
    }
  }


  getMontantTotalAccorde() {

    //let mnt: number = 0;
    let i: number = 0;
    this.ressourcesExterieureList.forEach(re => {

      re.reponseRequeteFinancements.forEach(rp => {
        i = i + rp.montantRessourceProgrammer;
      });

    });
    //mnt = mnt + i;
    return i;

  }


  /* début des éléments de téléchargement de fichier */

  showMessageClosePiece(i: number, p: Piece): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de la pièce <b>' + p.fileName + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deletePiece(i, p),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deletePiece(i: number, p: Piece) {
    this.pieceService.delete(p).subscribe(
      (data: any) => {
        if (data != null) {
          this.filesRequete.splice(i, 1);
        }
        this.fileInput.nativeElement.value = "";
        this.validateFormFile.reset();
      });
  }

  makeFormFile(): void {
    this.validateFormFile = this.fb.group({
      namePiece: [null, [Validators.required,]],
      refPiece: [null, [Validators.required,]],
      refEmplacement: [null,],
      resumePiece: [null,],
    });
  }

  submitFormFile(): void {

    if (this.validateFormFile.valid === true) {
      const formDataDonnee = this.validateFormFile.value;

      const formData = new FormData();
      formData.append("Content-Type", "multipart/form-data");
      formData.append('file', <File>this.fileToUpload);

      const req = new HttpRequest('POST', this.url + '/piece/uploadFile', formData, {
        // reportProgress: true
      });
      this.http.request(req).pipe(filter(e => e instanceof HttpResponse))
        .subscribe(
          (data: any) => {
            let piece: Piece = data.body;
            console.log(data);
            piece.namePiece = formDataDonnee.namePiece;
            piece.resumePiece = formDataDonnee.resumePiece;
            piece.refEmplacement = formDataDonnee.refEmplacement;
            piece.refPiece = formDataDonnee.refPiece;

            this.requeteFinancementService.saveFile(this.requetefinancement.id, piece).subscribe(
              (data: RequeteFinancement) => {
                this.filesRequete = data.files;
                this.fileInput.nativeElement.value = "";
                this.validateFormFile.reset();
              });
          },
          err => {

            this.fileInput.nativeElement.value = "";
            this.message.error('Chargement du fichier échoué.');
          });

    } else {
      this.createMessage('error', 'Formulaire invalide !');
    }
  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload.name);
  }

  showModalInstruction(): void {
    this.isVisibleInstruction = true;
  }

  showModalPiece(): void {
    this.isVisibleFile = true;
  }

  showModalPieceInfo(piece: Piece): void {
    this.pieceInfo = piece;
    this.isVisiblePieceInfo = true;
  }

  handleCancelPieceInfo(): void {
    this.pieceInfo = null;
    this.isVisiblePieceInfo = false;
  }

  downloadFile(fileName: string) {
    this.pieceService.downloadFile(fileName).subscribe(data => saveAs(data, fileName));
  }

  /* fin des éléments de téléchargement de fichier */

  getListNatureFinancement(): void {
    this.naturefinancementService.list().subscribe(
      (data: Array<NatureFinancement>) => {
        this.naturefinancementList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  cloturerDialogue(ressource: RessourceExterieure, typeCloture: string): void {
    this.modalService.confirm({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la clôture de cette requête en ' + typeCloture + ' ? </p>',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzCancelText: 'Non',
      nzOnOk: () => this.cloturer(ressource.id, typeCloture),
      nzOnCancel: () => console.log('cancel')
    });
  }

  cloturer(id: number, typeCloture: string): void {

    this.ressourceExterieureService.close(id, typeCloture).subscribe(
      (data: RessourceExterieure) => {
        this.ressourceExterieure = data;
        this.reponses = data.reponseRequeteFinancements;
        this.relances = data.relanceRequeteFinancements;
        console.log(this.ressourceExterieure);
        this.ressourcesExterieureList.splice(this.indexOfElement(data.id), 1);
        this.ressourcesExterieureList.unshift(data);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });

  }


  reouvrirDialogue(ressource: RessourceExterieure): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la réouverture de la  ressource exterieure ? </p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.reouvrir(ressource.id),
      nzOnCancel: () => console.log('cancel')
    });
  }

  reouvrir(id: number): void {
    this.ressourceExterieureService.open(id).subscribe(
      (data: RessourceExterieure) => {
        this.ressourceExterieure = data;

        this.reponses = data.reponseRequeteFinancements;

        this.relances = data.relanceRequeteFinancements;

        console.log(this.ressourceExterieure);

        this.ressourcesExterieureList.splice(this.indexOfElement(data.id), 1);
        this.ressourcesExterieureList.unshift(data);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }


  indexOfElement(id: number): number {
    let index = -1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.ressourcesExterieureList.length && rep === false) {
      if (this.ressourcesExterieureList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }


  abandonnerPTF(i: number, ressource: RessourceExterieure): void {
    this.modalService.info({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez-vous l\'abandon définitif du PTF <b>' +
        ressource.ptfBailleurFrs.denominationptf + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.abandonnerPTFAction(i, ressource),
      nzOnCancel: () => console.log('cancel')
    });
  }

  abandonnerPTFAction(i: number, ressource: RessourceExterieure): void {
    if (ressource.id != null && ressource.id > 0) {
      this.ressourceExterieureService.delete(ressource).subscribe(
        (data: RessourceExterieure) => {
          this.ressourcesExterieureList.splice(i, 1);
          this.ressourcesExterieureList = [...this.ressourcesExterieureList];
        },
        (error: HttpErrorResponse) => {
          this.createMessage('error', 'Echec de l\'enregistrement du projet !');
        });
    }

  }

}
