import { Component, OnInit, ViewChild } from '@angular/core';
import { WilayahService } from '../wilayah.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NegaraModel } from 'src/app/model/negaraModel';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-wilayah-negara',
  templateUrl: './wilayah-negara.component.html',
  styleUrls: ['./wilayah-negara.component.css'],
})
export class WilayahNegaraComponent implements OnInit {
  i = 0;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dataFoods: any;
  titlePage = 'Negara';
  displayedColumns: string[] = ['id', 'daerah', 'namamakanan', 'action'];
  dataSource = new MatTableDataSource<Food>([]);
  constructor(
    private wilayahService: WilayahService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getDataFoods();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getDataFoods() {
    this.wilayahService.getDataFoods().subscribe((res) => {
      this.dataFoods = res;
      this.dataSource = new MatTableDataSource<Food>(this.dataFoods);
      this.dataSource.paginator = this.paginator;
      console.log(res);
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

export interface Food {
  id: number;
  namamakanan: string;
  daerah: string;
  jumlah: number;
}
