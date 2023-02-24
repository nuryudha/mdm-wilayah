import { Component, OnInit, ViewChild } from '@angular/core';
import { WilayahService } from '../wilayah.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Negara } from 'src/app/model/negaraModel';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-wilayah-negara',
  templateUrl: './wilayah-negara.component.html',
  styleUrls: ['./wilayah-negara.component.css'],
})
export class WilayahNegaraComponent implements OnInit {
  displayedColumns: string[] = ['id', 'countryId', 'countryNameIdn', 'action'];
  dataSource!: MatTableDataSource<Negara>;
  dataNegara: Negara[] = [];
  isLoading = true;
  error = false;
  statusText: any;
  noData = false;

  constructor(private wilayahService: WilayahService, private title: Title) {
    this.dataSource = new MatTableDataSource(this.dataNegara);
  }

  ngOnInit(): void {
    this.getCountry();
    this.title.setTitle('Negara');
  }

  @ViewChild('paginator')
  paginator!: MatPaginator;

  @ViewChild('sort') sort!: MatSort;

  totalRec: any;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 100];

  getCountry() {
    this.noData = false;
    this.isLoading = true;
    this.error = false;
    console.log(this.pageIndex);
    this.dataNegara = [];
    this.wilayahService
      .getAll(
        'country/?sort=countryNameIdn,asc&page=' +
          this.pageIndex +
          '&size=' +
          this.pageSize
      )
      .subscribe(
        (res) => {
          this.totalRec = res.body.paging.totalrecord;
          res.body.result.forEach((element: any, index: any) => {
            this.dataNegara.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              countryId: element.countryId,
              countryNameIdn: element.countryNameIdn,
            });
          });
          this.isLoading = false;
          this.error = false;
          this.dataSource = new MatTableDataSource(this.dataNegara);
          this.ngAfterViewInit();
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
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  pageEvent!: PageEvent;
  handlePageEvent(e: PageEvent) {
    this.isLoading = true;
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    console.log(this.pageEvent);
    console.log(this.pageSize);
    console.log(this.pageIndex);

    this.dataNegara = [];
    this.dataSource = new MatTableDataSource(this.dataNegara);
    if (this.sort.direction === 'desc') {
      if (this.searchData == null) {
        this.wilayahService
          .getAll(
            'country/?sort=countryNameIdn,desc&page=' +
              this.pageIndex +
              '&size=' +
              this.pageSize
          )
          .subscribe((res) => {
            this.pageEvent = e;
            this.pageSize = e.pageSize;
            this.pageIndex = e.pageIndex;
            console.log(res);
            this.totalRec = res.body.paging.totalrecord;
            console.log(this.totalRec);
            res.body.result.forEach((element: any, index: any) => {
              this.dataNegara.push({
                no: this.pageIndex * this.pageSize + index + 1 + '.',
                countryId: element.countryId,
                countryNameIdn: element.countryNameIdn,
              });
            });
            this.noData = false;
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(this.dataNegara);
          });
      } else {
        this.dataSearchNegara = [];
        this.wilayahService
          .getAll(
            'country/?countryNameIdn.contains=' +
              this.searchData +
              '&countryId.contains=' +
              this.searchData +
              '&sort=countryNameIdn,desc&page=' +
              this.pageIndex +
              '&size=' +
              this.pageSize
          )
          .subscribe((res) => {
            console.log(res);
            this.totalRec = res.body.paging.totalrecord;
            res.body.result.forEach((element: any, index: any) => {
              this.dataSearchNegara.push({
                no: this.pageIndex * this.pageSize + index + 1 + '.',
                countryId: element.countryId,
                countryNameIdn: element.countryNameIdn,
              });
            });
            this.isLoading = false;
            this.noData = false;
            this.dataSource = new MatTableDataSource(this.dataSearchNegara);
            this.ngAfterViewInit();
          });
      }
    } else if (this.sort.direction === 'asc') {
      if (this.searchData == null) {
        this.wilayahService
          .getAll(
            'country/?sort=countryNameIdn,asc&page=' +
              this.pageIndex +
              '&size=' +
              this.pageSize
          )
          .subscribe((res) => {
            this.pageEvent = e;
            this.pageSize = e.pageSize;
            this.pageIndex = e.pageIndex;
            console.log(res);
            this.totalRec = res.body.paging.totalrecord;
            console.log(this.totalRec);
            res.body.result.forEach((element: any, index: any) => {
              this.dataNegara.push({
                no: this.pageIndex * this.pageSize + index + 1 + '.',
                countryId: element.countryId,
                countryNameIdn: element.countryNameIdn,
              });
            });
            this.noData = false;
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(this.dataNegara);
          });
      } else {
        this.dataSearchNegara = [];
        this.wilayahService
          .getAll(
            'country/?countryNameIdn.contains=' +
              this.searchData +
              '&countryId.contains=' +
              this.searchData +
              '&sort=countryNameIdn,asc&page=' +
              this.pageIndex +
              '&size=' +
              this.pageSize
          )
          .subscribe((res) => {
            console.log(res);
            this.totalRec = res.body.paging.totalrecord;
            res.body.result.forEach((element: any, index: any) => {
              this.dataSearchNegara.push({
                no: this.pageIndex * this.pageSize + index + 1 + '.',
                countryId: element.countryId,
                countryNameIdn: element.countryNameIdn,
              });
            });
            this.isLoading = false;
            this.noData = false;
            this.dataSource = new MatTableDataSource(this.dataSearchNegara);
            this.ngAfterViewInit();
          });
      }
    }
  }

  searchData: any;
  dataSearchNegara: Negara[] = [];
  searchNegara() {
    this.isLoading = true;
    this.dataSearchNegara = [];
    this.pageIndex = 0;
    this.wilayahService
      .getAll(
        'country/?countryNameIdn.contains=' +
          this.searchData +
          '&countryId.contains=' +
          this.searchData +
          '&sort=countryNameIdn,asc&page=' +
          this.pageIndex +
          '&size=' +
          this.pageSize
      )
      .subscribe((res) => {
        console.log(res);
        this.totalRec = res.body.paging.totalrecord;
        res.body.result.forEach((element: any, index: any) => {
          this.dataSearchNegara.push({
            no: this.pageIndex * this.pageSize + index + 1 + '.',
            countryId: element.countryId,
            countryNameIdn: element.countryNameIdn,
          });
        });
        this.isLoading = false;
        this.noData = true;
        this.dataSource = new MatTableDataSource(this.dataSearchNegara);
        this.ngAfterViewInit();
      });
  }

  deleteNegara(dataCountry: any) {
    this.noData = false;
    let idCountry = dataCountry.countryId;
    console.log(idCountry);
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure want delete this data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.wilayahService.deleteAll('country/' + idCountry).subscribe(
          (res) => {
            console.log(res);
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
                if (res) this.getCountry();
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

  coba() {
    this.noData = false;
    if (this.sort.direction === 'desc') {
      this.dataNegara = [];
      this.wilayahService
        .getAll(
          'country/?sort=countryNameIdn,desc&page=' +
            this.pageIndex +
            '&size=' +
            this.pageSize
        )
        .subscribe((res) => {
          this.totalRec = res.body.paging.totalrecord;
          res.body.result.forEach((element: any, index: any) => {
            this.dataNegara.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              countryId: element.countryId,
              countryNameIdn: element.countryNameIdn,
            });
          });
          this.dataSource = new MatTableDataSource(this.dataNegara);
          this.ngAfterViewInit();
        });
    } else if (this.sort.direction === 'asc') {
      this.dataNegara = [];
      this.wilayahService
        .getAll(
          'country/?sort=countryNameIdn,asc&page=' +
            this.pageIndex +
            '&size=' +
            this.pageSize
        )
        .subscribe((res) => {
          this.totalRec = res.body.paging.totalrecord;
          res.body.result.forEach((element: any, index: any) => {
            this.dataNegara.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              countryId: element.countryId,
              countryNameIdn: element.countryNameIdn,
            });
          });
          this.dataSource = new MatTableDataSource(this.dataNegara);
          this.ngAfterViewInit();
        });
    }
  }
}
