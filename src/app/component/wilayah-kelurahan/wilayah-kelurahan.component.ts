import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { WilayahService } from '../wilayah.service';
import { Keluarahan } from 'src/app/model/kelurahanModel';
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
  searchData: any;
  dataKeluarahan: Keluarahan[] = [];
  dataSource!: MatTableDataSource<Keluarahan>;

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

  searchKelurahan() {}

  ngOnInit(): void {
    this.getKelurahan();
  }
}
