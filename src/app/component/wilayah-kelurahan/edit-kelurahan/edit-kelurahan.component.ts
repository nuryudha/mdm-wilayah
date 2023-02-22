import { Component, OnInit } from '@angular/core';
import { DataKabupaten, Kabupaten } from 'src/app/model/kabupatenModel';
import { Negara } from 'src/app/model/negaraModel';
import { Provinsi } from 'src/app/model/provinsiModel';
import { WilayahService } from '../../wilayah.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataKecamatanComponent } from '../data-kecamatan/data-kecamatan.component';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-kelurahan',
  templateUrl: './edit-kelurahan.component.html',
  styleUrls: ['./edit-kelurahan.component.css'],
})
export class EditKelurahanComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  id: any;

  namaKelurahan: any;
  idKelurahan: any;
  kodePos: any;
  namaKecamatan: any;
  idKecamatan: any;
  selectIdKabupaten: any;
  selectNamaKabupaten: any;
  dataKabupaten: Kabupaten[] = [];
  dataSourceKabupaten!: MatTableDataSource<Kabupaten>;
  selectIdProvinsi: any;
  selectNamaProvinsi: any;
  dataProvinsi: Provinsi[] = [];
  dataSourceProvinsi!: MatTableDataSource<Provinsi>;
  selectIdNegara: any;
  selectNamaNegara: any;
  dataNegara: Negara[] = [];
  dataSourceNegara!: MatTableDataSource<Negara>;

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

  getIdKelurahan() {
    this.wilayahService.getId('village/' + this.id).subscribe((res) => {
      this.namaKelurahan = res.body.result.villageName;
      this.kodePos = res.body.result.villagePostalCode;
      this.namaKecamatan = res.body.result.districtName;
      this.idKecamatan = res.body.result.districtId;
      this.selectIdKabupaten = res.body.result.cityId;
      this.selectNamaKabupaten = res.body.result.cityName;
      this.selectIdProvinsi = res.body.result.provinceId;
      this.selectNamaProvinsi = res.body.result.provinceName;
      this.selectIdNegara = res.body.result.countryId;
      this.selectNamaNegara = res.body.result.countryNameIdn;
    });
  }
  // http://mff-gateway-dev.apps.ocp4dev.muf.co.id/mdm/wilayah/village/
  saveEditKelurahan() {
    let parameter = {
      cityId: this.selectIdKabupaten,
      cityName: this.selectNamaKabupaten,
      countryId: this.selectIdNegara,
      countryNameIdn: this.selectNamaNegara,
      districtId: this.idKecamatan,
      districtName: this.namaKecamatan,
      provinceId: this.selectIdProvinsi,
      provinceName: this.selectNamaProvinsi,
      villageId: this.idKelurahan,
      villageName: this.namaKelurahan,
      villagePostalCode: this.kodePos,
    };
    console.log(parameter);
    this.wilayahService.putId('village', parameter).subscribe((res) => {
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
            this.router.navigate(['/wilayah-kelurahan']);
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
    this.idKelurahan = this.id;
    this.getCountry();
    this.getProvinsi();
    this.getKabupaten();
    this.getIdKelurahan();
  }
}
