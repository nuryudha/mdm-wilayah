import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NegaraModel } from 'src/app/model/negaraModel';
import { WilayahService } from '../../wilayah.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.css'],
})
export class DialogCreateComponent implements OnInit {
  element = new NegaraModel();
  isiIdNegara = new FormControl('', [
    Validators.required,
    Validators.maxLength(2),
  ]);
  isiNamaNegara = new FormControl('', [Validators.required]);
  IdNegara() {
    if (this.isiIdNegara.hasError('required')) {
      return 'Tidak Boleh Kosong';
    }
    if (this.isiIdNegara.value.length > 2) {
      return 'Panjang ID Negara tidak boleh lebih dari 2 karakter';
    }

    return '';
  }
  NamaNegara() {
    if (this.isiNamaNegara.hasError('required')) {
      return 'Tidak Boleh Kosong';
    }

    return '';
  }

  insertData() {
    this.wilayahService.insertData(this.element).subscribe((res) => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Data Berhasil Diinput',
        showConfirmButton: false,
        timer: 1000,
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          this.router.navigate(['../wilayah-negara']);
        }
      });
    });
  }
  constructor(private wilayahService: WilayahService, private router: Router) {}

  ngOnInit(): void {}
}
