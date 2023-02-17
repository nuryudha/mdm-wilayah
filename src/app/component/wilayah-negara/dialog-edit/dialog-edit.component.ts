import { Component, OnInit } from '@angular/core';
import { WilayahService } from '../../wilayah.service';
import { NegaraModel } from 'src/app/model/negaraModel';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css'],
})
export class DialogEditComponent implements OnInit {
  id: any;
  idCountry: any;
  countryNameIdn: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wilayahService: WilayahService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getId();
  }

  getId() {
    this.wilayahService.getId('country/' + this.id).subscribe((res) => {
      console.log(res);
      this.idCountry = res.body.result.countryId;
      this.countryNameIdn = res.body.result.countryNameIdn;
    });
  }

  saveEdit() {
    let parameter = {
      countryId: this.idCountry,
      countryNameIdn: this.countryNameIdn,
    };
    console.log(parameter);
    this.wilayahService.putId('country/', parameter).subscribe((res) => {
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
            this.router.navigate(['/wilayah-negara']);
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
}
