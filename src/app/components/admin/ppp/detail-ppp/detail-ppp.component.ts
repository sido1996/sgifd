import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {PPP} from '../../../../models/PPP';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {PPPService} from '../../../../services/ppp.service';
import {Promoteur} from '../../../../models/Promoteur';
import {ProjetProgramme} from '../../../../models/ProjetProgramme';
import {PrevisionRealisationPPP} from '../../../../models/PrevisionRealisationPPP';
import {User} from '../../../../models/User';
import {Piece} from '../../../../models/Piece/Piece';
import {environment} from '../../../../../environments/environment';
import {PieceService} from '../../../../services/piece.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {TokenStorage} from '../../../../utils/token.storage';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from "@angular/common/http";
import {filter} from 'rxjs/operators';
import {saveAs} from "file-saver";

@Component({
  selector: 'app-detail-ppp',
  templateUrl: './detail-ppp.component.html',
  styleUrls: ['./detail-ppp.component.css']
})
export class DetailPppComponent implements OnInit {

  validateFormFile: FormGroup;

  user: User = null;
  filter: any;

  filesPPP: Array<Piece> = [];

  pieceInfo: Piece = null;
  isVisiblePieceInfo: boolean = false;
  promoteursSubmit: Array<Promoteur> = [];
  pppSubmit: PPP = null;
  projetSubmit: ProjetProgramme = null;
  previvionRealisationSubmit: Array<PrevisionRealisationPPP> = [];

  paramKey: number;

  btnFermerText = "Fermer";
  isVisibleFile: boolean = false;


  fileToUpload: File = null;
  url = environment.backend;
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private pieceService: PieceService,
              private tokenStorage: TokenStorage,
              private message: NzMessageService,
              private modalService: NzModalService,
              private pppService: PPPService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {

    this.paramKey = this.activeRoute.snapshot.params['paramKey'];

    this.pppService.getById(this.paramKey).subscribe(
      (data: PPP) => {
        this.pppSubmit = data;

        this.filesPPP = data.files;

        console.log(this.filesPPP);
        this.projetSubmit = data.projetProgrammeIdee;
        this.promoteursSubmit = data.promoteurs;
        this.previvionRealisationSubmit = data.previsionRealisationPPPs;
      });

    this.makeFormFile();

  }


  handleCancelReponse(): void {
    console.log('Button cancel clicked!');
    this.isVisibleFile = false;
  }

  showModalPieceInfo(piece: Piece): void {
    this.pieceInfo = piece;
    this.isVisiblePieceInfo = true;
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
          this.filesPPP.splice(i, 1);
        }
        this.fileInput.nativeElement.value = "";
        this.validateFormFile.reset();
      });
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }


  makeFormFile(): void {
    this.validateFormFile = this.fb.group({
      namePiece: [null, [Validators.required,]],
      refPiece: [null, [Validators.required,]],
      refEmplacement: [null,],
      resumePiece: [null,],
    });
  }

  // Debut méthode format monnetaire
  formatNumber(num: number) : string{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  // Fin méthode format monnetaire

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

            this.pppService.saveFile(this.pppSubmit.id, piece).subscribe(
              (data: PPP) => {
                this.filesPPP = data.files;
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

  gotoListPPP() {
    this.router.navigate(['admin/ppp/list-ppp']);
  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload.name);
  }

}
