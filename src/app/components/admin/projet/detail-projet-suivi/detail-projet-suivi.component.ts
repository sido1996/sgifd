import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../../models/User";
import {ConditionSuspensiveDecaissement} from "../../../../models/ConditionSuspensiveDecaissement";
import {ConditionSuspensiveAccord} from "../../../../models/ConditionSuspensiveAccord";
import {RessourceExterieure} from "../../../../models/RessourceExterieure";
import {Localisation} from "../../../../models/Localisation";
import {ProjetProgramme} from "../../../../models/ProjetProgramme";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ProjetProgrammeService} from "../../../../services/projet-programme.service";
import {RessourceInterieureAnnuelle} from "../../../../models/RessourceInterieureAnnuelle";
import {RessourceExterieureAnnuelle} from "../../../../models/RessourceExterieureAnnuelle";
import {Piece} from "../../../../models/Piece/Piece";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {saveAs} from "file-saver";
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from "@angular/common/http";
import {filter} from "rxjs/operators";
import {PPP} from "../../../../models/PPP";
import {environment} from "../../../../../environments/environment";
import {PieceService} from "../../../../services/piece.service";
import {Ide} from "../../../../models/Ide";
import {ProrogationProjet} from '../../../../models/ProrogationProjet';
import { Accord } from '../../../../models/Accord';
import { AccordService } from '../../../../services/accord.service';
import { ProjetProgrammeFinalise } from '../../../../models/ProjetProgrammeFinalise';
import { SecteurImpacte } from './../../../../models/SecteurImpacte';

@Component({
  selector: 'app-detail-projet-suivi',
  templateUrl: './detail-projet-suivi.component.html',
  styleUrls: ['./detail-projet-suivi.component.css']
})
export class DetailProjetSuiviComponent implements OnInit {

  user: User = null;
  filter: any;
  paramKey: number;

  conditionSuspensiveDecaissementsList: Array<ConditionSuspensiveDecaissement> = [];
  conditionsuspensiveList: Array<ConditionSuspensiveAccord> = [];
  ressourcesExterieureList: RessourceExterieure[] = [];
  localisationList: Array<Localisation> = [];
  projetSubmit: ProjetProgrammeFinalise = null;


  pieceInfo: Piece = null;
  isVisiblePieceInfo: boolean = false;

  prorogationProjetSubmit: Array<ProrogationProjet> = [];

  filesProjet: Array<Piece> = [];
  ressourceExterieure: RessourceExterieure = null;
  ressourceInterieureAnnuelleList: Array<RessourceInterieureAnnuelle> = [];

  accordList: Array<Accord> = [];

  accordAssociesList : Array<Accord> = [];

  acrd : Accord  = null;

  cumulTotalInterieure = {
    programmerInterieure: 0, ordonnancerInterieure: 0, engagerInterieure: 0
  };

  cumulTotalExterieure = {
    programmerExterieure: 0, ordonnancerExterieure: 0, engagerExterieure: 0
    , ordonnancerExterieureFcfa: 0, consommeFcfa: 0
  };

  secteurImpactesList: Array<SecteurImpacte> = [];

  validateFormFile: FormGroup;

  btnFermerText = "Fermer";
  isVisibleFile: boolean = false;

  fileToUpload: File = null;
  url = environment.backend;
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  isAdmin: boolean = false;
  isPTF: boolean = false;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorage,
    private message: NzMessageService,
    private pieceService: PieceService,
    private activeRoute: ActivatedRoute,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private http: HttpClient,
    private projetProgrammeService: ProjetProgrammeService,
    private accordService: AccordService,
  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());

    if(this.user != null && this.user.roles != null) {
      this.user.roles.forEach( r=> {
        if(r.name == 'ROLE_ADMIN') {
          this.isAdmin = true;
        }
        if(r.name == 'ROLE_USER_PTF') {
          this.isPTF = true;
        }
      });
    }

    this.getListAccord();

    this.paramKey = this.activeRoute.snapshot.params['paramKey'];

    if(this.paramKey != null && this.paramKey != undefined && this.paramKey > 0) {
      this.getListAccordAssocies(this.paramKey);

      this.projetProgrammeService.getById(this.paramKey).subscribe(
        (data: ProjetProgrammeFinalise) => {
          console.log(data);
          if(data == null) {
            this.modalService.error({
              nzTitle: 'Erreur',
              nzContent: '<p> Aucun projet ne porte le numéro d\'enregistrement <b>' + this.paramKey + '</b>.</p>',
              nzOkText: null,
              nzCancelText: 'Ok',
              nzOnCancel: () => console.log(),
            });
          } else {
            this.projetSubmit = data;
            console.log(this.projetSubmit);
            this.secteurImpactesList = data.secteurImpactes;
            this.conditionSuspensiveDecaissementsList = data.conditionSuspensiveDecaissements;
            this.conditionsuspensiveList = data.conditionSuspensiveAccords;
            this.ressourcesExterieureList = data.ressourceExterieures;
            this.ressourcesExterieureList = this.ressourcesExterieureList != null ? [...this.ressourcesExterieureList] : [];
            if (this.isPTF == true &&  this.ressourcesExterieureList != null) {
              this.ressourcesExterieureList.forEach((r, index) => {
                if (r.ptfBailleurFrs.id != this.user.ptf.id) {
                  console.log(r);
                  this.ressourcesExterieureList.splice(index, 1);
                  this.ressourcesExterieureList = [...this.ressourcesExterieureList];
                }
              });
            }
            this.localisationList = data.localisations;
            this.prorogationProjetSubmit = data.prorogationProjets;
            this.filesProjet = data.files;

            this.ressourceInterieureAnnuelleList = data.ressourceInterieureAnnuelles;
            this.cumulTotalInterieure = {
              programmerInterieure: this.getTotalProgrammerInterieure(),
              ordonnancerInterieure: this.getTotalOrdonnancerInterieure(),
              engagerInterieure: this.getTotalEngagerInterieure()
            };
          }

        });

    }

    this.makeFormFile();
  }


  handleCancelReponse(): void {
    console.log('Button cancel clicked!');
    this.isVisibleFile = false;
  }


  showModalPiece(): void {
    this.isVisibleFile = true;
  }

  downloadFile(fileName: string) {
    this.pieceService.downloadFile(fileName).subscribe(data => saveAs(data, fileName));
    //console.log("telecharger doc" + fileName);
  }

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
          this.filesProjet.splice(i, 1);
        }
        this.fileInput.nativeElement.value = "";
        this.validateFormFile.reset();
      });
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  showModalPieceInfo(piece: Piece): void {
    this.pieceInfo = piece;
    this.isVisiblePieceInfo = true;
  }

  handleCancelPieceInfo(): void {
    this.pieceInfo = null;
    this.isVisiblePieceInfo = false;
  }

// Debut méthode format monnetaire
  formatNumber(num: number): string {
    return num != undefined ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') : '0';
  }

  // Fin méthode format monnetaire
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
      formData.append('file', <File> this.fileToUpload);

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

            this.projetProgrammeService.saveFile(this.projetSubmit.id, piece).subscribe(
              (data: ProjetProgramme) => {
                this.filesProjet = data.files;
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

  /*totaux ressources extérieures*/


  choiceRessourceExterieure(ressource: RessourceExterieure): void {

    this.ressourceExterieure = ressource;
    this.cumulTotalExterieure = {
      programmerExterieure: this.getTotalProgrammer(),
      ordonnancerExterieure: this.getTotalOrdonnancer()
      , engagerExterieure: this.getTotalEngager()
      , ordonnancerExterieureFcfa: this.getTotalOrdonnancerFcfa(), consommeFcfa: this.getTotalConsommeFcfa()
    };
  }

  getTotalProgrammer(): number {
    let cout = 0;
    this.ressourceExterieure.ressourceExterieureAnnuelles.forEach(r => {
      cout = cout + r.montantRessourceProgrammer;
    });
    return cout;
  }

  getTotalEngager(): number {
    let cout = 0;
    this.ressourceExterieure.ressourceExterieureAnnuelles.forEach(r => {
      cout = cout + r.montantRessourceApprouver;
    });
    return cout;
  }

  getTotalOrdonnancer(): number {
    let cout = 0;
    this.ressourceExterieure.ressourceExterieureAnnuelles.forEach(r => {
      cout = cout + r.montantRessourceDecaisser;
    });
    return cout;
  }

  getTotalOrdonnancerFcfa(): number {
    let cout = 0;
    this.ressourceExterieure.ressourceExterieureAnnuelles.forEach(r => {
      cout = cout + r.montantRessourceDecaisserFcfa;
    });
    return cout;
  }

  getTotalConsommeFcfa(): number {
    let cout = 0;
    this.ressourceExterieure.ressourceExterieureAnnuelles.forEach(r => {
      cout = cout + r.montantConsommeFcfa;
    });
    return cout;
  }

  getTotalEngagerForProjet(): number {
    let total = 0;
    this.projetSubmit.ressourceExterieures.forEach(rprojet => {
      total = total + this.getTotalEngagerByOneRessource(rprojet.ressourceExterieureAnnuelles);
    });
    return total;
  }

  getTotalEngagerByOneRessource(ressourceList: Array<RessourceExterieureAnnuelle>): number {
    let cout = 0;
    ressourceList.forEach(r => {
      cout = cout + r.montantRessourceApprouver;
    });
    return cout;
  }

  getTotalDecaisserByOneRessource(ressourceList: Array<RessourceExterieureAnnuelle>): number {
    let cout = 0;
    ressourceList.forEach(r => {
      cout = cout + r.montantRessourceDecaisser;
    });
    return cout;
  }

  getTotalConsommeByOneRessource(ressourceList: Array<RessourceExterieureAnnuelle>): number {
    let cout = 0;
    ressourceList.forEach(r => {
      cout = cout + r.montantConsommeFcfa;
    });
    return cout;
  }

  /*fin totaux ressources extérieures*/

  /* totaux des ressources intérieures*/

  getTotalProgrammerInterieure(): number {
    let cout = 0;
    this.ressourceInterieureAnnuelleList.forEach(r => {
      cout = cout + r.montantRessourceProgrammer;
    });
    return cout;
  }

  getTotalEngagerInterieure(): number {
    let cout = 0;
    this.ressourceInterieureAnnuelleList.forEach(r => {
      cout = cout + r.montantRessourceEngager;
    });
    return cout;
  }

  getTotalOrdonnancerInterieure(): number {
    let cout = 0;
    this.ressourceInterieureAnnuelleList.forEach(r => {
      cout = cout + r.montantRessourceOrdonnancer;
    });
    return cout;
  }

  /*fin totaux intérieure*/

  getTotalMontantRessourceExterieure(): number {
    let montantRessource: number = 0;
    this.ressourcesExterieureList.forEach(r => {
      montantRessource += r.montantRessourceProgrammer;
    });
    return montantRessource;
  }

  gotoListProjet() {
    this.router.navigate(['admin/projet/list-projet-en-cours']);
  }

  closeConfirmation(): void {
    this.modalService.confirm({
      nzTitle: 'Information',
      nzContent: '<p> Confirmez - vous la clôture du projet <br>N°Enreg. : <b>' + this.projetSubmit.id + '</b> <br>Intitulé : <b>' +
        this.projetSubmit.libelle + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzCancelText: 'Non',
      nzOnOk: () => this.closeProjet(),
      nzOnCancel: () => console.log('cancel')
    });
  }

  closeProjet(): void {
    this.projetProgrammeService.cloturer(this.projetSubmit).subscribe(
      (data: ProjetProgrammeFinalise) => {
        //this.getList();
        this.modalService.info({
          nzTitle: 'Confirmation',
          nzContent: '<p> Le projet a été clôturé avec succès !</p>',
          nzOkText: 'Oui',
          nzOkType: 'primary',
          nzCancelText: null,
          nzOnOk: () => this.gotoListProjet(),
          nzOnCancel: () => console.log('cancel')
        });
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');

      });
  }

  getListAccord(): void {

    this.accordService.list().subscribe(
      (data: Array<Accord>) => {
        this.accordList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');

      });
  }



  getListAccordAssocies(id : number): void {

    this.projetProgrammeService.listAccords(id).subscribe(
      (data: Array<Accord>) => {
        this.accordAssociesList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');

      });
  }



  joindreAccord(): void {
    console.log(this.acrd.id);
    console.log(this.paramKey);

    if (this.accordAssociesList.find(r => r.id == this.acrd.id)) {
      this.modalService.error({
        nzTitle: 'Erreur',
        nzContent: 'Cet accord est déjà selectionné',
        nzOkText: null,
        nzCancelText: 'Ok',
        nzOnCancel: () => console.log(),
      });
    } else {

    this.projetProgrammeService.joindreUnAccord(this.paramKey,this.acrd.id).subscribe(
      (data: ProjetProgramme) => {
        console.log(data);
        this.getListAccordAssocies(data.id);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');

      });
    }
  }



  enleverAccord(accordId : number): void {

    this.projetProgrammeService.enleverUnAccord(this.paramKey, accordId).subscribe(
      (data: ProjetProgramme) => {
        console.log(data);
        this.getListAccordAssocies(data.id);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');

      });
  }





  getPeriodeAnneeMois(i: number): string {
    let rep: string = '';
    rep = Math.trunc(i / 12) + ' ans ' + (i - 12 * Math.trunc(i / 12)) + ' mois';

    return rep;
  }

}
