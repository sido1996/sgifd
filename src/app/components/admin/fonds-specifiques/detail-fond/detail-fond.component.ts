import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FondSpecifique} from "../../../../models/FondSpecifique";
import {FondSpecifiqueService} from "../../../../services/fond-specifique.service";
import {Ptf} from '../../../../models/Ptf';
import {DetailFondSpecifique} from '../../../../models/DetailFondSpecifique';
import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import {User} from '../../../../models/User';
import {Piece} from '../../../../models/Piece/Piece';
import {environment} from '../../../../../environments/environment';
import {TokenStorage} from '../../../../utils/token.storage';
import {PieceService} from '../../../../services/piece.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {filter} from 'rxjs/operators';
import {saveAs} from "file-saver";

@Component({
  selector: 'app-detail-fond',
  templateUrl: './detail-fond.component.html',
  styleUrls: ['./detail-fond.component.css']
})
export class DetailFondComponent implements OnInit {

  validateFormFile: FormGroup;

  fondSpecifiqueSubmit: FondSpecifique = null;

  user: User = null;
  filter: any;

  paramKey: number;

  filesFondSpecifique: Array<Piece> = [];

  detailFondSpecifiqueSubmit: Array<DetailFondSpecifique> = [];
  ptfsSubmit: Array<Ptf> = [];

  btnFermerText = "Fermer";
  isVisibleFile: boolean = false;
  isVisiblePieceInfo: boolean = false;
  pieceInfo: Piece = null;
  fileToUpload: File = null;
  url = environment.backend;
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private tokenStorage: TokenStorage,
              private activeRoute: ActivatedRoute,
              private pieceService: PieceService,
              private message: NzMessageService,
              private modalService: NzModalService,
              private fondSpeficiqueService: FondSpecifiqueService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {

    this.paramKey = this.activeRoute.snapshot.params['paramKey'];

    this.fondSpeficiqueService.getById(this.paramKey).subscribe(
      (data: FondSpecifique) => {
        this.fondSpecifiqueSubmit = data;

        this.filesFondSpecifique = data.files;

        console.log(this.filesFondSpecifique);
        this.detailFondSpecifiqueSubmit = data.detailFondSpecifiques;
        this.ptfsSubmit = data.ptfBailleurFrs;
        console.log(this.detailFondSpecifiqueSubmit);
        console.log(this.ptfsSubmit);

      });

    this.makeFormFile();

  }

  gotoListFonds() {
    this.router.navigate(['admin/fonds-specifiques/list-fond-specifique']);
  }


  handleCancelPieceInfo(): void {
    this.pieceInfo = null;
    this.isVisiblePieceInfo = false;
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
    console.log("telecharger doc" + fileName);
  }

  showModalPieceInfo(piece: Piece): void {
    this.pieceInfo = piece;
    this.isVisiblePieceInfo = true;
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
          this.filesFondSpecifique.splice(i, 1);
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

            this.fondSpeficiqueService.saveFile(this.fondSpecifiqueSubmit.id, piece).subscribe(
              (data: FondSpecifique) => {
                this.filesFondSpecifique = data.files;
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

}
