import { Component, OnInit } from '@angular/core';
import { WilayahService } from '../../wilayah.service';
import { Negara } from 'src/app/model/negaraModel';
import { MatTableDataSource } from '@angular/material/table';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-provinsi',
  templateUrl: './create-provinsi.component.html',
  styleUrls: ['./create-provinsi.component.css'],
})
export class CreateProvinsiComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    private router: Router,
    private formBuilder: FormBuilder,
    private title: Title
  ) {
    this.dataSource = new MatTableDataSource(this.dataNegara);
    this.cekValidasi();
  }

  dataNegara: Negara[] = [];
  dataSource!: MatTableDataSource<Negara>;
  namaProvinsi: any;
  selectIdNegara: any;
  formValidasi!: FormGroup;

  getCountry() {
    this.wilayahService.getAll('country/?page=1&size=1000').subscribe((res) => {
      this.dataNegara = res.body.result;
      this.dataSource = new MatTableDataSource(this.dataNegara);
    });
  }

  createProvinsi() {
    let parameter = {
      provinceName: this.namaProvinsi,
      countryId: this.selectIdNegara.countryId,
    };
    console.log(parameter);
    this.wilayahService.postAll('province', parameter).subscribe((res) => {
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
            this.router.navigate(['/wilayah-provinsi']);
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
      idProvinsi: { value: '', disabled: true },
      namaProvinsi: ['', [Validators.required]],
      selectIdNegara: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCountry();
    this.title.setTitle('Buat Provinsi');
  }
}
