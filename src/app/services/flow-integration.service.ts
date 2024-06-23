import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as crypto from 'crypto-js'; // Asegúrate de instalar crypto-js

@Injectable({
  providedIn: 'root'
})
export class FlowIntegrationService {
  private apiUrl = 'https://sandbox.flow.cl'; // URL de la API de Flow (en ambiente de sandbox)
  private apiKey = '3FCF897E-26AA-4EDD-8714-85988013LC2E'; // Reemplaza con tu API Key
  private secretKey = 'd1cda8dc80e05313df694720dcece9e40e2a837e'; // Reemplaza con tu Secret Key


  constructor(private http: HttpClient) { }
  private crearFirma(datos: any): string {
    const datosOrdenados = Object.keys(datos).sort().map(key => `${key}=${datos[key]}`).join('&');
    return crypto.HmacSHA256(datosOrdenados, this.secretKey).toString(crypto.enc.Hex);
  }









  iniciarPago(datosPago: any): Observable<any> {
    const datosConFirma = {
      ...datosPago,
      apiKey: this.apiKey,
      s: this.crearFirma(datosPago)
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/api/payment/create`, datosConFirma, { headers });
  }
}
