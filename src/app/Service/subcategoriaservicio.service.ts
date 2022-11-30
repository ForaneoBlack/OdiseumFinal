import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subcategoriaservicio} from "../Models/subcategoriaservicio";

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaservicioService {
  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  url: string = 'https://bryantenemea.com/api/subcategoriaservicio';

  constructor(private http: HttpClient) { }

  getSubcategoria(): Observable<Subcategoriaservicio[]> {
    return this.http.get<Subcategoriaservicio[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }
  getSubcategoriaxidcat(): Observable<Subcategoriaservicio[]> {
    return this.http.get<Subcategoriaservicio[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }

  crearSubcategoria(subcategoria: Subcategoriaservicio): Observable<Subcategoriaservicio>{
    return this.http.post<Subcategoriaservicio>(this.url+'/crear',subcategoria,{headers: this.HttpHeaders});
  }

  obtenerSubcategoria(idsubcatemp: number): Observable<Subcategoriaservicio>{
    return this.http.get<Subcategoriaservicio>(this.url+'/listar id/'+idsubcatemp,{headers: this.HttpHeaders});
  }

  updateSubcategoria(subcategoria: Subcategoriaservicio): Observable<Subcategoriaservicio>{
    return this.http.put<Subcategoriaservicio>(this.url+'/editar/'+subcategoria.idsubcat,subcategoria,{headers: this.HttpHeaders});
  }
  eliminar(subcategoria: Subcategoriaservicio){
    const path =`${this.url}/${subcategoria.idsubcat}` ;
    return this.http.delete<Subcategoriaservicio>(this.url+"/eliminar/"+subcategoria.idsubcat,{headers: this.HttpHeaders});
  }

  obtenerServicioSubcat(idcatser: number): Observable<Subcategoriaservicio>{
    return this.http.get<Subcategoriaservicio>(this.url+'/listar/categoria/'+idcatser,{headers: this.HttpHeaders});
  }
}