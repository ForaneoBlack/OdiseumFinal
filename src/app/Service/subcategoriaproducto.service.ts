import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { subcategoriaProducto } from '../Models/subcategoriaProducto';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaproductoService {
  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  //url: string ='http://localhost:8080/api/categoriaproducto'
  url: string = 'https://bryantenemea.com/api/subcategoriaproducto';
  constructor(private http: HttpClient) { }

  getSubcategoria(): Observable<subcategoriaProducto[]> {
    return this.http.get<subcategoriaProducto[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }

  getSubcategoria_idcat(): Observable<subcategoriaProducto[]> {
    return this.http.get<subcategoriaProducto[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }
  crearSubcategoria(subcategoria: subcategoriaProducto): Observable<subcategoriaProducto>{
    return this.http.post<subcategoriaProducto>(this.url+'/crear',subcategoria,{headers: this.HttpHeaders});
  }
  obtenerSubcategoria(subcatproid: number): Observable<subcategoriaProducto>{
    return this.http.get<subcategoriaProducto>(this.url+'/listar id/'+subcatproid,{headers: this.HttpHeaders});
  }
  updateSubcategoria(subcategoria: subcategoriaProducto): Observable<subcategoriaProducto>{
    return this.http.put<subcategoriaProducto>(this.url+'/editar/'+subcategoria.subcatproid,subcategoria,{headers: this.HttpHeaders});
  }
  eliminar(subcategoria: subcategoriaProducto){
    const path =`${this.url}/${subcategoria.subcatproid}` ;
    return this.http.delete<subcategoriaProducto>(this.url+"/eliminar/"+subcategoria.subcatproid,{headers: this.HttpHeaders});
  }
}
