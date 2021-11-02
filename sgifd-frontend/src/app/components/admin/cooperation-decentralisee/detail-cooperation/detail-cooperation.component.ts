import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {CooperationDecentraliseeService} from "../../../../services/cooperation-decentralisee.service";
import {User} from "../../../../models/User";
import {Ptf} from "../../../../models/Ptf";
import {Informateur} from "../../../../models/Informateur";
import {CooperationDecentralisee} from "../../../../models/CooperationDecentralisee";
import {Structure} from "../../../../models/Structure";
import {ProjetIdee} from "../../../../models/ProjetIdee";
import { Piece } from '../../../../models/Piece/Piece';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { PieceService } from '../../../../services/piece.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
import {saveAs} from "file-saver";

@Component({
  selector: 'app-detail-cooperation',
  templateUrl: './detail-cooperation.component.html',
  styleUrls: ['./detail-cooperation.component.css']
})
export class DetailCooperationComponent implements OnInit {

  validateFormFile: FormGroup;

  user: User = null;
  filter: any;

  paramKey: number;

  filesCooperation: Array<Piece> = [];

  btnFermerText = "Fermer";
  isVisibleFile: boolean = false;

 fileToUpload: File = null;
 url = environment.backend;
 @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  pieceInfo: Piece = null;
  isVisiblePieceInfo: boolean = false;

  ptfsSubmit: Array<Ptf> = [];
  informateur: Informateur = null;
  cooperationSubmit: CooperationDecentralisee = null;
  structureSubmit: Structure = null;
  projetIdeesSoumis: Array<ProjetIdee> = [];
  projetIdeesElus: Array<ProjetIdee> = [];

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private tokenStorage: TokenStorage,
              private activeRoute: ActivatedRoute,
              private pieceService: PieceService,
              private message: NzMessageService,
              private modalService: NzModalService,
               private cooperationDecentraliseeService: CooperationDecentraliseeService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }
  ngOnInit() {
    this.paramKey = this.activeRoute.snapshot.params['paramKey'];

    this.cooperationDecentraliseeService.getById(this.paramKey).subscribe(
      (data: CooperationDecentralisee) => {
        this.cooperationSubmit = data;

        this.filesCooperation = data.files;

        console.log(this.filesCooperation);

        this.ptfsSubmit = data.ptfBailleurFrs;
        this.structureSubmit=  data.structureBeneficiaire;
        this.projetIdeesElus= data.projetsElus;
        this.projetIdeesSoumis = data.projetsSoumis;
        this.informateur = data.informateur;
      });

      this.makeFormFile();

  }

  gotoListCooperation() {
    this.router.navigate(['admin/cooperation-decentralisee/list-cooperation']);
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
          this.filesCooperation.splice(i, 1);
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
            let piece: Piece = data.body;
            console.log(data);

            piece.namePiece = formDataDonnee.namePiece;
            piece.resumePiece = formDataDonnee.resumePiece;
            piece.refEmplacement = formDataDonnee.refEmplacement;
            piece.refPiece = formDataDonnee.refPiece;

            this.cooperationDecentraliseeService.saveFile(this.cooperationSubmit.id, piece).subscribe(
              (data: CooperationDecentralisee) => {
                this.filesCooperation =data.files;
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
