import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AideAlimentaire } from '../../../../models/AideAlimentaire';
import { HttpResponse, HttpRequest, HttpClient } from '@angular/common/http';
import { PieceAideAlimentaire } from '../../../../models/Piece/PieceAideAlimentaire';
import { filter } from 'rxjs/operators';
import { TokenStorage } from '../../../../utils/token.storage';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { PieceService } from '../../../../services/piece.service';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { saveAs } from 'file-saver';
import { Piece } from '../../../../models/Piece/Piece';
import { FormGroup } from '@angular/forms';
import { Informateur } from '../../../../models/Informateur';
import { User } from '../../../../models/User';
import { AideAlimentaireService } from '../../../../services/services-structure-externe/aideAlimentaire.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  paramKey: any;


  validateFormFile: FormGroup;

  aideAlimentaire: AideAlimentaire = null;
  informateur: Informateur = null;

  user: User = null;
  filter: any;

  filesAideAlimentaire: Array<Piece> = [];

  pieceInfo: Piece = null;
  isVisiblePieceInfo: boolean = false;
  btnFermerText = "Fermer";
  isVisibleRelance: boolean = false;
  isVisibleReponse: boolean = false;
  isVisibleFile: boolean = false;


  fileToUpload: File = null;
  url = environment.backend;
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  constructor(private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    private pieceService: PieceService,
    private tokenStorage: TokenStorage,
    private message: NzMessageService,
    private modalService: NzModalService,
    private aideAlimentaireService: AideAlimentaireService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.paramKey = this.activeRoute.snapshot.params['paramKey'];
  }

  ngOnInit() {

    //this.paramKey = this.activeRoute.snapshot.params['paramKey'];
    console.log(this.paramKey);

    this.aideAlimentaireService.getById(this.paramKey).subscribe(
      (data: AideAlimentaire) => {
        this.aideAlimentaire = data;

        this.filesAideAlimentaire = data.files;

        console.log(data);
        console.log(this.filesAideAlimentaire);
        console.log(this.aideAlimentaire.informateur);
        this.informateur = this.aideAlimentaire.informateur;
        console.log(this.informateur);
      });

    this.makeFormFile();
  }

  gotoListAide() {
    this.router.navigate(['admin-structure-externe/aide-secours-structure/list']);
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

  handleCancelPieceInfo(): void {
    this.pieceInfo = null;
    this.isVisiblePieceInfo = false;
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

  // Debut méthode format monnetaire
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  // Fin méthode format monnetaire

  deletePiece(i: number, p: Piece) {
    this.pieceService.delete(p).subscribe(
      (data: any) => {
        if (data != null) {
          this.filesAideAlimentaire.splice(i, 1);
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
      formData.append('file', <File>this.fileToUpload);

      const req = new HttpRequest('POST', this.url + '/piece/uploadFile', formData, {
        // reportProgress: true
      });
      this.http.request(req).pipe(filter(e => e instanceof HttpResponse))
        .subscribe(
          (data: any) => {
            let piece: PieceAideAlimentaire = data.body;
            console.log(data);

            piece.namePiece = formDataDonnee.namePiece;
            piece.resumePiece = formDataDonnee.resumePiece;
            piece.refEmplacement = formDataDonnee.refEmplacement;
            piece.refPiece = formDataDonnee.refPiece;

            this.aideAlimentaireService.saveFile(this.aideAlimentaire.id, piece).subscribe(
              (data: AideAlimentaire) => {
                this.filesAideAlimentaire = data.files;
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
