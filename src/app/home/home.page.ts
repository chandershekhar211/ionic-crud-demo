import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home/home.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  stocksData: any;
  rowData = [];
  colDefs: ColDef[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.stocksData = this.homeService
      .fetchStocks()
      .subscribe((stocks) => {
        this.rowData = stocks.rowData as any;
        this.colDefs = stocks.colDef;
      });
  }
}
