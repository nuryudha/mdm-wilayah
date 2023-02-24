import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WilayahNegaraComponent } from './component/wilayah-negara/wilayah-negara.component';
import { WilayahProvinsiComponent } from './component/wilayah-provinsi/wilayah-provinsi.component';
import { DialogCreateComponent } from './component/wilayah-negara/dialog-create/dialog-create.component';
import { DialogEditComponent } from './component/wilayah-negara/dialog-edit/dialog-edit.component';
import { WilayahKabupatenComponent } from './component/wilayah-kabupaten/wilayah-kabupaten.component';
import { WilayahKecamatanComponent } from './component/wilayah-kecamatan/wilayah-kecamatan.component';
import { WilayahKelurahanComponent } from './component/wilayah-kelurahan/wilayah-kelurahan.component';
import { CreateProvinsiComponent } from './component/wilayah-provinsi/create-provinsi/create-provinsi.component';
import { EditProvinsiComponent } from './component/wilayah-provinsi/edit-provinsi/edit-provinsi.component';
import { CreateKabupatenComponent } from './component/wilayah-kabupaten/create-kabupaten/create-kabupaten.component';
import { EditKabupatenComponent } from './component/wilayah-kabupaten/edit-kabupaten/edit-kabupaten.component';
import { CreateKecamatanComponent } from './component/wilayah-kecamatan/create-kecamatan/create-kecamatan.component';
import { EditKecamatanComponent } from './component/wilayah-kecamatan/edit-kecamatan/edit-kecamatan.component';
import { CreateKelurahanComponent } from './component/wilayah-kelurahan/create-kelurahan/create-kelurahan.component';
import { EditKelurahanComponent } from './component/wilayah-kelurahan/edit-kelurahan/edit-kelurahan.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: 'wilayah-negara',
    component: WilayahNegaraComponent,
  },
  {
    path: 'create-negara',
    component: DialogCreateComponent,
  },
  {
    path: 'edit-negara/:id',
    component: DialogEditComponent,
  },
  {
    path: 'wilayah-provinsi',
    component: WilayahProvinsiComponent,
  },
  {
    path: 'create-provinsi',
    component: CreateProvinsiComponent,
  },
  {
    path: 'edit-provinsi/:id',
    component: EditProvinsiComponent,
  },
  {
    path: 'wilayah-kabupaten',
    component: WilayahKabupatenComponent,
  },
  {
    path: 'create-kabupaten',
    component: CreateKabupatenComponent,
  },
  {
    path: 'edit-kabupaten/:id',
    component: EditKabupatenComponent,
  },
  {
    path: 'wilayah-kecamatan',
    component: WilayahKecamatanComponent,
  },
  {
    path: 'create-kecamatan',
    component: CreateKecamatanComponent,
  },
  {
    path: 'edit-kecamatan/:id',
    component: EditKecamatanComponent,
  },
  {
    path: 'wilayah-kelurahan',
    component: WilayahKelurahanComponent,
  },
  {
    path: 'create-kelurahan',
    component: CreateKelurahanComponent,
  },
  {
    path: 'edit-kelurahan/:id',
    component: EditKelurahanComponent,
  },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
