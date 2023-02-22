import { Component, OnInit } from '@angular/core';
import { WilayahService } from '../../wilayah.service';
import { Negara } from 'src/app/model/negaraModel';
import { MatTableDataSource } from '@angular/material/table';
import { Provinsi } from 'src/app/model/provinsiModel';
import { Kabupaten } from 'src/app/model/kabupatenModel';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataKecamatanComponent } from '../data-kecamatan/data-kecamatan.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-kelurahan',
  templateUrl: './create-kelurahan.component.html',
  styleUrls: ['./create-kelurahan.component.css'],
})
export class CreateKelurahanComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  namaKelurahan: any;
  kodePos: any;
  idKecamatan: any;
  namaKecamatan: any;
  selectIdKabupaten: any;
  selectIdProvinsi: any;
  selectIdNegara: any;
  dataNegara: Negara[] = [];
  dataSourceNegara!: MatTableDataSource<Negara>;
  dataProvinsi: Provinsi[] = [];
  dataSourceProvinsi!: MatTableDataSource<Provinsi>;
  dataKabupaten: Kabupaten[] = [];
  dataSourceKabupaten!: MatTableDataSource<Kabupaten>;

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

  getKabupaten() {
    this.wilayahService.getAll('city/?page=1&size=1000').subscribe((res) => {
      this.dataKabupaten = res.body.result;
      this.dataSourceKabupaten = new MatTableDataSource(this.dataKabupaten);
    });
  }

  getDataKecamatan() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '60%';
    dialogConfig.height = '90%';
    this.dialog
      .open(DataKecamatanComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        this.namaKecamatan = res.districtName;
        this.idKecamatan = res.districtId;
        this.selectIdKabupaten = res.cityId;
        this.selectIdProvinsi = res.provinceId;
        this.selectIdNegara = res.countryId;
      });
  }

  createKelurahan() {
    let parameter = {
      cityId: this.selectIdKabupaten,
      countryId: this.selectIdNegara,
      districtId: this.idKecamatan,
      districtName: this.namaKecamatan,
      provinceId: this.selectIdProvinsi,
      villageName: this.namaKelurahan,
      villagePostalCode: this.kodePos,
    };
    console.log(parameter);
    this.wilayahService.postAll('village', parameter).subscribe((res) => {
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
          if (res) {
            this.router.navigate(['/wilayah-kelurahan']);
          }
        });
      } else if (statusDesc.toLowerCase().includes('already exist')) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: statusDesc,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Service Not Found',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  ngOnInit(): void {
    this.getCountry();
    this.getProvinsi();
    this.getKabupaten();
  }
}
