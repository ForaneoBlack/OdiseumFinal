import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../Models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})
    //url: string ='http://localhost:8080/api/categoriaempresa'

  url: string = 'http://localhost:8080/api/categoriaempresa';

  constructor(private http: HttpClient) { }

  getCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }

  crearCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.url+'/crear',categoria,{headers: this.HttpHeaders});
  }

  obtenerCategoria(idcatemp: number): Observable<Categoria>{
    return this.http.get<Categoria>(this.url+'/listar id/'+idcatemp,{headers: this.HttpHeaders});
  }
 
  updateCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.put<Categoria>(this.url+'/editar/'+categoria.idcatemp,categoria,{headers: this.HttpHeaders});
  }
  eliminar(categoria: Categoria){
    const path =`${this.url}/${categoria.idcatemp}` ;
    return this.http.delete<Categoria>(this.url+"/eliminar/"+categoria.idcatemp,{headers: this.HttpHeaders});
  }

}

