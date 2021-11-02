import { Promoteur } from './../../../../models/Promoteur';
import { Ide } from './../../../../models/Ide';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Arrondissement } from 'src/app/models/Arrondissement';
import { HttpErrorResponse } from '@angular/common/http';
import { Commune } from 'src/app/models/Commune';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorage } from 'src/app/utils/token.storage';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { saveAs } from 'file-saver';
import { IdeService } from 'src/app/services/ide.service';
import { Piece } from './../../../../models/Piece/Piece';
import { PieceService } from 'src/app/services/piece.service';
import { HttpClient } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  paramKey: number;
  ideSubmit: Ide;
  promoteur: Promoteur;

  user: User = null;

  validateFormFile: FormGroup;
  ide: Ide = null;
  filesRequete: Array<Piece> = [];
  isVisibleFile: boolean = false;
  fileToUpload: File = null;
  url = environment.backend;
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  pieceInfo: Piece = null;
  isVisiblePieceInfo: boolean = false;

  constructor(private router: Router,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private tokenStorage: TokenStorage,
    private message: NzMessageService,
    private modalService: NzModalService,
    private pieceService: PieceService,
    private http: HttpClient,
    private ideService: IdeService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {

    this.paramKey = this.activeRoute.snapshot.params['paramKey'];
    console.log(this.paramKey);

    this.ideService.getById(this.paramKey).subscribe(
      (data: Ide) => {
        this.ide = data;
        this.ideSubmit = data;
        console.log(data);
      });

      this.makeFormFile();
  }
  gotoListIde() {
    this.router.navigate(['admin/ide/list-ide']);
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
// Debut méthode format monnetaire
  formatNumber(num: number) : string{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  // Fin méthode format monnetaire
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

          this.ideService.saveFile(this.ide.id, piece).subscribe(
            (data: Ide) => {
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

}
