import { Component, OnInit } from '@angular/core';
import { barGraph } from './form_model';
import { ElementRef, ViewChild } from '@angular/core';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';
import { barGraphSeries } from './series_model';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  isValid: boolean = true;
  @ViewChild('chartTarget') chartTarget: ElementRef;
  options: Highcharts.Options;
  chart: Highcharts.ChartObject;

  public addSeries(type, title, xaxis, yaxis, name, data) {
    var xAxisItems = xaxis.split(",");
    var nameItems = name.split(",");
    var data = data.split(";");
    var seriesItems = [];
    for (var i = 0; i < nameItems.length; i++) {
      var singleItem = new barGraphSeries;
      singleItem.name = nameItems[i];
      singleItem.data = data[i].split(',').map(Number);
      seriesItems.push(singleItem);
    }
    console.log(seriesItems.length);
    this.options = {
      chart: {
        type: type
      },
      title: {
        text: title
      },
      xAxis: {
        categories: xAxisItems
      },
      yAxis: {
        title: {
          text: yaxis
        }
      },
      series: seriesItems
    };

    this.chart = new chart(this.chartTarget.nativeElement, this.options);
  }
  public barGraph: barGraph = new barGraph();
  public setType(value: string) {
    this.options.type = value;
    console.log(this.options.type)
  }
  public settitle(value: string) {
    this.options.title = value;
  }
  public setxAxis(value: string[]) {
    this.options.xAxis = value;

  }
  public setyAxisTitle(value: string) {
    this.options.yAxisTitle = value;

  }
  public setSeriesName(value: string) {
    var datainput = value.split(",");
    for (var i = 0; i < datainput.length; i++) {
      console.log(datainput[i]);
    }
    this.barGraph.series['name'] = value;


  }
  public setSeriesData(data: number[]) {
    this.barGraph.series['data'] = data;


  }
  constructor() { }

  ngOnInit() {
  }

}
