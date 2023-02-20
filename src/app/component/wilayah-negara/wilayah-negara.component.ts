import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WilayahService } from '../wilayah.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Negara } from 'src/app/model/negaraModel';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wilayah-negara',
  templateUrl: './wilayah-negara.component.html',
  styleUrls: ['./wilayah-negara.component.css'],
})
export class WilayahNegaraComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'countryId', 'countryNameIdn', 'action'];
  dataSource!: MatTableDataSource<Negara>;
  dataNegara: Negara[] = [];

  constructor(
    private wilayahService: WilayahService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource(this.dataNegara);
  }

  ngOnInit(): void {
    this.getCountry();
    // this.getDataCountryAll();
  }

  @ViewChild('paginator')
  paginator!: MatPaginator;

  @ViewChild('sort') sort!: MatSort;

  totalRec: any;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 100];

  getCountry() {
    console.log(this.pageIndex);
    this.dataNegara = [];
    this.dataSource = new MatTableDataSource(this.dataNegara);

    this.wilayahService
      .getAll(
        'country/?sort=countryNameIdn,asc&page=' +
          this.pageIndex +
          '&size=' +
          this.pageSize
      )
      .subscribe((res) => {
        // console.log(res);
        this.totalRec = res.body.paging.totalrecord;
        // console.log(this.totalRec);
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
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }
  pageEvent!: PageEvent;
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    console.log(this.pageEvent);
    console.log(this.pageSize);
    console.log(this.pageIndex);

    this.dataNegara = [];
    this.dataSource = new MatTableDataSource(this.dataNegara);
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
          this.dataSource = new MatTableDataSource(this.dataNegara);
          // this.ngAfterViewInit();
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
          this.dataSource = new MatTableDataSource(this.dataSearchNegara);
          this.ngAfterViewInit();
        });
    }
  }

  searchData: any;
  dataSearchNegara: Negara[] = [];
  searchNegara() {
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
        this.dataSource = new MatTableDataSource(this.dataSearchNegara);
        this.ngAfterViewInit();
      });
  }

  deleteNegara(dataCountry: any) {
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
        this.wilayahService
          .deleteAll('country/' + idCountry)
          .subscribe((res) => {
            console.log(res);
            let statusCode = res.body.status.responseCode;
            if (statusCode == '200') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Berhasil',
                showConfirmButton: false,
                timer: 1500,
              }).then((res) => {
                if (res) this.getCountry();
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
  // DIALOG DELELE
  openDeleteDialog(dataCountry: any): void {
    let idCountry = dataCountry.countryId;
    console.log(idCountry);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = '20%';
    dialogConfig.height = '20%';
    dialogConfig.data = {
      idNegara: idCountry,
    };
    this.dialog
      .open(DialogDeleteComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {});

    // const dialogRef = this.dialog.open(DialogDeleteComponent);

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {

    //   }
    // });
  }
}
