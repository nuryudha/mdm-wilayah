import { Component, OnInit } from '@angular/core';
import { WilayahService } from '../../wilayah.service';
import { MatTableDataSource } from '@angular/material/table';
import { Negara } from 'src/app/model/negaraModel';
import { Provinsi } from 'src/app/model/provinsiModel';
import Swal from 'sweetalert2';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-kabupaten',
  templateUrl: './create-kabupaten.component.html',
  styleUrls: ['./create-kabupaten.component.css'],
})
export class CreateKabupatenComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    private router: Router,
    private formBuilder: FormBuilder,
    private title: Title
  ) {
    this.cekValidasi();
  }

  namaKabupaten: any;
  selectIdProvinsi: any;
  selectIdNegara: any;
  dataSourceNegara!: MatTableDataSource<Negara>;
  dataNegara: Negara[] = [];
  dataSourceProvinsi!: MatTableDataSource<Provinsi>;
  dataProvinsi: Provinsi[] = [];
  formValidasi!: FormGroup;

  getCountry() {
    this.wilayahService.getAll('country/?page=1&size=1000').subscribe((res) => {
      console.log(res);
      this.dataNegara = res.body.result;
      this.dataSourceNegara = new MatTableDataSource(this.dataNegara);
    });
  }

  getProvinsi() {
    this.wilayahService
      .getAll('province/?page=1&size=1000')
      .subscribe((res) => {
        console.log(res);
        this.dataProvinsi = res.body.result;
        this.dataSourceProvinsi = new MatTableDataSource(this.dataProvinsi);
      });
  }

  createKabupaten() {
    let parameter = {
      cityName: this.namaKabupaten,
      provinceId: this.selectIdProvinsi.provinceId,
      countryId: this.selectIdNegara.countryId,
    };
    console.log(parameter);
    this.wilayahService.postAll('city', parameter).subscribe((res) => {
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
            this.router.navigate(['/wilayah-kabupaten']);
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
      idKabupaten: { value: '', disabled: true },
      namaKabupaten: ['', [Validators.required]],
      selectIdProvinsi: ['', [Validators.required]],
      selectIdNegara: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCountry();
    this.getProvinsi();
    this.title.setTitle('Buat Kabupaten');
  }
}
