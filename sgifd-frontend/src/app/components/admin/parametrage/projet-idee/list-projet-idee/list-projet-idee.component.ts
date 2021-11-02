import {Component, OnInit} from '@angular/core';
import {ProjetProgramme} from '../../../../../models/ProjetProgramme';
import {User} from '../../../../../models/User';
import {Router} from '@angular/router';
import {TokenStorage} from '../../../../../utils/token.storage';
import {NzModalService} from 'ng-zorro-antd';
import {ProjetProgrammeService} from '../../../../../services/projet-programme.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Exercice} from "../../../../../models/Exercice";
import {Structure} from "../../../../../models/Structure";
import {StructureService} from "../../../../../services/structure.service";
import {ExerciceService} from "../../../../../services/exercice.service";

@Component({
  selector: 'app-list-projet-idee',
  templateUrl: './list-projet-idee.component.html',
  styleUrls: ['./list-projet-idee.component.css']
})
export class ListProjetIdeeComponent implements OnInit {

  exerciceList: Array<Exercice> = [];
  structureList: Array<Structure> = [];
  projetIdeeList: Array<ProjetProgramme> = [];

  user: User = null;
  exerciceModel: Exercice;
  structureModel: Structure;
  filter: any;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,
    private structureService: StructureService,
    private exerciceService: ExerciceService,
    private projetProgrammeService: ProjetProgrammeService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getList();
    this.getListExercice();
    this.getStructureList();
  }

  getList(): void {
    if (this.exerciceModel == null || this.structureModel == null) {
      this.projetIdeeList = [];
    } else {
      this.projetProgrammeService.listByAnneeByStructure(this.exerciceModel.id, this.structureModel.id).subscribe(
        (data: Array<ProjetProgramme>) => {
          this.projetIdeeList = data;
        },
        (error: HttpErrorResponse) => {
          console.log('Echec !');
        });
    }

  }

  ouvrirModifier(id: number): void {
    this.router.navigate(['admin/parametrage/modification-projet-idee/' + id]);
  }

  ouvrirDetail(id: number): void {
    this.router.navigate(['admin/parametrage/detail-projet-idee/' + id]);
  }

  deleteProjet(projetIdee: ProjetProgramme): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression du projet Réf. <b>' + projetIdee.reference + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deleteOneRequete(projetIdee),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneRequete(req: ProjetProgramme): void {
    req.deleteBy = this.user.username;
    this.projetProgrammeService.delete(req).subscribe(
      (data: ProjetProgramme) => {
        //this.getList();
        this.projetIdeeList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        //this.notificationTable('danger', 'Echec de la suppression !');
      });
  }

  getStructureList(): void {
    this.structureService.list().subscribe(
      (data: Array<Structure>) => {
        this.structureList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListExercice(): void {
    this.exerciceService.list().subscribe(
      (data: Array<Exercice>) => {
        this.exerciceList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  indexOfElement(id: number): number {
    let index = -1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.projetIdeeList.length && rep === false) {
      if (this.projetIdeeList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }


}
