import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChartPage } from './line-chart.page';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule, SegmentChangeEventDetail } from '@ionic/angular';
import { HomeData, HomeService } from '../services/home/home.service';
import { of } from 'rxjs';

describe('LineChartPage', () => {
  let component: LineChartPage;
  let fixture: ComponentFixture<LineChartPage>;
  let service: HomeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineChartPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [HomeService, HttpClient]
    }).compileComponents();
    fixture = TestBed.createComponent(LineChartPage);
    component = fixture.componentInstance;
    service = TestBed.inject(HomeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should call fetchStocks method on ionViewWillEnter', () => {
    const homeServiceMock = {
      fetchStocks: () =>
        of({
          rowData: [
            { date: '2022-01-01', symbol: 'AAPL', price: '100' },
            { date: '2022-02-01', symbol: 'GOOG', price: '200' },
            { date: '2022-03-01', symbol: 'MSFT', price: '300' },
          ],
          colDef: [
            {
              field: 'symbol',
              flex: 1,
            },
            {
              field: 'date',
              flex: 1,
            },
            {
              field: 'price',
              flex: 1,
            },
          ],
        }),
    };

    const fetchStocksSpy = spyOn(
      homeServiceMock,
      'fetchStocks'
    ).and.returnValue(
      of({
        rowData: [
          { date: '2022-01-01', symbol: 'AAPL', price: '100' },
          { date: '2022-02-01', symbol: 'GOOG', price: '200' },
          { date: '2022-03-01', symbol: 'MSFT', price: '300' },
        ],
        colDef: [
          {
            field: 'symbol',
            flex: 1,
          },
          {
            field: 'date',
            flex: 1,
          },
          {
            field: 'price',
            flex: 1,
          },
        ],
      })
    );
    component.ionViewWillEnter();

    expect(fetchStocksSpy).toHaveBeenCalled();
  });

  it('should filter chart data on onFilterDate method', () => {
    const homeData: HomeData = {
      rowData: [
        { date: '2022-01-01', symbol: 'AAPL', price: '100' },
        { date: '2022-02-01', symbol: 'GOOG', price: '200' },
        { date: '2022-03-01', symbol: 'MSFT', price: '300' },
      ],
      colDef: [
        {
          field: 'symbol',
          flex: 1,
        },
        {
          field: 'date',
          flex: 1,
        },
        {
          field: 'price',
          flex: 1,
        },
      ],
    };

    const filteredChartData: HomeData = {
      ...homeData,
      rowData: homeData.rowData.filter((rdata) => rdata.date === '2022-02-01'),
    };

    component.chartData = homeData;

    const filteredChartDataSpy = spyOn<any>(component, 'setChartData');

    component.onFilterDate({
      detail: { value: '2022-02-01' },
    } as CustomEvent<SegmentChangeEventDetail>);

    expect(filteredChartDataSpy).toHaveBeenCalledWith(filteredChartData);
  });
});
