import { Component, OnInit } from '@angular/core';
import { Kecamatan } from 'src/app/model/kecamatanModel';
import { MatTableDataSource } from '@angular/material/table';
import { WilayahService } from '../wilayah.service';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wilayah-kecamatan',
  templateUrl: './wilayah-kecamatan.component.html',
  styleUrls: ['./wilayah-kecamatan.component.css'],
})
export class WilayahKecamatanComponent implements OnInit {
  constructor(private wilayahService: WilayahService) {}

  displayedColumns = [
    'no',
    'districtId',
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
  searchData: any;
  dataSearchKecamatan: any;
  dataKecamatan: Kecamatan[] = [];
  dataSource!: MatTableDataSource<Kecamatan>;
  pageEvent!: PageEvent;

  getKecamatan() {
    this.dataKecamatan = [];
    this.wilayahService
      .getAll(
        'district/?sort=districtName,asc&page=' +
          this.pageIndex +
          '&size=' +
          this.pageSize
      )
      .subscribe((res) => {
        this.totalRec = res.body.paging.totalrecord;
        res.body.result.forEach((element: any, index: any) => {
          this.dataKecamatan.push({
            no: this.pageIndex * this.pageSize + index + 1 + '.',
            districtId: element.districtId,
            districtName: element.districtName,
            cityName: element.cityName,
            provinceName: element.provinceName,
            countryNameIdn: element.countryNameIdn,
          });
        });
        this.dataSource = new MatTableDataSource(this.dataKecamatan);
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    // * getKecamatan
    this.dataKecamatan = [];
    if (this.searchData == null) {
      this.wilayahService
        .getAll(
          'district/?sort=districtName,asc&page=' +
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
            this.dataKecamatan.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              districtId: element.districtId,
              districtName: element.districtName,
              cityName: element.cityName,
              provinceName: element.provinceName,
              countryNameIdn: element.countryNameIdn,
            });
          });
          this.dataSource = new MatTableDataSource(this.dataKecamatan);
        });
    } else {
      this.dataSearchKecamatan = [];
      this.wilayahService
        .getAll(
          'district/?districtId.contains=' +
            this.searchData +
            '&districtName.contains=' +
            this.searchData +
            '&cityName.contains=' +
            this.searchData +
            '&provinceName.contains=' +
            this.searchData +
            '&countryNameIdn.contains=' +
            this.searchData +
            '&sort=districtName,asc&page=' +
            this.pageIndex +
            '&size=' +
            this.pageSize
        )
        .subscribe((res) => {
          this.totalRec = res.body.paging.totalrecord;
          res.body.result.forEach((element: any, index: any) => {
            this.dataSearchKecamatan.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              districtId: element.districtId,
              districtName: element.districtName,
              cityName: element.cityName,
              provinceName: element.provinceName,
              countryNameIdn: element.countryNameIdn,
            });
          });
          this.dataSource = new MatTableDataSource(this.dataSearchKecamatan);
        });
    }
  }
  searchKecamatan() {
    this.pageIndex = 0;
    this.dataSearchKecamatan = [];
    this.wilayahService
      .getAll(
        'district/?districtId.contains=' +
          this.searchData +
          '&districtName.contains=' +
          this.searchData +
          '&cityName.contains=' +
          this.searchData +
          '&provinceName.contains=' +
          this.searchData +
          '&countryNameIdn.contains=' +
          this.searchData +
          '&sort=districtName,asc&page=' +
          this.pageIndex +
          '&size=' +
          this.pageSize
      )
      .subscribe((res) => {
        this.totalRec = res.body.paging.totalrecord;
        res.body.result.forEach((element: any, index: any) => {
          this.dataSearchKecamatan.push({
            no: this.pageIndex * this.pageSize + index + 1 + '.',
            districtId: element.districtId,
            districtName: element.districtName,
            cityName: element.cityName,
            provinceName: element.provinceName,
            countryNameIdn: element.countryNameIdn,
          });
        });
        this.dataSource = new MatTableDataSource(this.dataSearchKecamatan);
      });
  }
  // http://mff-gateway-dev.apps.ocp4dev.muf.co.id/mdm/wilayah/district/54897

  deleteKecamatan(dataKecamatan: any) {
    let kecamatanId = dataKecamatan.districtId;
    console.log(kecamatanId);
    this.wilayahService
      .deleteAll('district/' + kecamatanId)
      .subscribe((res) => {
        console.log(res);
      });
  }

  ngOnInit(): void {
    this.getKecamatan();
  }
}
