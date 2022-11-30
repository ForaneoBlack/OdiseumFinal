import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategoriaempresa } from '../Models/subcategoriaempresa';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  //url: string ='http://localhost:8080/api/categoriaempresa'

   url: string = 'https://bryantenemea.com/api/subcategoriaempresa';

  constructor(private http: HttpClient) { }

  getSubcategoria(): Observable<Subcategoriaempresa[]> {
    return this.http.get<Subcategoriaempresa[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }
  getSubcategoriaxidcat(): Observable<Subcategoriaempresa[]> {
    return this.http.get<Subcategoriaempresa[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }

  crearSubcategoria(subcategoria: Subcategoriaempresa): Observable<Subcategoriaempresa>{
    return this.http.post<Subcategoriaempresa>(this.url+'/crear',subcategoria,{headers: this.HttpHeaders});
  }

  obtenerSubcategoria(idsubcatemp: number): Observable<Subcategoriaempresa>{
    return this.http.get<Subcategoriaempresa>(this.url+'/listar id/'+idsubcatemp,{headers: this.HttpHeaders});
  }
 
  updateSubcategoria(subcategoria: Subcategoriaempresa): Observable<Subcategoriaempresa>{
    return this.http.put<Subcategoriaempresa>(this.url+'/editar/'+subcategoria.idsubcatemp,subcategoria,{headers: this.HttpHeaders});
  }
  eliminar(subcategoria: Subcategoriaempresa){
    const path =`${this.url}/${subcategoria.idsubcatemp}` ;
    return this.http.delete<Subcategoriaempresa>(this.url+"/eliminar/"+subcategoria.idsubcatemp,{headers: this.HttpHeaders});
  }

}
