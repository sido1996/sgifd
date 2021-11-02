import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PPP } from '../../../../models/PPP';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PPPService } from '../../../../services/ppp.service';
import { CommissionMixteDspService } from '../../../../services/commission-mixte-dsp.service';
import { ProjetIdee } from '../../../../models/ProjetIdee';
import { AxePrioritaire } from '../../../../models/AxePrioritaire';
import { FormGroup } from '@angular/forms';
import { Piece } from '../../../../models/Piece/Piece';
import { environment } from '../../../../../environments/environment';
import { saveAs } from 'file-saver';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { PieceService } from '../../../../services/piece.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { AxePrioritaireCommission } from '../../../../models/AxePrioritaireCommission';
import {PieceCommisionMixteDSP} from '../../../../models/Piece/PieceCommisionMixteDSP';
import {CommissionMixteDsp} from "../../../../models/CommissionMixteDsp";

@Component({
  selector: 'app-detail-commission-mixte-dsp',
  templateUrl: './detail-commission-mixte-dsp.component.html',
  styleUrls: ['./detail-commission-mixte-dsp.component.css']
})
export class DetailCommissionMixteDspComponent implements OnInit {


  commissionMixteDspSubmit: CommissionMixteDsp = null;
  axePrioritaireCommissionsDspSubmit: Array<AxePrioritaireCommission> = [];
  projetIdeesSubmit: Array<ProjetIdee> = [];

  filter: any;

  validateFormFile: FormGroup;
  commissionMixteDsp: CommissionMixteDsp;
  filesRequete: Array<PieceCommisionMixteDSP> = [];
  isVisibleFile: boolean = false;
  fileToUpload: File = null;
  url = environment.backend;
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  paramKey: number;

  pieceInfo: Piece = null;
  isVisiblePieceInfo: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private message: NzMessageService,
    private modalService: NzModalService,
    private pieceService: PieceService,
    private http: HttpClient,
    private commissionMixteDspService: CommissionMixteDspService, ) { }

  ngOnInit() {

    this.paramKey = this.activeRoute.snapshot.params['paramKey'];

    this.commissionMixteDspService.getById(this.paramKey).subscribe(
      (data: CommissionMixteDsp) => {
        this.commissionMixteDsp = data;
        this.commissionMixteDspSubmit = data;
        console.log(this.commissionMixteDspSubmit);
        this.projetIdeesSubmit = data.projetProgrammeIdees;
        console.log(this.projetIdeesSubmit);
        this.axePrioritaireCommissionsDspSubmit = data.axePrioritaireCommissions;
        console.log(this.axePrioritaireCommissionsDspSubmit);
      });

    this.makeFormFile();

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
        this.fileInput.nativeElement.value = '';
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

            this.commissionMixteDspService.saveFile(this.commissionMixteDsp.id, piece).subscribe(
              (data: CommissionMixteDsp) => {
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

  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload.name);
  }

  showModalPiece(): void {
    this.isVisibleFile = true;
  }

  downloadFile(fileName: string) {
    this.pieceService.downloadFile(fileName).subscribe(data => saveAs(data, fileName));
  }

  /* fin des éléments de téléchargement de fichier */


  showModalPieceInfo(piece: Piece): void {
    this.pieceInfo = piece;
    this.isVisiblePieceInfo = true;
  }

  handleCancelPieceInfo(): void {
    this.pieceInfo = null;
    this.isVisiblePieceInfo = false;
  }

  // Debut méthode format monnetaire
  formatNumber(num: number) : string{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  // Fin méthode format monnetaire

}
