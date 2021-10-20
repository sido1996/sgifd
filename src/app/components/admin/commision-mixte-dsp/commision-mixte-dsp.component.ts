import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

declare var $ :any;

@Component({
  selector: 'app-commision-mixte-dsp',
  templateUrl: './commision-mixte-dsp.component.html',
  styleUrls: ['./commision-mixte-dsp.component.css']
})
export class CommisionMixteDspComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
    $('#sidebarnav a').on('click', function (e) {

      if (!$(this).hasClass("active")) {
        // hide any open menus and remove all other classes
        $("ul", $(this).parents("ul:first")).removeClass("in");
        $("a", $(this).parents("ul:first")).removeClass("active");

        // open our new menu and add the open class
        $(this).next("ul").addClass("in");
        $(this).addClass("active");

      }
      else if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).parents("ul:first").removeClass("active");
        $(this).next("ul").removeClass("in");
      }
    })
  }

  
  navigateAdminUrl(): void {
    this.router.navigate(['admin']);
}


}
