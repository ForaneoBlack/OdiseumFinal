import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Detalle_Factura } from '../Models/detalle_factura';

@Injectable({
  providedIn: 'root'
})
export class DetalleFacturaService {

  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  url: string = 'https://bryantenemea.com/api/detalle';

  constructor(private http: HttpClient) { }
  getDetalleFactura(): Observable<Detalle_Factura[]> {
    return this.http.get<Detalle_Factura[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }

  creargetDetalleFactura(detalle: Detalle_Factura): Observable<Detalle_Factura>{
    return this.http.post<Detalle_Factura>(this.url+'/crear',detalle,{headers: this.HttpHeaders});
  }

  obtenergetDetalleFactura(iddetalle: number): Observable<Detalle_Factura>{
    return this.http.get<Detalle_Factura>(this.url+'/listar id/'+iddetalle,{headers: this.HttpHeaders});
  }

  updategetDetalleFactura(detalle: Detalle_Factura): Observable<Detalle_Factura>{
    return this.http.put<Detalle_Factura>(this.url+'/editar/'+detalle.iddetalle,detalle,{headers: this.HttpHeaders});
  }

  obtenerProducto(idproducto: number): Observable<Detalle_Factura>{
    return this.http.get<Detalle_Factura>(this.url+'/listar/productos/'+idproducto,{headers: this.HttpHeaders});
  }

  obtenerServicio(idservicio: number): Observable<Detalle_Factura>{
    return this.http.get<Detalle_Factura>(this.url+'/listar/servicios/'+idservicio,{headers: this.HttpHeaders});
  }
  
}
