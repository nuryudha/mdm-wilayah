import { Component, OnInit, ViewChild } from '@angular/core';
import { WilayahService } from '../wilayah.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Provinsi } from 'src/app/model/provinsiModel';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-wilayah-provinsi',
  templateUrl: './wilayah-provinsi.component.html',
  styleUrls: ['./wilayah-provinsi.component.css'],
})
export class WilayahProvinsiComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    private router: Router,
    private title: Title
  ) {}

  displayedColumns = [
    'id',
    'provinceId',
    'provinceName',
    'countryNameIdn',
    'action',
  ];
  totalRec: any;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 100];
  dataProvinsi: Provinsi[] = [];
  dataSource!: MatTableDataSource<Provinsi>;
  pageEvent!: PageEvent;
  searchData: any;
  dataSearchProvinsi: Provinsi[] = [];
  isLoading = true;
  error = false;
  statusText: any;
  noData = false;

  @ViewChild('paginator')
  paginator!: MatPaginator;

  @ViewChild('sort')
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  getProvince() {
    this.noData = false;
    this.isLoading = true;
    this.error = false;
    this.dataProvinsi = [];
    this.dataSource = new MatTableDataSource(this.dataProvinsi);
    this.wilayahService
      .getAll(
        'province/?sort=provinceName,asc&page=' +
          this.pageIndex +
          '&size=' +
          this.pageSize
      )
      .subscribe(
        (res) => {
          this.totalRec = res.body.paging.totalrecord;
          res.body.result.forEach((element: any, index: any) => {
            this.dataProvinsi.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              countryNameIdn: element.countryNameIdn,
              countryId: element.countryId,
              provinceId: element.provinceId,
              provinceName: element.provinceName,
            });
          });
          this.isLoading = false;
          this.error = false;
          this.dataSource = new MatTableDataSource(this.dataProvinsi);
        },
        (error) => {
          console.log(error);
          this.statusText = error.statusText;
          this.isLoading = false;
          this.error = true;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,

            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'error',
            title: 'Service Unavailable',
          });
        }
      );
  }

  handlePageEvent(e: PageEvent) {
    this.isLoading = true;
    this.noData = false;
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    console.log(this.pageEvent);
    // * getProvince
    this.dataProvinsi = [];
    this.dataSource = new MatTableDataSource(this.dataProvinsi);
    if (this.searchData != null) {
      this.dataSearchProvinsi = [];
      this.wilayahService
        .getAll(
          'province/??provinceId.contains=' +
            this.searchData +
            '&provinceName.contains=' +
            this.searchData +
            '&countryNameIdn.contains=' +
            this.searchData +
            '&sort=provinceName,asc&page=' +
            this.pageIndex +
            '&size=' +
            this.pageSize
        )
        .subscribe((res) => {
          this.totalRec = res.body.paging.totalrecord;
          res.body.result.forEach((element: any, index: any) => {
            this.dataSearchProvinsi.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              countryId: element.countryId,
              countryNameIdn: element.countryNameIdn,
              provinceId: element.provinceId,
              provinceName: element.provinceName,
            });
          });
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(this.dataSearchProvinsi);
          this.ngAfterViewInit();
        });
    } else {
      this.wilayahService
        .getAll(
          'province/?sort=provinceName,asc&page=' +
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
            this.dataProvinsi.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              countryNameIdn: element.countryNameIdn,
              countryId: element.countryId,
              provinceId: element.provinceId,
              provinceName: element.provinceName,
            });
          });
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(this.dataProvinsi);
          this.ngAfterViewInit();
        });
    }
  }

  searchProvinsi() {
    this.isLoading = true;
    this.noData = true;
    this.pageIndex = 0;
    this.dataSearchProvinsi = [];
    this.wilayahService
      .getAll(
        'province/??provinceId.contains=' +
          this.searchData +
          '&provinceName.contains=' +
          this.searchData +
          '&countryNameIdn.contains=' +
          this.searchData +
          '&sort=provinceName,asc&page=' +
          this.pageIndex +
          '&size=' +
          this.pageSize
      )
      .subscribe((res) => {
        this.totalRec = res.body.paging.totalrecord;
        res.body.result.forEach((element: any, index: any) => {
          this.dataSearchProvinsi.push({
            no: this.pageIndex * this.pageSize + index + 1 + '.',
            countryNameIdn: element.countryNameIdn,
            countryId: element.countryId,
            provinceId: element.provinceId,
            provinceName: element.provinceName,
          });
        });
        this.isLoading = false;
        this.noData = true;
        this.dataSource = new MatTableDataSource(this.dataSearchProvinsi);
        this.ngAfterViewInit();
      });
  }

  editProvinsi(dataProvinsi: any) {
    this.router.navigate(['/edit-provinsi/'], {
      queryParams: {
        idProvinsi: dataProvinsi.provinceId,
        namaProvinsi: dataProvinsi.provinceName,
        idNegara: dataProvinsi.countryId,
      },
    });
  }

  deleteProvinsi(dataProvinsi: any) {
    this.noData = false;
    let provinceId = dataProvinsi.provinceId;
    console.log(provinceId);
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
        this.wilayahService.deleteAll('province/' + provinceId).subscribe(
          (res) => {
            let statusCode = res.body.status.responseCode;
            let statusDesc = res.body.status.responseDesc;
            if (statusCode == '200') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: statusDesc,
                showConfirmButton: false,
                timer: 1500,
              }).then((res) => {
                if (res) this.getProvince();
              });
            } else {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: statusDesc,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          },
          (error) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Service Unavailable',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.getProvince();
    this.title.setTitle('Provinsi');
  }
}
