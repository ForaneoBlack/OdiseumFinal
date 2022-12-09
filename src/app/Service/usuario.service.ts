import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Usuario} from "../Models/usuario";
import { empresa } from '../Models/empresa';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})
// url: string = 'http://apiemprendimientos-env.eba-d95suqjg.us-east-1.elasticbeanstalk.com/api/usuario';

  url: string = 'http://localhost:8080/api/usuario';
  //url: string = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient) { }

  getUser(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }

  crearUser(user: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.url+'/crear',user,{headers: this.HttpHeaders});
  }

  obtenerUser(usu_id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.url+'/listar id/'+usu_id,{headers: this.HttpHeaders});
  }
  updateUser(user: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(this.url+'/editar/'+user.usu_id,user,{headers: this.HttpHeaders});
  }

  consultarempresa(usu_id: number): Observable<empresa>{
    return this.http.get<empresa>(this.url+'/consulta_empresa/'+usu_id,{headers: this.HttpHeaders}).pipe(map(response => response as empresa));
    
  }
  eliminarUser(user: Usuario){
    const path =`${this.url}/${user.usu_id}` ;
    return this.http.delete<Usuario>(this.url+"/eliminar/"+user.usu_id,{headers: this.HttpHeaders});
  }
}
