import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WilayahNegaraComponent } from './component/wilayah-negara/wilayah-negara.component';
import { WilayahProvinsiComponent } from './component/wilayah-provinsi/wilayah-provinsi.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DialogCreateComponent } from './component/wilayah-negara/dialog-create/dialog-create.component';
import { DialogEditComponent } from './component/wilayah-negara/dialog-edit/dialog-edit.component';
import { DialogDeleteComponent } from './component/wilayah-negara/dialog-delete/dialog-delete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { WilayahKabupatenComponent } from './component/wilayah-kabupaten/wilayah-kabupaten.component';
import { WilayahKecamatanComponent } from './component/wilayah-kecamatan/wilayah-kecamatan.component';
import { WilayahKelurahanComponent } from './component/wilayah-kelurahan/wilayah-kelurahan.component';
import { CreateKelurahanComponent } from './component/wilayah-kelurahan/create-kelurahan/create-kelurahan.component';
import { DeleteKelurahanComponent } from './component/wilayah-kelurahan/delete-kelurahan/delete-kelurahan.component';
import { EditKelurahanComponent } from './component/wilayah-kelurahan/edit-kelurahan/edit-kelurahan.component';
import { EditKecamatanComponent } from './component/wilayah-kecamatan/edit-kecamatan/edit-kecamatan.component';
import { CreateKecamatanComponent } from './component/wilayah-kecamatan/create-kecamatan/create-kecamatan.component';
import { DeleteKecamatanComponent } from './component/wilayah-kecamatan/delete-kecamatan/delete-kecamatan.component';
import { DeleteKabupatenComponent } from './component/wilayah-kabupaten/delete-kabupaten/delete-kabupaten.component';
import { EditKabupatenComponent } from './component/wilayah-kabupaten/edit-kabupaten/edit-kabupaten.component';
import { CreateKabupatenComponent } from './component/wilayah-kabupaten/create-kabupaten/create-kabupaten.component';
import { CreateProvinsiComponent } from './component/wilayah-provinsi/create-provinsi/create-provinsi.component';
import { EditProvinsiComponent } from './component/wilayah-provinsi/edit-provinsi/edit-provinsi.component';
import { DeleteProvinsiComponent } from './component/wilayah-provinsi/delete-provinsi/delete-provinsi.component';
import { AlfabetOnlyDirective } from './directives/alfabet-only.directive';

import { MatSelectModule } from '@angular/material/select';
import { DataKabupatenComponent } from './component/wilayah-kecamatan/data-kabupaten/data-kabupaten.component';
import { DataKecamatanComponent } from './component/wilayah-kelurahan/data-kecamatan/data-kecamatan.component';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    WilayahNegaraComponent,
    WilayahProvinsiComponent,
    DialogCreateComponent,
    DialogEditComponent,
    DialogDeleteComponent,
    WilayahKabupatenComponent,
    WilayahKecamatanComponent,
    WilayahKelurahanComponent,
    CreateKelurahanComponent,
    DeleteKelurahanComponent,
    EditKelurahanComponent,
    EditKecamatanComponent,
    CreateKecamatanComponent,
    DeleteKecamatanComponent,
    DeleteKabupatenComponent,
    EditKabupatenComponent,
    CreateKabupatenComponent,
    CreateProvinsiComponent,
    EditProvinsiComponent,
    DeleteProvinsiComponent,
    AlfabetOnlyDirective,
    DataKabupatenComponent,
    DataKecamatanComponent,
    NumberOnlyDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
