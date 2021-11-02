import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isMenu: boolean = true;

  constructor( private router: Router,) { }

  ngOnInit() {
    this.isMenu = true;
    //window.location.reload();
  }

}
