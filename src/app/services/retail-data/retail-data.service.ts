import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RetailData } from 'src/app/components/sample-data/RetailData';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class RetailDataService {

  constructor(private http: HttpClient) { }

  getRow(HSHD_NUM: string) {
    return this.http.get<RetailData[]>(environment.apiUrl + '/retaildata/' + HSHD_NUM);
  }

  upload(file: any) {
    return this.http.post<string | boolean>(environment.apiUrl + '/retaildata/upload', file);
  }
}
