import { saveAs } from 'file-saver';
import { Bourse } from '../../../../../models/Bourse';
import { AideCapitaleService } from '../../../../../services/aide-capitale.service';
import { AideCapitale } from '../../../../../models/AideCapitale';
import { User } from '../../../../../models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TokenStorage } from '../../../../../utils/token.storage';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Promoteur } from '../../../../../models/Promoteur';
import { PieceAideCapitale } from '../../../../../models/Piece/PieceAideCapitale';
import { environment } from '../../../../../../environments/environment';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { PieceService } from '../../../../../services/piece.service';
import { Piece } from '../../../../../models/Piece/Piece';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  paramKey: number;

  aideCapitale: AideCapitale;
  promoteur: Promoteur;
  bourseList: Array<Bourse> = [];

  validateFormFile: FormGroup;

  pieceInfo: Piece = null;
  isVisiblePieceInfo: boolean = false;
  user: User = null;
  filter: any;

  filesAideCapitale: Array<Piece> = [];

  btnFermerText = "Fermer";
  isVisibleFile: boolean = false;


 fileToUpload: File = null;
 url = environment.backend;
 @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    private pieceService: PieceService,
    private tokenStorage: TokenStorage,
    private message: NzMessageService,
    private modalService: NzModalService,
    private aideCapitaleService: AideCapitaleService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {

    this.paramKey = this.activeRoute.snapshot.params['paramKey'];
    console.log(this.paramKey);

    this.aideCapitaleService.getById(this.paramKey).subscribe(
      (data: AideCapitale) => {
        this.aideCapitale = data;

        this.filesAideCapitale = data.files;
        this.bourseList = data.octroyers;
        console.log(data);
         console.log(this.filesAideCapitale);
   console.log(this.bourseList);
      });

      this.makeFormFile();
  }

  gotoListAide() {
    this.router.navigate(['admin/aides-secours/list-aide-capital-bourse']);
  }
  // Debut méthode format monnetaire
  formatNumber(num: number) : string{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  // Fin méthode format monnetaire

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
   console.log("telecharger doc" + fileName);
  }


  showMessageClosePiece(i: number, p: Piece): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de la pièce <b>'+ p.fileName +'</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType    : 'danger',
      nzCancelText: 'Non',
      nzOnOk      : () => this.deletePiece(i, p),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deletePiece(i: number, p: Piece){
    this.pieceService.delete(p).subscribe(
      (data: any) => {
        if(data != null) {
          this.filesAideCapitale.splice(i, 1);
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
            let piece: PieceAideCapitale = data.body;
            console.log(data);

            piece.namePiece = formDataDonnee.namePiece;
            piece.resumePiece = formDataDonnee.resumePiece;
            piece.refEmplacement = formDataDonnee.refEmplacement;
            piece.refPiece = formDataDonnee.refPiece;

            this.aideCapitaleService.saveFile(this.aideCapitale.id, piece).subscribe(
              (data: AideCapitale) => {
                this.filesAideCapitale =data.files;
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
