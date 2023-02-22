import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { WilayahService } from '../wilayah.service';
import { Keluarahan } from 'src/app/model/kelurahanModel';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-wilayah-kelurahan',
  templateUrl: './wilayah-kelurahan.component.html',
  styleUrls: ['./wilayah-kelurahan.component.css'],
})
export class WilayahKelurahanComponent implements OnInit {
  constructor(private wilayahService: WilayahService) {}

  displayedColumns = [
    'no',
    'villageId',
    'villageName',
    'villagePostalCode',
    'districtName',
    'cityName',
    'provinceName',
    'countryNameIdn',
    'action',
  ];
  totalRec: any;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 100];
  pageEvent!: PageEvent;
  searchData: any;
  dataKeluarahan: Keluarahan[] = [];
  dataSource!: MatTableDataSource<Keluarahan>;
  dataSearchKeluarahan: any;

  getKelurahan() {
    this.dataKeluarahan = [];
    this.dataSource = new MatTableDataSource(this.dataKeluarahan);
    this.wilayahService
      .getAll(
        'village/?sort=villageName,asc&page=' +
          this.pageIndex +
          '&size=' +
          this.pageSize
      )
      .subscribe((res) => {
        this.totalRec = res.body.paging.totalrecord;
        res.body.result.forEach((element: any, index: any) => {
          this.dataKeluarahan.push({
            no: this.pageIndex * this.pageSize + index + 1 + '.',
            villageId: element.villageId,
            villageName: element.villageName,
            villagePostalCode: element.villagePostalCode,
            districtName: element.districtName,
            cityName: element.cityName,
            provinceName: element.provinceName,
            countryNameIdn: element.countryNameIdn,
          });
        });
        this.dataSource = new MatTableDataSource(this.dataKeluarahan);
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    // * getKelurahan
    this.dataKeluarahan = [];
    if (this.searchData == null) {
      this.wilayahService
        .getAll(
          'village/?sort=villageName,asc&page=' +
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
            this.dataKeluarahan.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              villageId: element.villageId,
              villageName: element.villageName,
              villagePostalCode: element.villagePostalCode,
              districtName: element.districtName,
              cityName: element.cityName,
              provinceName: element.provinceName,
              countryNameIdn: element.countryNameIdn,
            });
          });
          this.dataSource = new MatTableDataSource(this.dataKeluarahan);
        });
    } else {
      this.dataSearchKeluarahan = [];
      this.wilayahService
        .getAll(
          'village/?villageId.contains=' +
            this.searchData +
            '&villageName.contains=' +
            this.searchData +
            '&villagePostalCode.contains=' +
            this.searchData +
            '&districtName.contains=' +
            this.searchData +
            '&cityName.contains=' +
            this.searchData +
            '&provinceName.contains=' +
            this.searchData +
            '&countryNameIdn.contains=' +
            this.searchData +
            '&sort=villageName,asc&page=' +
            this.pageIndex +
            '&size=' +
            this.pageSize
        )
        .subscribe((res) => {
          this.totalRec = res.body.paging.totalrecord;
          res.body.result.forEach((element: any, index: any) => {
            this.dataSearchKeluarahan.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              villageId: element.villageId,
              villageName: element.villageName,
              villagePostalCode: element.villagePostalCode,
              districtName: element.districtName,
              cityName: element.cityName,
              provinceName: element.provinceName,
              countryNameIdn: element.countryNameIdn,
            });
          });
          this.dataSource = new MatTableDataSource(this.dataSearchKeluarahan);
        });
    }
  }

  searchKelurahan() {
    this.pageIndex = 0;
    this.dataSearchKeluarahan = [];
    this.wilayahService
      .getAll(
        'village/?villageId.contains=' +
          this.searchData +
          '&villageName.contains=' +
          this.searchData +
          '&villagePostalCode.contains=' +
          this.searchData +
          '&districtName.contains=' +
          this.searchData +
          '&cityName.contains=' +
          this.searchData +
          '&provinceName.contains=' +
          this.searchData +
          '&countryNameIdn.contains=' +
          this.searchData +
          '&sort=villageName,asc&page=' +
          this.pageIndex +
          '&size=' +
          this.pageSize
      )
      .subscribe((res) => {
        this.totalRec = res.body.paging.totalrecord;
        res.body.result.forEach((element: any, index: any) => {
          this.dataSearchKeluarahan.push({
            no: this.pageIndex * this.pageSize + index + 1 + '.',
            villageId: element.villageId,
            villageName: element.villageName,
            villagePostalCode: element.villagePostalCode,
            districtName: element.districtName,
            cityName: element.cityName,
            provinceName: element.provinceName,
            countryNameIdn: element.countryNameIdn,
          });
        });
        this.dataSource = new MatTableDataSource(this.dataSearchKeluarahan);
      });
  }

  deleteKelurahan(dataKeluarahan: any) {
    let kelurahanId = dataKeluarahan.villageId;
    console.log(kelurahanId);
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure want delete this data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((res) => {
      if (res.isConfirmed) {
        this.wilayahService
          .deleteAll('village/' + kelurahanId)
          .subscribe((res) => {
            let statusCode = res.body.status.responseCode;
            if (statusCode == '200') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Berhasil',
                showConfirmButton: false,
                timer: 1500,
              }).then((res) => {
                if (res) this.getKelurahan();
              });
            } else {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Gagal',
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  }

  ngOnInit(): void {
    this.getKelurahan();
  }
}
