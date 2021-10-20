import { Component, OnInit } from "@angular/core";
import { StatistiqueService } from "src/app/services/statistique.service";
import { HttpErrorResponse } from "@angular/common/http";

const Highcharts = require("highcharts");

// Load the exporting module, and initialize it.
require("highcharts/modules/exporting")(Highcharts);

declare var $: any;

interface Serie {
  name: string;
  data: SerieData[];
}

interface SerieData {
  name: string;
  y: number;
}

@Component({
  selector: "app-tb-requete-financement",
  templateUrl: "./tb-requete-financement.component.html",
  styleUrls: ["./tb-requete-financement.component.css"],
})
export class TbRequeteFinancementComponent implements OnInit {
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

  getList(): void {
    this.statistiqueService.getStatsRequeteYear().subscribe(
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
            renderTo: "container0",
          };
          this.doGraph(
            {
              name: "point des requêtes de financement concluantes par année",
              data: serieStatus,
            },
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
    this.statistiqueService.getStatsRequeteNatureFinancement().subscribe(
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
            type: "column",
            renderTo: "container1",
          };
          this.doGraph(
            {
              name: "point des requêtes de financement par nature",
              data: serieStatus,
            },
            total,
            "nature de financement",
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

  formatNumber(num: number): string {
    return Math.round(num)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
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
    if (optionGraph == 1) {
      options = {
        chart: chartGraph,
        title: {
          text:
            "<b> Requête </b> : point par " +
            value +
            " (" +
            this.formatNumber(total) +
            " requêtes)",
          style: {
            fontSize: "13px",
          },
        },
        credits: {
          enabled: true,
          href: "https://sgifd.gouv.bj/",
          text: "SGIFD",
        },
        accessibility: {
          point: {
            valueSuffix: "requête(s)",
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.y} requête(s)",
              connectorColor: "silver",
              style: {
                fontSize: "9px",
              },
            },
          },
        },
        series: [series],
      };
      const chart1 = new Highcharts.Chart(options);
    }
    if (optionGraph == 2) {
      console.log(series.data.map((d) => d.name));
      options = {
        chart: chartGraph,
        title: {
          text:
            "<b> Requête </b> : évolution fiancière des requêtes par " +
            value +
            " <b>(" +
            this.formatNumber(total) +
            " f cfa)</b>",
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
