import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, merge, sample, startWith, switchMap, of } from 'rxjs';
import { RetailDataService } from 'src/app/services/retail-data/retail-data.service';
import { RetailData } from './RetailData';
import { MatPaginator } from '@angular/material/paginator';
import { columnConfig } from './column-config';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sample-data',
  templateUrl: './sample-data.component.html',
  styleUrls: ['./sample-data.component.scss']
})
export class SampleDataComponent implements OnInit, AfterViewInit {
  searchControl = new FormControl('');;
  columns: any[] = columnConfig;
  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource: MatTableDataSource<RetailData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  sampleData: any = []
  data: RetailData[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private retailDataService: RetailDataService, private toastr: ToastrService) {
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    // this.retailDataService.getRow('10').subscribe(data => {
    //   this.dataSource = new MatTableDataSource(data);
    // });
  }
  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.fetchData('10');
  }

  private fetchData(HSHD_NUM: string) {
    this.isLoadingResults = true;
    this.retailDataService.getRow(HSHD_NUM)
      .subscribe(data => {
        this.isLoadingResults = false;
        if (data === null) {
          data = [];
        }
        this.resultsLength = data.length;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.pageSize = 10;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  search() {
    const hshd = this.searchControl.value;
    if (!hshd || !hshd.length) {
      this.toastr.error('Please enter a HSHD_NUM');
      return;
    }

    this.fetchData(hshd);
  }
}
