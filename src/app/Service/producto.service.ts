import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { Producto } from '../Models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  url: string = 'http://localhost:8080/api/prodcuto';
  //url: string = 'http://localhost:9898/api/prodcuto';

  constructor(private http: HttpClient) { }

  getProducto(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }

  crearProducto(producto: Producto): Observable<Producto>{
    return this.http.post<Producto>(this.url+'/crear',producto,{headers: this.HttpHeaders});
  }

  obtenerProducto(idproducto: number): Observable<Producto>{
    return this.http.get<Producto>(this.url+'/listar id/'+idproducto,{headers: this.HttpHeaders});
  }

  obtenerProductoempresa(idempresa: number): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url+'/listar/empresa/'+idempresa,{headers: this.HttpHeaders});
  }

  updateProducto(producto: Producto): Observable<Producto>{
    return this.http.put<Producto>(this.url+'/editar/'+producto.idproducto,producto,{headers: this.HttpHeaders});
  }
  eliminar(producto: Producto){
    const path =`${this.url}/${producto.idproducto}` ;
    return this.http.delete<Producto>(this.url+"/eliminar/"+producto.idproducto,{headers: this.HttpHeaders});
  }

  getreporte(idempres: number):Observable<String[]>{
    return this.http.get<String[]>(this.url+"/listar/productosventa"+idempres,{headers:this.HttpHeaders}).pipe(map(response => response as String[]))
  }

}
