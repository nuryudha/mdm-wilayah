import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Negara } from 'src/app/model/negaraModel';
import { Provinsi } from 'src/app/model/provinsiModel';
import { WilayahService } from '../../wilayah.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-kabupaten',
  templateUrl: './edit-kabupaten.component.html',
  styleUrls: ['./edit-kabupaten.component.css'],
})
export class EditKabupatenComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {}

  namaKabupaten: any;
  selectIdProvinsi: any;
  selectIdNegara: any;
  dataSourceNegara!: MatTableDataSource<Negara>;
  dataNegara: Negara[] = [];
  dataSourceProvinsi!: MatTableDataSource<Provinsi>;
  dataProvinsi: Provinsi[] = [];
  formValidasi!: FormGroup;
  id: any;
  idKabupaten: any;

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

  getIdKabupaten() {
    this.wilayahService.getId('city/' + this.id).subscribe((res) => {
      console.log(res);
      this.namaKabupaten = res.body.result.cityName;
      this.selectIdProvinsi = res.body.result.provinceId;
      this.selectIdNegara = res.body.result.countryId;
    });
  }

  saveEditKabupaten() {
    let parameter = {
      cityId: this.idKabupaten,
      cityName: this.namaKabupaten,
      provinceId: this.selectIdProvinsi,
      countryId: this.selectIdNegara,
    };
    console.log(parameter);
    this.wilayahService.putId('city/', parameter).subscribe((res) => {
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
            this.router.navigate(['/wilayah-kabupaten']);
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
    this.idKabupaten = this.id;
    this.getCountry();
    this.getProvinsi();
    this.getIdKabupaten();
    this.title.setTitle('Edit Kabupaten');
  }
}
