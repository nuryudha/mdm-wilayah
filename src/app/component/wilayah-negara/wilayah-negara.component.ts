import { Component, OnInit, ViewChild } from '@angular/core';
import { WilayahService } from '../wilayah.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Negara } from 'src/app/model/negaraModel';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-wilayah-negara',
  templateUrl: './wilayah-negara.component.html',
  styleUrls: ['./wilayah-negara.component.css'],
})
export class WilayahNegaraComponent implements OnInit {
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dataFoods: any;
  dataCountry: any;
  titlePage = 'Negara';
  displayedColumns: string[] = ['id', 'countryId', 'countryNameIdn', 'action'];
  dataSource!: MatTableDataSource<Negara>;
  dataNegara: Negara[] = [];

  constructor(
    private wilayahService: WilayahService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.dataNegara);
  }

  ngOnInit(): void {
    this.getDataCountry();
  }

  @ViewChild('paginator')
  paginator!: MatPaginator;

  @ViewChild('sort') sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  pagesSize: any;
  pagesIndex: any;
  totalRec: any;

  pageSize = 243;
  pageIndex = 0;

  pageSizeOptions = [5, 10, 25];

  getDataCountry() {
    this.dataNegara = [];
    this.dataSource = new MatTableDataSource(this.dataNegara);
    this.wilayahService
      .getAll('/country/?page=' + this.pageIndex + '&size=' + this.totalRec)
      .subscribe((res) => {
        console.log(res);
        this.totalRec = res.body.paging.totalrecord;
        console.log(this.totalRec);
        res.body.result.forEach((element: any) => {
          this.dataNegara.push({
            no: '',
            countryId: element.countryId,
            countryNameIdn: element.countryNameIdn,
          });
        });
        this.dataSource = new MatTableDataSource(this.dataNegara);
        this.ngAfterViewInit();
      });
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
    this.wilayahService
      .getAll('/country/?page=' + this.pageIndex + '&size=' + this.pageSize)
      .subscribe((res) => {
        console.log(res);
        this.totalRec = res.body.paging.totalrecord;
        console.log(this.totalRec);
        res.body.result.forEach((element: any) => {
          this.dataNegara.push({
            no: '',
            countryId: element.countryId,
            countryNameIdn: element.countryNameIdn,
          });
        });
        this.dataSource = new MatTableDataSource(this.dataNegara);
        this.ngAfterViewInit();
      });
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // tambahkan logic untuk menghapus data
      }
    });
  }
}
