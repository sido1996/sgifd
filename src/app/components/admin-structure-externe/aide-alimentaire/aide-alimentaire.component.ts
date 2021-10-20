import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-aide-alimentaire',
  templateUrl: './aide-alimentaire.component.html',
  styleUrls: ['./aide-alimentaire.component.css']
})
export class AideAlimentaireComponent implements OnInit {

  constructor() { }

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

}
