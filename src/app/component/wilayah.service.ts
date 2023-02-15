import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NegaraModel } from '../model/negaraModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WilayahService {
  constructor(private httpClient: HttpClient) {}

  getCountry() {}
}
