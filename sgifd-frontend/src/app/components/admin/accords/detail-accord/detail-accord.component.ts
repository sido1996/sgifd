import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Accord} from '../../../../models/Accord';
import {Ptf} from '../../../../models/Ptf';
import {Structure} from '../../../../models/Structure';
import {ProjetIdee} from '../../../../models/ProjetIdee';
import {ConditionSuspensiveAccord} from '../../../../models/ConditionSuspensiveAccord';
import {ConditionSuspensiveUnDecaissement} from '../../../../models/ConditionSuspensiveUnDecaissement';
import {AccordService} from '../../../../services/accord.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Piece} from './../../../../models/Piece/Piece';
import {PieceService} from 'src/app/services/piece.service';
import {NzMessageService} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {FormGroup, Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {HttpClient, HttpResponse, HttpRequest} from '@angular/common/http';
import {filter} from 'rxjs/operators';
import {saveAs} from 'file-saver';
import {NatureFinancement} from './../../../../models/NatureFinancement';
import {environment} from './../../../../../environments/environment';
import {ProjetProgrammeIdee} from "../../../../models/ProjetProgrammeIdee";

@Component({
  selector: 'app-detail-accord',
  templateUrl: './detail-accord.component.html',
  styleUrls: ['./detail-accord.component.css']
})
export class DetailAccordComponent implements OnInit {

  paramKey: number;
  accordSubmit: Accord = null;
  /*ptfSubmit: Array<Ptf> = [];
   structureSubmit: Structure = null;
  natureFinancementSubmit: NatureFinancement = null; */
  projetIdeesSubmit: Array<ProjetProgrammeIdee> = [];
  /* conditionSuspensiveAccords: Array<ConditionSuspensiveAccord> = [];
  conditionSuspensiveUnDecaissements: Array<ConditionSuspensiveUnDecaissement> = []; */




  validateFormFile: FormGroup;
  accord: Accord;
  filesRequete: Array<Piece> = [];
  isVisibleFile: boolean = false;
  fileToUpload: File = null;
  selectedValue: string ;
  url = environment.backend;
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  pieceInfo: Piece = null;
  isVisiblePieceInfo: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private accordService: AccordService,
    private pieceService: PieceService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    this.paramKey = this.activeRoute.snapshot.params['paramKey'];

    this.accordService.getById(this.paramKey).subscribe(
      (data: Accord) => {
        console.log(data);
        this.accord = data;
        this.accordSubmit = data;
        this.selectedValue = this.accordSubmit.categorie;
        this.filesRequete = data.files;
        this.projetIdeesSubmit = data.projetProgrammeIdees;
        console.log(this.projetIdeesSubmit);

      });
    this.makeFormFile();

  }

  initialiseFormulaire(): void {
    this.router.navigate(['admin/accords/list-accord/']);
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
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

  handleCancelReponse(): void {
    console.log('Button cancel clicked!');
    this.isVisibleFile = false;
    this.validateFormFile.reset();
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
      formData.append('Content-Type', 'multipart/form-data');
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

            this.accordService.saveFile(this.accord.id, piece).subscribe(
              (data: Accord) => {
                this.filesRequete = data.files;
                this.fileInput.nativeElement.value = '';
                this.validateFormFile.reset();
              });
          },
          err => {

            this.fileInput.nativeElement.value = '';
            this.message.error('Chargement du fichier échoué.');
          });

    } else {
      this.createMessage('error', 'Formulaire invalide !');
    }
  }
/* Debut méthode format monnetaire */
  formatNumber(num: number) : string{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  /* Fin méthode format monnetaire */
  showModalPieceInfo(piece: Piece): void {
    this.pieceInfo = piece;
    this.isVisiblePieceInfo = true;
  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload.name);
  }

  handleCancelPieceInfo(): void {
    this.pieceInfo = null;
    this.isVisiblePieceInfo = false;
  }

  showModalPiece(): void {
    this.isVisibleFile = true;
  }

  downloadFile(fileName: string) {
    this.pieceService.downloadFile(fileName).subscribe(data => saveAs(data, fileName));
  }

  /* fin des éléments de téléchargement de fichier */
}
