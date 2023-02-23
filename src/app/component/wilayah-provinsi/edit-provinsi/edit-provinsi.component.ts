import { Component, OnInit } from '@angular/core';
import { WilayahService } from '../../wilayah.service';
import { Negara } from 'src/app/model/negaraModel';
import { MatTableDataSource } from '@angular/material/table';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-provinsi',
  templateUrl: './edit-provinsi.component.html',
  styleUrls: ['./edit-provinsi.component.css'],
})
export class EditProvinsiComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  dataNegara: Negara[] = [];
  dataSource!: MatTableDataSource<Negara>;
  namaProvinsi: any;
  selectIdNegara: any;
  formValidasi!: FormGroup;
  id: any;
  idProvinsi: any;
  statusText: any;
  error = false;

  getCountry() {
    this.wilayahService.getAll('country/?page=1&size=1000').subscribe(
      (res) => {
        this.dataNegara = res.body.result;
        this.dataSource = new MatTableDataSource(this.dataNegara);
      },
      (error) => {
        console.log(error);
        this.statusText = error.statusText;
        this.error = true;
        Swal.fire({
          icon: 'error',
          title: 'Service Unavailable',
        });
      }
    );
  }

  getIdProvinsi() {
    this.wilayahService.getId('province/' + this.id).subscribe((res) => {
      console.log(res);
      this.namaProvinsi = res.body.result.provinceName;
      this.selectIdNegara = res.body.result.countryId;
    });
  }

  saveEditProvinsi() {
    let parameter = {
      provinceName: this.namaProvinsi,
      countryId: this.selectIdNegara,
      provinceId: this.idProvinsi,
    };
    console.log(parameter);
    this.wilayahService.putId('province/', parameter).subscribe(
      (res) => {
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
              this.router.navigate(['/wilayah-provinsi']);
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
      },
      (error) => {
        console.log(error.status);
        if (error.status == '400') {
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,

            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'error',
            title: 'Service Unavailable',
          });
        }
      }
    );
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.idProvinsi = this.id;
    this.getCountry();
    this.getIdProvinsi();
    this.title.setTitle('Edit Provinsi');
  }
}
