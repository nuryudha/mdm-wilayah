import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WilayahService } from '../../wilayah.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css'],
})
export class DialogDeleteComponent implements OnInit {
  constructor(
    public wilayahService: WilayahService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log(this.data.idNegara);
  }

  delete() {
    this.wilayahService
      .deleteAll('country/' + this.data.idNegara)
      .subscribe((res) => {
        console.log(res);
      });
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
