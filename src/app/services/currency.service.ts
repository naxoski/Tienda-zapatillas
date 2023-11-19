import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiKey = '05ea31da3f234653b4bdd47dc4fffc8d';



  constructor(private http: HttpClient) { }
  obtenerTasasDeCambio(baseCurrency: string) {
    const apiUrl = `https://open.er-api.com/v6/latest/${baseCurrency}`;

    return axios.get(apiUrl);
  }
}
