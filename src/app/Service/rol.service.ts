import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Rol} from "../Models/rol";

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  url: string = 'http://localhost:8080/api/rol';

  constructor(private http: HttpClient) { }

  getRol(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }

  crearRol(rol: Rol): Observable<Rol>{
    return this.http.post<Rol>(this.url+'/crear',rol,{headers: this.HttpHeaders});
  }

  obtenerRol(id: number): Observable<Rol>{
    return this.http.get<Rol>(this.url+'/listar/'+id,{headers: this.HttpHeaders});
  }
  updateRol(rol: Rol): Observable<Rol>{
    return this.http.put<Rol>(this.url+'/editar/'+rol.idrol,rol,{headers: this.HttpHeaders});
  }
  eliminar(rol: Rol){
    const path =`${this.url}/${rol.idrol}` ;
    return this.http.delete<Rol>(this.url+"/eliminar/"+rol.idrol,{headers: this.HttpHeaders});
  }
}