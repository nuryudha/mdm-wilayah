import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WilayahService } from '../../wilayah.service';
import { DataKabupaten } from 'src/app/model/kabupatenModel';
import { PageEvent } from '@angular/material/paginator';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-data-kabupaten',
  templateUrl: './data-kabupaten.component.html',
  styleUrls: ['./data-kabupaten.component.css'],
})
export class DataKabupatenComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    public dialogRef: MatDialogRef<DataKabupatenComponent>
  ) {}

  displayedColumns = ['cityId', 'cityName', 'provinceName', 'countryNameIdn'];
  totalRec: any;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 100];
  dataKabupaten: DataKabupaten[] = [];
  dataSource!: MatTableDataSource<DataKabupaten>;
  pageEvent!: PageEvent;
  searchData: any;
  dataSearchKabupaten: any;

  getKabupaten() {
    this.dataKabupaten = [];
    this.wilayahService
      .getAll(
        'city/?sort=cityName,asc&page=' +
          this.pageIndex +
          '&size=' +
          this.pageSize
      )
      .subscribe((res) => {
        console.log(res);
        this.totalRec = res.body.paging.totalrecord;
        res.body.result.forEach((element: any, index: any) => {
          this.dataKabupaten.push({
            no: this.pageIndex * this.pageSize + index + 1 + '.',
            cityId: element.cityId,
            cityName: element.cityName,
            provinceName: element.provinceName,
            countryNameIdn: element.countryNameIdn,
            countryId: element.countryId,
            provinceId: element.provinceId,
          });
        });
        this.dataSource = new MatTableDataSource(this.dataKabupaten);
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    console.log(this.pageEvent);
    // * getKabupaten
    this.dataKabupaten = [];
    if (this.searchData == null) {
      this.wilayahService
        .getAll(
          'city/?sort=cityName,asc&page=' +
            this.pageIndex +
            '&size=' +
            this.pageSize
        )
        .subscribe((res) => {
          this.pageEvent = e;
          this.pageSize = e.pageSize;
          this.pageIndex = e.pageIndex;
          this.totalRec = res.body.paging.totalrecord;
          res.body.result.forEach((element: any, index: any) => {
            this.dataKabupaten.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              cityId: element.cityId,
              cityName: element.cityName,
              provinceName: element.provinceName,
              countryNameIdn: element.countryNameIdn,
              countryId: element.countryId,
              provinceId: element.provinceId,
            });
          });
          this.dataSource = new MatTableDataSource(this.dataKabupaten);
        });
    } else {
      this.dataSearchKabupaten = [];
      this.wilayahService
        .getAll(
          'city/?cityId.contains=' +
            this.searchData +
            '&cityName.contains=' +
            this.searchData +
            '&provinceName.contains=' +
            this.searchData +
            '&countryNameIdn.contains=' +
            this.searchData +
            '&sort=cityName,asc&page=' +
            this.pageIndex +
            '&size=' +
            this.pageSize
        )
        .subscribe((res) => {
          this.totalRec = res.body.paging.totalrecord;
          res.body.result.forEach((element: any, index: any) => {
            this.dataSearchKabupaten.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              cityId: element.cityId,
              cityName: element.cityName,
              provinceName: element.provinceName,
              countryNameIdn: element.countryNameIdn,
              countryId: element.countryId,
              provinceId: element.provinceId,
            });
          });
          this.dataSource = new MatTableDataSource(this.dataSearchKabupaten);
        });
    }
  }

  searchKabupaten() {
    this.pageIndex = 0;
    this.dataSearchKabupaten = [];
    this.wilayahService
      .getAll(
        'city/?cityId.contains=' +
          this.searchData +
          '&cityName.contains=' +
          this.searchData +
          '&provinceName.contains=' +
          this.searchData +
          '&countryNameIdn.contains=' +
          this.searchData +
          '&sort=cityName,asc&page=' +
          this.pageIndex +
          '&size=' +
          this.pageSize
      )
      .subscribe((res) => {
        this.totalRec = res.body.paging.totalrecord;
        res.body.result.forEach((element: any, index: any) => {
          this.dataSearchKabupaten.push({
            no: this.pageIndex * this.pageSize + index + 1 + '.',
            cityId: element.cityId,
            cityName: element.cityName,
            provinceName: element.provinceName,
            countryNameIdn: element.countryNameIdn,
          });
        });
        this.dataSource = new MatTableDataSource(this.dataSearchKabupaten);
      });
  }

  chooseCell(dataKabupaten: any) {
    this.dialogRef.close(dataKabupaten);
  }

  ngOnInit(): void {
    this.getKabupaten();
  }
}
