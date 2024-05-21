import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';

export interface HomeData {
  rowData: any[];
  colDef: ColDef[];
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _homeData = new BehaviorSubject<HomeData>({} as HomeData);

  get homeData() {
    return this._homeData.asObservable(); // returns an observable
  }

  constructor(private http: HttpClient) {}

  private csvJSON(csvText: string) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    const jsonArray = [];
    const jsonColDef = headers.map(header => {
      return {
        field: header,
        flex: 1
      }
    })

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const obj = {} as typeof headers;

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j] as any] = values[j];
      }

      jsonArray.push(obj);
    }

    return {colDef: jsonColDef, rowData: jsonArray};
  }

  fetchStocks(): Observable<HomeData> {
    return this.http.get(
      'https://raw.githubusercontent.com/LyonDataViz/MOS5.5-Dataviz/master/data/stocks.csv',
      { responseType: 'text' }
    ).pipe(
      take(1),
      map((res) => this.csvJSON(res)),
      tap((jsonRes) => this._homeData.next(jsonRes))
    );
  }
}
