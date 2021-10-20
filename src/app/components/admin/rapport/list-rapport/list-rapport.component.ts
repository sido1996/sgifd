import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzModalService} from "ng-zorro-antd";
import {RapportService} from "../../../../services/rapport.service";
import {Rapport} from "../../../../models/rapport";
import {FonctionnaliteUser} from "../../../../models/FonctionnaliteUser";
import {HttpErrorResponse} from "@angular/common/http";
import {ProjetProgramme} from "../../../../models/ProjetProgramme";
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-list-rapport',
  templateUrl: './list-rapport.component.html',
  styleUrls: ['./list-rapport.component.css']
})
export class ListRapportComponent implements OnInit {

  rapports: Rapport[] = [];

  filter: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,
    private rapportService: RapportService,
  ) { }

  ngOnInit() {
    this.getList();

  }

  generatePdf(): void {

    let element = document.getElementById('element-to-print');
    html2pdf(element);
  }

  getList(): void {
    this.rapportService.list().subscribe(
      (data: Array<Rapport>) => {
        this.rapports = data;
        this.rapports = [...this.rapports];
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  ouvrirModifier(id: number): void {
    this.router.navigate(['admin/rapport/modifier-rapport/' + id]);
  }

  ouvrirEditer(id: number): void {
    this.router.navigate(['admin/rapport/editer-rapport/' + id]);
  }


  deleteRapport(rapport: Rapport): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression du rapport. : <b>'+ rapport.libelle+'</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType    : 'danger',
      nzCancelText: 'Non',
      nzOnOk      : () => this.deleteOneRapport(rapport),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneRapport(rapport): void {
    this.rapportService.delete(rapport).subscribe(
      (data: ProjetProgramme) => {
        //this.getList();
        this.rapports.splice(this.rapports.findIndex(
          r=> r.id === rapport.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        //this.notificationTable('danger', 'Echec de la suppression !');
      });
  }

}
