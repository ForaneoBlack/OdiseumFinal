import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../Models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  url: string = 'http://localhost:8080/api/factura';

  constructor(private http: HttpClient) { }

  getFactura(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }

  crearFactura(factura: Factura): Observable<Factura>{
    return this.http.post<Factura>(this.url+'/crear',factura,{headers: this.HttpHeaders});
  }

  obtenerFactura(idfactura: number): Observable<Factura>{
    return this.http.get<Factura>(this.url+'/listar id/'+idfactura,{headers: this.HttpHeaders});
  }

  updateFactura(factura: Factura): Observable<Factura>{
    return this.http.put<Factura>(this.url+'/editar/'+factura.idfactura,factura,{headers: this.HttpHeaders});
  }
  
}
