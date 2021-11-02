import {AideAlimentaire} from '../../../../../models/AideAlimentaire';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../../models/User';
import {Router} from '@angular/router';
import {TokenStorage} from '../../../../../utils/token.storage';
import {NzModalService} from 'ng-zorro-antd';
import {HttpErrorResponse} from '@angular/common/http';
import {Informateur} from '../../../../../models/Informateur';
import {ExerciceService} from '../../../../../services/exercice.service';
import {Exercice} from '../../../../../models/Exercice';
import {InformateurService} from '../../../../../services/informateur.service';
import {AideAlimentaireService} from '../../../../../services/aideAlimentaire.service';
import {PtfService} from '../../../../../services/ptf.service';
import {StructureService} from '../../../../../services/structure.service';
import {Ptf} from '../../../../../models/Ptf';
import {Structure} from '../../../../../models/Structure';
import {FindValues} from '../../../../../payload/FindValues';
import {DeviseMonaieService} from '../../../../../services/devise-monaie.service';
import {DeviseMonaie} from '../../../../../models/DeviseMonaie';
import {NatureAideAlimentaireDetail} from "../../../../../models/nature-aide-alimentaire-detail";
import {NatureAideAlimentaire} from "../../../../../models/nature-aide-alimentaire";
import {NatureAideAlimentaireService} from "../../../../../services/nature-aide-alimentaire.service";
import {NatureAideAlimentaireDetailService} from "../../../../../services/nature-aide-alimentaire-detail.service";

@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.component.html',
  styleUrls: ['./nouveau.component.css']
})
export class NouveauComponent implements OnInit {

  validateFormNatureAideAlimentaireDetail: FormGroup;
  natureAideAlimentaireList: Array<NatureAideAlimentaire> = [];
  isNotificationFormNatureAideAlimentaireDetail: boolean = false;
  typeNotificationFormNatureAideAlimentaireDetail: string;
  messageNotificationFormNatureAideAlimentaireDetail: string;
  natureAideAlimentaireDetailList: Array<NatureAideAlimentaireDetail> = [];

  validateForm: FormGroup;
  validateFormInformateur: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationFormInformateur: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  typeNotificationFormInformateur: string;
  messageNotificationForm: string;
  messageNotificationFormInformateur: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;
  btnTitleInformateur: string;
  deviseMonaieList: Array<DeviseMonaie> = [];
  aideAlimentaire: AideAlimentaire = null;
  informateur: Informateur = null;
  informateurList: Informateur[] = [];
  exerciceList: Array<Exercice> = [];
  ptfList: Array<Ptf> = [];
  sourceInformationList: Array<Structure> = [];

  private findValues: FindValues = new FindValues();

  filter: any;
  filter3: any = null;
  user: User = null;

  isVisibleInformateur = false;


  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorage,
              private modalService: NzModalService,
              private exerciceService: ExerciceService,
              private ptfService: PtfService,
              private structureService: StructureService,
              private informateurService: InformateurService,
              private deviseMonaieService: DeviseMonaieService,
              private aideAlimentaireService: AideAlimentaireService,
              private natureAideAlimentaireDetailService: NatureAideAlimentaireDetailService,
              private natureAideAlimentaireService: NatureAideAlimentaireService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }


  ngOnInit() {
    this.initFormInformateur(null);
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm();
    this.makeFormNatureAideAlimentaireDetail();
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.btnTitleInformateur = 'Enregistrer';
    this.makeListAnnee();
    this.makeListPtf();
    this.getListDevise();
    this.makeListInformateur(null);
    this.makeListSourceInformation();
    this.getListNatureAideLimentaire();
  }

  showModalInformateur(): void {
      this.isVisibleInformateur = true;
  }

  handleOkInformateur(): void {
    console.log('Button ok clicked!');
    this.isVisibleInformateur = false;
  }

  handleCancelInformateur(): void {
    console.log('Button cancel clicked!');
    this.isVisibleInformateur = false;
  }


  initFormInformateur(informateur: Informateur) {
    this.validateFormInformateur = this.fb.group({
      nom: [(informateur != null) ? informateur.nom : null,
        [Validators.required]],
      prenom: [(informateur != null) ? informateur.prenom : null,
        [Validators.required]],
      tel: [(informateur != null) ? informateur.tel : null,
        [Validators.required]],
      email: [(informateur != null) ? informateur.email : null,
        [Validators.required]],
      profession: [(informateur != null) ? informateur.profession : null,
        [Validators.required]],
      sourceInformation: [(informateur != null && informateur.sourceInformation != null) ? informateur.sourceInformation.id : null,
        [Validators.required]],
    });
    this.informateur = informateur;
  }

  makeForm(): void {
    this.validateForm = this.fb.group({
      exercice: [null, [Validators.required]],
      ptfBailleurFrs: [null, [Validators.required,]],
      montant: [null, [Validators.required,]],
      montantDevise: [null, [Validators.required,]],
      deviseMonnaie: [null, [Validators.required,]],
      observations: [null, [Validators.required,]],
    });
  }

  submitForm(): void {

    if (this.validateFormInformateur.valid === true) {
      const formData = this.validateFormInformateur.value;
      if (this.informateur == null) {
        this.informateur = new Informateur(null,
          formData.nom,
          formData.prenom,
          formData.tel, formData.email,
          formData.profession,
          this.user.username,
          null,
          this.findValues.getObjectInList(formData.sourceInformation, this.sourceInformationList))
      } else {
        this.informateur.nom = formData.nom;
        this.informateur.prenom = formData.prenom;
        this.informateur.tel = formData.tel;
        this.informateur.email = formData.email;
        this.informateur.profession = formData.profession;
        this.informateur.sourceInformation = this.findValues.getObjectInList(formData.sourceInformation, this.sourceInformationList);
      }
      console.log(this.informateur);
      if (this.checkDoublonElementInformateur(this.informateur) === false) {
        //this.communeList.unshift(this.commune);
        this.informateurService.save(this.informateur).subscribe(
          (data: Informateur) => {
            this.informateur = data;

            if (this.informateur.id != null) {
              this.informateurList.splice(this.indexOfElementInformateur(data.id), 1);
            }
            this.informateurList.unshift(data);

            const formData = this.validateForm.value;

            this.aideAlimentaire = new AideAlimentaire(null, formData.exercice, formData.ptfBailleurFrs, null,
              formData.montant, this.informateur, formData.observations, null, this.user.username, null,
              formData.montantDevise, formData.deviseMonnaie, this.natureAideAlimentaireDetailList);

            console.log(this.aideAlimentaire);

            this.aideAlimentaireService.save(this.aideAlimentaire).subscribe(
              (data: AideAlimentaire) => {
                console.log(this.aideAlimentaire);

                this.notificationForm('success', 'Enregistrement effectué !');
                this.modalService.info({
                  nzTitle: 'Information',
                  nzContent: '<p> L\'aide a été enregistrée avec succès au numéro :  <strong>' + data.id +
                    '</strong> pour un montant de <strong>' + data.montant + ' francs CFA </strong> .</p>',
                  nzOkText: null,
                  nzCancelText: 'Ok',
                  nzOnCancel: () => this.initialiseFormulaire()
                });
              },
              (error: HttpErrorResponse) => {
                this.notificationForm('danger', 'Echec de l\'enregistrement !');
              });

          },
          (error: HttpErrorResponse) => {
            //   this.router.navigate(['dashboard']);
            this.notificationFormInformateur('danger', 'Echec de l\'enregistrement !');
          });
      } else {
        this.notificationFormInformateur('danger', 'Doublon d\'enregistrement !');
      }

    } else {
      this.notificationFormInformateur('danger', 'Formulaire invalide !');
    }

  }

  initialiseFormulaire(): void {
    this.aideAlimentaire = null;
    this.natureAideAlimentaireDetailList = [];
    this.natureAideAlimentaireDetailList = [...this.natureAideAlimentaireDetailList];
    this.btnTitle = 'Enregistrer';
    this.validateForm.reset();
    this.validateFormInformateur.reset();
  }

  notificationForm(type: string, msg: string) {
    this.typeNotificationForm = type;
    this.messageNotificationForm = msg;
    this.isNotificationForm = true;
  }

  notificationFormInformateur(type: string, msg: string) {
    this.typeNotificationFormInformateur = type;
    this.messageNotificationFormInformateur = msg;
    this.isNotificationFormInformateur = true;
  }

  notificationTable(type: string, msg: string) {
    this.typeNotificationTable = type;
    this.messageNotificationTable = msg;
    this.isNotificationTable = true;
  }

  closeNotificationForm() {
    this.isNotificationForm = false;
    this.isNotificationFormNatureAideAlimentaireDetail = false;
  }

  closeNotificationFormInformateur() {
    this.isNotificationFormInformateur = false;
  }

  closeNotificationTable() {
    this.isNotificationTable = false;
  }

  get f() {
    return this.validateForm.controls;
  }

  makeListAnnee(): void {
    this.exerciceService.list().subscribe(
      (data: Array<Exercice>) => {
        this.exerciceList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  getListDevise(): void {
    this.deviseMonaieService.list().subscribe(
      (data: Array<DeviseMonaie>) => {
        this.deviseMonaieList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }


  makeListPtf(): void {
    this.ptfService.list().subscribe(
      (data: Array<Ptf>) => {
        this.ptfList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  makeListSourceInformation(): void {
    this.structureService.list().subscribe(
      (data: Array<Structure>) => {
        this.sourceInformationList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  makeListInformateur(sourceInformation: number): void {
    console.log(sourceInformation);
    this.informateurList = [];
    if(sourceInformation != null) {
      this.informateurService.listBySourceInformation(sourceInformation).subscribe(
        (data: Informateur[]) => {
          this.informateurList = data;
          this.informateurList = [...this.informateurList];
          console.log(this.informateurList);
        },
        (error: HttpErrorResponse) => {
          console.log('Echec !');
        }
      );
    }
    this.informateurList = [...this.informateurList];
  }

  gotoListAide() {
    this.router.navigate(['admin/aides-secours/list-aides-alimentaires']);
  }


  select(informateur) {
    this.informateur = informateur;
    this.initFormInformateur(informateur);
    this.btnTitle = 'modifier';
    this.isVisibleInformateur = false;
  }


  indexOfElementInformateur(id: number): number {
    let index = -1;
    index = this.informateurList.findIndex(i => i.id == id);

    return index;
  }

  checkDoublonElementInformateur(informateur: Informateur): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.informateurList.length && rep === false) {
      if (this.informateurList[i].tel === informateur.tel && this.informateurList[i].email === informateur.email &&
        this.informateurList[i].id != informateur.id) {
        rep = true;
      }
      i++;
    }
    return rep;
  }

  //nature aide alimentaire
  makeFormNatureAideAlimentaireDetail(): void {
    this.validateFormNatureAideAlimentaireDetail = this.fb.group({
      quantite: [null, [Validators.required]],
      natureAideAlimentaire: [null, [Validators.required,]],
      caracteristique: [null, [Validators.required,]],
      montantDevise: [0],
      montant: [0],
    });
  }

  getListNatureAideLimentaire(): void {
    this.natureAideAlimentaireService.list().subscribe(
      (data: Array<NatureAideAlimentaire>) => {
        this.natureAideAlimentaireList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  submitFormNatureAideAlimentaireDetail(): void {
    if (this.validateFormNatureAideAlimentaireDetail.valid === true) {
      const formData = this.validateFormNatureAideAlimentaireDetail.value;

      const i = this.natureAideAlimentaireDetailList.findIndex(n => n.natureAideAlimentaire.id
        == formData.natureAideAlimentaire.id);
      if (i > -1) {
        this.notificationFormNatureAideAlimentaireDetail('danger', 'Doublon d\'enregistrement !');
      } else {
        console.log(formData);

        this.natureAideAlimentaireDetailService.save(formData).subscribe(
          (data: NatureAideAlimentaireDetail) => {
            this.natureAideAlimentaireDetailList.unshift(data);
            this.validateFormNatureAideAlimentaireDetail.reset();
          },
          (error: HttpErrorResponse) => {
            this.notificationFormNatureAideAlimentaireDetail('danger', 'Echec de l\'enregistrement !');
          });
      }

    } else {
      this.notificationFormNatureAideAlimentaireDetail('danger', 'Formulaire invalide !');
    }
  }

  notificationFormNatureAideAlimentaireDetail(type: string, msg: string) {
    this.typeNotificationFormNatureAideAlimentaireDetail = type;
    this.messageNotificationFormNatureAideAlimentaireDetail = msg;
    this.isNotificationFormNatureAideAlimentaireDetail = true;
  }

  closeNotificationFormNatureAideAlimentaireDetail() {
    this.isNotificationFormNatureAideAlimentaireDetail = false;
  }

  deleteIde(natureAideAlimentaireDetail: NatureAideAlimentaireDetail): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de la nature : <b>' + natureAideAlimentaireDetail.natureAideAlimentaire.libelle + '</b> ?',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deleteOneNatureAideAlimentaireDetail(natureAideAlimentaireDetail),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneNatureAideAlimentaireDetail(natureAideAlimentaireDetail: NatureAideAlimentaireDetail): void {
    natureAideAlimentaireDetail.deleteBy = this.user.username;
    this.natureAideAlimentaireDetailService.delete(natureAideAlimentaireDetail).subscribe(
      (data: NatureAideAlimentaireDetail) => {
        const i = this.natureAideAlimentaireDetailList.findIndex(n => n.id == natureAideAlimentaireDetail.id);
        this.natureAideAlimentaireDetailList.splice(i, 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        //this.notificationTable('danger', 'Echec de la suppression !');
      });
  }

}
