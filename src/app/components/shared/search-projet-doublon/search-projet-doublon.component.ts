import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from "ng-zorro-antd";
import {ProjetProgrammeService} from "../../../services/projet-programme.service";
import {Arrondissement} from "../../../models/Arrondissement";
import {ZoneLocalite} from "../../../models/ZoneLocalite";
import {ProjetProgrammeFinalise} from "../../../models/ProjetProgrammeFinalise";

@Component({
  selector: 'app-search-projet-doublon',
  templateUrl: './search-projet-doublon.component.html',
  styleUrls: ['./search-projet-doublon.component.css']
})
export class SearchProjetDoublonComponent implements OnInit {

  @Input() keyWordSearching: string = '';
  rowData: any[] = [];

  constructor(
    private modal: NzModalRef,
    private projetProgrammeService: ProjetProgrammeService,
  ) { }

  ngOnInit() {
    this.rowData = [];
    if(this.keyWordSearching != null && this.keyWordSearching != '') {
        /*const resultSplit = "("+(this.keyWordSearching.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '|')).replace(' ', '|')+")";*/
        let resultSplit = (this.keyWordSearching.trim()).replace(/[&\/\\#\-\_,+()$~%.":*?<>{}]/g, ' ');
        console.log(resultSplit);
        let resultSplitBefore = resultSplit.split(' ');
        let resultSpliteAfter = "";
        if(resultSplitBefore.length > 0) {
          resultSplitBefore.forEach((r, index) => {
            if(r != '') {
              //if(index != (resultSplitBefore.length - 1)) {
                resultSpliteAfter += "AND libelle LIKE '%"+ r.replace("'", "''") + "%' ";
             // }
            }
          });
        }
        console.log(resultSpliteAfter);
        this.projetProgrammeService.verifierDoublonByLibelle(resultSpliteAfter)
          .subscribe((data: ProjetProgrammeFinalise[]) => {
            console.log(data);
            if(data != null && data.length > 0) {
              this.rowData = data;
              this.rowData = [...this.rowData];
            }
          }, err => {
            console.log(err);
          });
      }
  }

  formatNumber(num: number) : string {
    return num != null && num != undefined ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') : '0';
  }

  choisirProjet(id: number): void {
    this.projetProgrammeService.getById(id)
      .subscribe((data: any) => {
        this.modal.destroy(data);
      }, err => {
        console.log(err);
        this.modal.destroy(null);
      });
  }

  destroyModal(): void {
    this.modal.destroy(null);
  }

}
