import { Component, OnDestroy, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/angular';
import { AgChartOptions, AgCharts } from "ag-charts-community";
import { Subscription } from 'rxjs';
import { HomeData, HomeService } from '../services/home/home.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.page.html',
  styleUrls: ['./line-chart.page.scss'],
})
export class LineChartPage implements OnInit, OnDestroy {
  chartData!: HomeData;
  isLoading: boolean = false;
  // Chart Options
  public chartOptions!: AgChartOptions;
  monthYear: string[] = [];
  private chartSub: Subscription = new Subscription();

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.chartSub = this.homeService.homeData.subscribe((data) => {
      this.chartData = data;
      if (this.chartData) {
        this.setChartData(this.chartData);
      }
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.homeService.fetchStocks().subscribe(() => {
      this.isLoading = false;
    });
  }

  onFilterDate(event: any) {
    // console.log(event.detail.value)
    const selectedValues = event.detail.value;
    const filteredChartData = {
      ...this.chartData,
      rowData: this.chartData.rowData.filter(
        (rdata) => selectedValues.includes(rdata.date)
      ),
    };
    this.setChartData(filteredChartData);
  }

  ngOnDestroy(): void {
    if (this.chartSub) {
      this.chartSub.unsubscribe();
    }
  }

  private setChartData(data: HomeData) {
    let seriesName: string[] = [];
    const cData = data.rowData?.map((rdata) => {
      this.monthYear.push(rdata.date);
      seriesName.push(rdata.symbol)
      return {
        date: rdata.date,
        [rdata.symbol]: Number(rdata.price)
      };
    });
    seriesName = [ ... new Set(seriesName)]
    this.monthYear = [...new Set(this.monthYear)];
    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: cData,
      // Series: Defines which chart type and data to use
      series: seriesName.map(series => {
        return {
          type: 'line', xKey: 'date', yKey: series, yName: series
        }
      }),
    };
  }

}
