import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { WilayahService } from '../../wilayah.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.css'],
})
export class DialogCreateComponent implements OnInit {
  idNegara: any;
  namaNegara: any;
  createNegara() {
    let parameter = {
      countryId: this.idNegara,
      countryNameIdn: this.namaNegara,
    };
    console.log(parameter);
    this.wilayahService.postAll('country', parameter).subscribe((res) => {
      let statusCode = res.body.status.responseCode;
      let statusDesc = res.body.status.responseDesc;
      console.log(res);
      if (statusCode == '200') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Berhasil',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (statusDesc.toLowerCase().includes('already exist')) {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Data Sudah Ada',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Buat Negara Gagal',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  constructor(private wilayahService: WilayahService, private router: Router) {}

  ngOnInit(): void {}
}
