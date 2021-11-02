import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppuiBudgetaire } from '../../../../models/AppuiBudgetaire';
import { Ptf } from '../../../../models/Ptf';
import { Structure } from '../../../../models/Structure';
import { NatureFinancement } from '../../../../models/NatureFinancement';
import { DeviseMonaie } from '../../../../models/DeviseMonaie';
import { AppuiBudgetaireService } from '../../../../services/appui-budgetaire.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PieceService } from '../../../../services/piece.service';
import { TokenStorage } from '../../../../utils/token.storage';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { Piece } from '../../../../models/Piece/Piece';
import { User } from '../../../../models/User';
import { environment } from '../../../../../environments/environment';
import { Validators } from '@angular/forms';
import { HttpRequest } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { PieceAppuiBudgetaire } from '../../../../models/Piece/PieceAppuiBudgetaire';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-detail-appuis-budgetaires',
  templateUrl: './detail-appuis-budgetaires.component.html',
  styleUrls: ['./detail-appuis-budgetaires.component.css']
})
export class DetailAppuisBudgetairesComponent implements OnInit {

  paramKey: number;

  appuiBudgetaireSubmit: AppuiBudgetaire = null;
  ptfSubmit: Ptf = null;
  structureSubmit: Structure = null;
  natureFinancementSubmit: NatureFinancement = null;
  deviseMonnaieSubmit: DeviseMonaie = null;

  validateFormFile: FormGroup;

  pieceInfo: Piece = null;
  isVisiblePieceInfo: boolean = false;
  user: User = null;
  filter: any;

  filesAppuiBudgetaire: Array<Piece> = [];

  btnFermerText = "Fermer";
  isVisibleFile: boolean = false;


 fileToUpload: File = null;
 url = environment.backend;
 @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  constructor(
    private appuibudgetaireService: AppuiBudgetaireService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private pieceService: PieceService,
    private tokenStorage: TokenStorage,
    private message: NzMessageService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.paramKey = this.activeRoute.snapshot.params['id'];
    console.log(this.paramKey);

    this.appuibudgetaireService.getById(this.paramKey).subscribe(
      (data: AppuiBudgetaire) => {
        console.log(data);
        this.appuiBudgetaireSubmit = data;
        console.log(this.appuiBudgetaireSubmit);
      });
      this.makeFormFile();
  }

  gotoListAppuiBudgetaire() {
    this.router.navigate(['admin-ptf/list-appuis-budgetaire']);
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
          this.filesAppuiBudgetaire.splice(i, 1);
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
            let piece: PieceAppuiBudgetaire = data.body;
            console.log(data);

            piece.namePiece = formDataDonnee.namePiece;
            piece.resumePiece = formDataDonnee.resumePiece;
            piece.refEmplacement = formDataDonnee.refEmplacement;
            piece.refPiece = formDataDonnee.refPiece;

            this.appuibudgetaireService.saveFile(this.appuiBudgetaireSubmit.id, piece).subscribe(
              (data: AppuiBudgetaire) => {
                this.filesAppuiBudgetaire =data.files;
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
