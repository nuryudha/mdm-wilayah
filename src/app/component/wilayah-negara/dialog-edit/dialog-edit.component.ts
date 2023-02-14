import { Component, OnInit } from '@angular/core';
import { WilayahService } from '../../wilayah.service';
import { NegaraModel } from 'src/app/model/negaraModel';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css'],
})
export class DialogEditComponent implements OnInit {
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
  constructor(
    private route: ActivatedRoute,
    // private router: Router,
    private foodEditService: WilayahService
  ) {}
  id: any;
  dataView: any;
  element = new NegaraModel();

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getViewId();
  }

  getViewId() {
    this.foodEditService.getViewId(this.id).subscribe((res) => {
      this.dataView = res;
      this.element = this.dataView;
      console.log(res);
    });
  }
}
