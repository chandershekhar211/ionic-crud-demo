import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LineChartPageRoutingModule } from './line-chart-routing.module';

import { LineChartPage } from './line-chart.page';
import { AgChartsAngular } from "ag-charts-angular";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LineChartPageRoutingModule,
    AgChartsAngular
  ],
  declarations: [LineChartPage]
})
export class LineChartPageModule {}
