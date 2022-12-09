import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoriaProducto } from "../Models/categoriaProducto";

@Injectable({
  providedIn: "root",
})
export class CategoriaproductoService {

  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  //url = "http://localhost:8080/api/categoriaproducto";
  url: string = 'http://localhost:8080/api/categoriaproducto';
  constructor(private http: HttpClient) {}

  getCategoria(): Observable<CategoriaProducto[]> {
    return this.http.get<CategoriaProducto[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }

  crearCategoria(categoriapro: CategoriaProducto): Observable<CategoriaProducto>{
    return this.http.post<CategoriaProducto>(this.url+'/crear',categoriapro,{headers: this.HttpHeaders});
  }
  obtenerCategoria(catproid: number): Observable<CategoriaProducto>{
    return this.http.get<CategoriaProducto>(this.url+'/listar id/'+catproid,{headers: this.HttpHeaders});
  }
  updateCategoria(categoria: CategoriaProducto): Observable<CategoriaProducto>{
    return this.http.put<CategoriaProducto>(this.url+'/editar/'+categoria.catproid,categoria,{headers: this.HttpHeaders});
  }
  eliminar(categoria: CategoriaProducto){
    const path =`${this.url}/${categoria.catproid}` ;
    return this.http.delete<CategoriaProducto>(this.url+"/eliminar/"+categoria.catproid,{headers: this.HttpHeaders});
  }
}