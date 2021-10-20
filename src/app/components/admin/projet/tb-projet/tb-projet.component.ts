import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { StatistiqueService } from 'src/app/services/statistique.service';

const Highcharts = require("highcharts");

// Load the exporting module, and initialize it.
require("highcharts/modules/exporting")(Highcharts);

declare var $: any;

interface Serie {
  name: string;
  data: number[];
}

interface SerieData {
  name: string;
  y: number;
}

@Component({
  selector: 'app-tb-projet',
  templateUrl: './tb-projet.component.html',
  styleUrls: ['./tb-projet.component.css']
})
export class TbProjetComponent implements OnInit {

  constructor(private statistiqueService: StatistiqueService) {}

  ngOnInit() {
    // Radialize the colors
    Highcharts.setOptions({
      colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
          radialGradient: {
            cx: 0.5,
            cy: 0.3,
            r: 0.7,
          },
          stops: [
            [0, color],
            [1, Highcharts.color(color).brighten(-0.3).get("rgb")], // darken
          ],
        };
      }),
    });
    this.getList();
  }

  formatNumber(num: number): string {
    return Math.round(num)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  }

  getList(): void {
    this.statistiqueService.getStatsProjetRessourceInterieureByYear().subscribe(
      (data: any) => {
        console.log(data);
        let serie1: number[] = [];
        let serie2: number[] = [];
        let years: number[] = [];
        let total = 0;
        if (data != undefined && data != null) {
          data.forEach((element) => {
            total = total + element[1];
            serie1.push(element[2] == null ? 0 : element[2]);
            serie2.push(element[1] == null ? 0 : element[1]);
            years.push(element[0] == null ? 0 : element[0]);
          });
          const chartOption = {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "column",
            renderTo: "container0",
          };
          this.doGraph(
            { year: years, data: [{name: 'programmation', data: serie1}, {name: 'consommation', data: serie2}] },
            total,
            "année",
            chartOption,
            0
          );
        }
      },
      (error: HttpErrorResponse) => {
        console.log("Echec !");
      }
    );
    this.statistiqueService.getStatsProjetRessourceExterieureByYear().subscribe(
      (data: any) => {
        console.log(data);
        let serie1: number[] = [];
        let serie2: number[] = [];
        let years: number[] = [];
        let total = 0;
        if (data != undefined && data != null) {
          data.forEach((element) => {
            total = total + element[1];
            serie1.push(element[2] == null ? 0 : element[2]);
            serie2.push(element[1] == null ? 0 : element[1]);
            years.push(element[0] == null ? 0 : element[0]);
          });
          const chartOption = {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "column",
            renderTo: "container1",
          };
          this.doGraph(
            { year: years, data: [{name: 'programmation', data: serie1}, {name: 'consommation', data: serie2}] },
            total,
            "année",
            chartOption,
            1
          );
        }
      },
      (error: HttpErrorResponse) => {
        console.log("Echec !");
      }
    );
    this.statistiqueService.getStatsProjetBySecteur().subscribe(
      (data: any) => {
        console.log(data);
        let serieStatus: SerieData[] = [];
        let total = 0;
        if (data != undefined && data != null) {
          data.forEach((element) => {
            total = total + element[1];
            serieStatus.push({ name: element[0], y: element[1] });
          });
          const chartOption = {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
            renderTo: "container2",
          };
          this.doGraph(
            { name: "Secteur", data: serieStatus },
            total,
            "secteur",
            chartOption,
            2
          );
        }
      },
      (error: HttpErrorResponse) => {
        console.log("Echec !");
      }
    );
  }

  doGraph(
    series: any,
    total: number,
    value: string,
    chartGraph: any,
    optionGraph: number
  ) {
    let options: any;
    // Build the chart
    if (optionGraph == 0) {
      console.log(series.year);
      options = {
       chart: chartGraph,
       title: {
         text:
           "Evolution des financements intérieurs de <b> projet </b> par " + value + " <b>(" + total + " f cfa programmer)</b>",
         style: {
           fontSize: "13px",
         },
       },
       credits: {
         enabled: true,
         href: "https://sgifd.gouv.bj/",
         text: "SGIFD",
       },
       tooltip: {
         pointFormat: "{series.name}: <b>{point.y}</b>",
       },
       yAxis: [
         {
           // --- Primary yAxis
           title: {
             text: "",
           },
         },
       ],
       // Categories are set by using an array
       xAxis: {
         categories: series.year,
       },
       series: series.data,
       exporting: {
         allowHTML: true,
         buttons: {
           contextButton: {
             enabled: true,
           },
           exportButton: {
             menuItems: [
               "downloadPNG",
               "downloadJPEG",
               "downloadPDF",
               "downloadSVG",
             ],
           },
         },
       },
     };
     const chart0 = new Highcharts.Chart(options);
    }

    if (optionGraph == 0 || optionGraph == 1) {
      console.log(series.year);
      options = {
       chart: chartGraph,
       title: {
         text:
           "Evolution des financements extérieurs de <b> projet </b> par " + value + " <b>(" + this.formatNumber(total) + " f cfa programmer)</b>",
         style: {
           fontSize: "13px",
         },
       },
       credits: {
         enabled: true,
         href: "https://sgifd.gouv.bj/",
         text: "SGIFD",
       },
       tooltip: {
         pointFormat: "{series.name}: <b>{point.y}</b>",
       },
       yAxis: [
         {
           // --- Primary yAxis
           title: {
             text: "",
           },
         },
       ],
       // Categories are set by using an array
       xAxis: {
         categories: series.year,
       },
       series: series.data,
       exporting: {
         allowHTML: true,
         buttons: {
           contextButton: {
             enabled: true,
           },
           exportButton: {
             menuItems: [
               "downloadPNG",
               "downloadJPEG",
               "downloadPDF",
               "downloadSVG",
             ],
           },
         },
       },
     };
     const chart1 = new Highcharts.Chart(options);
    }

    if (optionGraph == 2) {
      console.log(series.data.map((d) => d.name));
       options = {
        chart: chartGraph,
        title: {
          text:
            "<b> Projet </b> : évolution du nombre de projet par " + value + " <b>(" + this.formatNumber(total) + " projets)</b>",
          style: {
            fontSize: "13px",
          },
        },
        credits: {
          enabled: true,
          href: "https://sgifd.gouv.bj/",
          text: "SGIFD",
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.y}</b>",
        },
        yAxis: [
          {
            // --- Primary yAxis
            title: {
              text: "",
            },
          },
        ],
        // Categories are set by using an array
        xAxis: {
          categories: series.data.map((d) => d.name),
        },
        series: [series],
        exporting: {
          allowHTML: true,
          buttons: {
            contextButton: {
              enabled: true,
            },
            exportButton: {
              menuItems: [
                "downloadPNG",
                "downloadJPEG",
                "downloadPDF",
                "downloadSVG",
              ],
            },
          },
        },
      };
      const chart2 = new Highcharts.Chart(options);
    }

  }
}
