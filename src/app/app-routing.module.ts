import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WilayahNegaraComponent } from './component/wilayah-negara/wilayah-negara.component';
import { WilayahProvinsiComponent } from './component/wilayah-provinsi/wilayah-provinsi.component';
import { DialogCreateComponent } from './component/wilayah-negara/dialog-create/dialog-create.component';
import { DialogEditComponent } from './component/wilayah-negara/dialog-edit/dialog-edit.component';
import { DialogDeleteComponent } from './component/wilayah-negara/dialog-delete/dialog-delete.component';

const routes: Routes = [
  {
    path: 'wilayah-negara',
    component: WilayahNegaraComponent,
  },
  {
    path: 'wilayah-provinsi',
    component: WilayahProvinsiComponent,
  },
  {
    path: 'dialog-negara',
    component: DialogCreateComponent,
  },
  {
    path: 'edit-negara/:id',
    component: DialogEditComponent,
  },
  {
    path: 'delete-negara/:id',
    component: DialogDeleteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
