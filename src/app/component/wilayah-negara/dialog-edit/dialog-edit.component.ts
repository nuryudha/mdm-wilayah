import { Component, OnInit } from '@angular/core';
import { WilayahService } from '../../wilayah.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

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
    private wilayahService: WilayahService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getId();
    this.title.setTitle('Edit Negara');
  }

  getId() {
    this.wilayahService.getId('country/' + this.id).subscribe(
      (res) => {
        console.log(res);
        this.idCountry = res.body.result.countryId;
        this.countryNameIdn = res.body.result.countryNameIdn;
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Service Unavailable',
        });
      }
    );
  }

  saveEdit() {
    let parameter = {
      countryId: this.idCountry,
      countryNameIdn: this.countryNameIdn,
    };
    console.log(parameter);
    this.wilayahService.putId('country/', parameter).subscribe(
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
}
