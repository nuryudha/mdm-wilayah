import { Component, OnInit } from '@angular/core';
import { WilayahService } from '../../wilayah.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataKabupatenComponent } from '../data-kabupaten/data-kabupaten.component';
import { Negara } from 'src/app/model/negaraModel';
import { MatTableDataSource } from '@angular/material/table';
import { Provinsi } from 'src/app/model/provinsiModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-kecamatan',
  templateUrl: './create-kecamatan.component.html',
  styleUrls: ['./create-kecamatan.component.css'],
})
export class CreateKecamatanComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private title: Title
  ) {
    this.cekValidasi();
  }
  selectNameProvinsi: any;
  selectIdProvinsi: any;
  selectNameNegara: any;
  selectIdNegara: any;
  dataSourceNegara!: MatTableDataSource<Negara>;
  dataNegara: Negara[] = [];
  dataSourceProvinsi!: MatTableDataSource<Provinsi>;
  dataProvinsi: Provinsi[] = [];
  namaKabupaten: any;
  idKabupaten: any;
  namaKecamatan: any;
  formValidasi!: FormGroup;

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
        this.selectIdProvinsi = res.provinceId;
        this.selectNameNegara = res.countryNameIdn;
        this.selectIdNegara = res.countryId;
      });
  }
  createKecamatan() {
    let parameter = {
      cityId: this.idKabupaten,
      cityName: this.namaKabupaten,
      countryId: this.selectIdNegara,
      districtName: this.namaKecamatan,
      provinceId: this.selectIdProvinsi,
    };
    console.log(parameter);
    this.wilayahService.postAll('district', parameter).subscribe((res) => {
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
            this.router.navigate(['/wilayah-kecamatan']);
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

  cekValidasi() {
    this.formValidasi = this.formBuilder.group({
      idKecamatan: { value: '', disabled: true },
      namaKecamatan: ['', [Validators.required]],
      namaKabupaten: ['', [Validators.required]],
      selectIdProvinsi: { value: '', disabled: true },
      selectIdNegara: { value: '', disabled: true },
    });
  }

  ngOnInit(): void {
    this.getCountry();
    this.getProvinsi();
    this.title.setTitle('Buat Kecamatan');
  }
}
