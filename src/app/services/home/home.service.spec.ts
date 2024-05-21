import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeData, HomeService } from './home.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const expectedUrl = 'https://raw.githubusercontent.com/LyonDataViz/MOS5.5-Dataviz/master/data/stocks.csv';

describe('HomeService', () => {
  let service: HomeService;
  let controller: HttpTestingController;
  // let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService, HttpClient],
    });
    // httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = TestBed.inject(HomeService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch stocks successfully', () => {
    const csvText = 
    `symbol,price,date\nMSFT,67.67,Jan 2024\nAMZN,74.3,Jan 2024\nIBM,38.7,Jan 2024\nAAPL,81.88,Jan 2024`;
    const expectedStocks: HomeData = {
      colDef: [
        {
          field: 'symbol',
          flex: 1,
        },
        {
          field: 'price',
          flex: 1,
        },
        {
          field: 'date',
          flex: 1,
        },
      ],
      rowData: [
        {
          symbol: 'MSFT',
          price: '67.67',
          date: 'Jan 2024',
        },
        {
          symbol: 'AMZN',
          price: '74.3',
          date: 'Jan 2024',
        },
        {
          symbol: 'IBM',
          price: '38.7',
          date: 'Jan 2024',
        },
        {
          symbol: 'AAPL',
          price: '81.88',
          date: 'Jan 2024',
        },
      ],
    };
    let stocks: HomeData = {
      rowData: [],
      colDef: []
    };

    service.fetchStocks().subscribe((data) => {
      stocks = data;
    });
    const request = controller.expectOne(expectedUrl);
    request.flush(csvText);
    controller.verify();
    expect(stocks).toEqual(expectedStocks);
  });

  // it('should fetch stocks', () => {
  //   // const csvText = `name,price,change
  //   //   AAPL,150.34,+2.34
  //   //   GOOG,2000.45,-10.55
  //   //   MSFT,250.12,+1.23`;

  //   service.fetchStocks().subscribe(data => {
  //     expect(data).toEqual({
  //       colDef: [
  //         { field: 'symbol', flex: 1 },
  //         { field: 'price', flex: 1 },
  //         { field: 'date', flex: 1 }
  //       ],
  //       rowData: [
  //         { symbol: 'AAPL', price: '150.34', date: '2024-01-01' },
  //         { symbol: 'GOOG', price: '2000.45', date: '2024-02-01' },
  //         { symbol: 'MSFT', price: '250.12', date: '2024-03-01' }
  //       ]
  //     });
  //   });
  // });

  // it('should fetch homeData successfully', () => {
  //   service.homeData.subscribe((data) => {
  //     expect(data).toBeTruthy();
  //   });
  // });
});

