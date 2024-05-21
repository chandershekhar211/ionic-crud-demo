import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgChartOptions, AgCharts } from "ag-charts-community";
import { Subscription } from 'rxjs';
import { HomeData, HomeService } from '../services/home/home.service';
import { SegmentChangeEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.page.html',
  styleUrls: ['./pie-chart.page.scss'],
})
export class PieChartPage implements OnInit, OnDestroy {
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

  onFilterDate(event: CustomEvent<SegmentChangeEventDetail>) {
    const selectedValue = event.detail.value;
    const filteredChartData = {
      ...this.chartData,
      rowData: this.chartData.rowData.filter(
        (rdata) => rdata.date === selectedValue
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
    const cData = data.rowData?.map((rdata) => {
      this.monthYear.push(rdata.date);
      return {
        date: rdata.date,
        symbol: rdata.symbol,
        price: Number(rdata.price)
      };
    });
    this.monthYear = [...new Set(this.monthYear)];
    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: cData,
      // Series: Defines which chart type and data to use
      series: [{
          type: 'pie', angleKey: 'price', legendItemKey: 'symbol'
        }
      ],
    };
  }

}
