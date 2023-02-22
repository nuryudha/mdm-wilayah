import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Negara } from 'src/app/model/negaraModel';
import { Provinsi } from 'src/app/model/provinsiModel';
import { DataKabupatenComponent } from '../data-kabupaten/data-kabupaten.component';
import { WilayahService } from '../../wilayah.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-kecamatan',
  templateUrl: './edit-kecamatan.component.html',
  styleUrls: ['./edit-kecamatan.component.css'],
})
export class EditKecamatanComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private wilayahService: WilayahService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  dataSourceNegara!: MatTableDataSource<Negara>;
  dataNegara: Negara[] = [];
  dataSourceProvinsi!: MatTableDataSource<Provinsi>;
  dataProvinsi: Provinsi[] = [];
  namaKecamatan: any;
  idKecamatan: any;
  namaKabupaten: any;
  idKabupaten: any;
  selectNameProvinsi: any;
  selectIdProvinsi: any;
  selectNameNegara: any;
  selectIdNegara: any;
  id: any;

  getCountry() {
    this.wilayahService.getAll('country/?page=1&size=1000').subscribe((res) => {
      this.dataNegara = res.body.result;
      this.dataSourceNegara = new MatTableDataSource(this.dataNegara);
    });
  }

  getProvinsi() {
    this.wilayahService
      .getAll('province/?page=1&size=1000')
      .subscribe((res) => {
        this.dataProvinsi = res.body.result;
        this.dataSourceProvinsi = new MatTableDataSource(this.dataProvinsi);
      });
  }

  getIdKecamatan() {
    this.wilayahService.getId('district/' + this.id).subscribe((res) => {
      console.log(res);
      this.namaKecamatan = res.body.result.districtName;
      this.namaKabupaten = res.body.result.cityName;
      this.idKabupaten = res.body.result.cityId;
      this.selectNameProvinsi = res.body.result.provinceName;
      this.selectIdProvinsi = res.body.result.provinceId;
      this.selectNameNegara = res.body.result.countryNameIdn;
      this.selectIdNegara = res.body.result.countryId;
    });
  }

  getDataKabupaten() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '60%';
    dialogConfig.height = '90%';
    this.dialog
      .open(DataKabupatenComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        this.namaKabupaten = res.cityName;
        this.idKabupaten = res.cityId;
        this.selectNameProvinsi = res.provinceName;
        this.selectIdProvinsi = res.countryId;
        this.selectNameNegara = res.countryNameIdn;
        this.selectIdNegara = res.provinceId;
      });
  }

  saveEditKecamatan() {
    let parameter = {
      districtId: this.idKecamatan,
      districtName: this.namaKecamatan,
      cityId: this.idKabupaten,
      cityName: this.namaKabupaten,
      provinceId: this.selectIdProvinsi,
      countryId: this.selectIdNegara,
    };
    console.log(parameter);
    this.wilayahService.putId('district', parameter).subscribe((res) => {
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
          if (res) {
            this.router.navigate(['/wilayah-kecamatan']);
          }
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

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.idKecamatan = this.id;
    this.getCountry();
    this.getProvinsi();
    this.getIdKecamatan();
  }
}
