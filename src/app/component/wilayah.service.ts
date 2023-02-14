import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NegaraModel } from '../model/negaraModel';

@Injectable({
  providedIn: 'root',
})
export class WilayahService {
  constructor(private httpClient: HttpClient) {}

  httpOptions: any;
  url = 'http://localhost:8000/api/foods';

  getDataFoods() {
    return this.httpClient.get(this.url, this.httpOptions);
  }

  getViewId(id: NegaraModel) {
    return this.httpClient.get(this.url + '/' + id);
  }

  getUpdateData(id: NegaraModel, data: NegaraModel) {
    return this.httpClient.put(this.url + '/' + id, data);
  }

  deleteData(id: NegaraModel) {
    return this.httpClient.delete(this.url + '/' + id);
  }

  insertData(data: NegaraModel) {
    return this.httpClient.post(this.url, data);
  }
}
