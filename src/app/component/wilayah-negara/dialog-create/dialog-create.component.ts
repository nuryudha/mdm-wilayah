import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WilayahService } from '../../wilayah.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.css'],
})
export class DialogCreateComponent implements OnInit {
  idNegara: any;
  namaNegara: any;
  constructor(
    private wilayahService: WilayahService,
    private router: Router,
    private formBuilder: FormBuilder,
    private title: Title
  ) {
    this.cekValidasi();
  }
  formValidasi!: FormGroup;
  cekValidasi() {
    this.formValidasi = this.formBuilder.group({
      idNegara: ['', [Validators.required]],
      namaNegara: ['', [Validators.required]],
    });
  }

  getCountry() {
    this.wilayahService.getAll('country/?page=1&size=1000').subscribe(
      (res) => {},
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Service Unavailable',
        });
      }
    );
  }
  createNegara() {
    let parameter = {
      countryId: this.idNegara,
      countryNameIdn: this.namaNegara,
    };
    console.log(parameter);
    this.wilayahService.postAll('country', parameter).subscribe(
      (res) => {
        let statusCode = res.body.status.responseCode;
        let statusDesc = res.body.status.responseDesc;
        console.log(res);
        if (statusCode == '200') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: statusDesc,
            showConfirmButton: false,
            timer: 1500,
          }).then((res) => {
            if (res) {
              this.router.navigate(['/wilayah-negara']);
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
    this.title.setTitle('Buat Negara');
    this.getCountry();
  }
}
