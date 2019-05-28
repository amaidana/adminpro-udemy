import { Component, OnInit, Input } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

	public doughnutChartType: ChartType = 'doughnut';

	@Input( 'labels' ) doughnutChartLabels: Label[] = [];

  @Input( 'data' ) doughnutChartData: MultiDataSet = [];

  @Input() leyenda: string = '';

  constructor() { }

  ngOnInit() { }

}
