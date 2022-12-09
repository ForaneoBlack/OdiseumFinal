import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../Models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})

  url: string = 'http://localhost:8080/api/servicio';

  constructor(private http: HttpClient) { }

  getServicio(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }

  crearServicio(servicio: Servicio): Observable<Servicio>{
    return this.http.post<Servicio>(this.url+'/crear',servicio,{headers: this.HttpHeaders});
  }

  obtenerServicio(idservicio: number): Observable<Servicio>{
    return this.http.get<Servicio>(this.url+'/listar id/'+idservicio,{headers: this.HttpHeaders});
  }

  obtenerServicioempresa(idempresa: number): Observable<Servicio[]>{
    return this.http.get<Servicio[]>(this.url+'/listar/empresa/'+idempresa,{headers: this.HttpHeaders});
  }
 
  updateServicio(servicio: Servicio): Observable<Servicio>{
    return this.http.put<Servicio>(this.url+'/editar/'+servicio.idservicio,servicio,{headers: this.HttpHeaders});
  }
  eliminar(servicio: Servicio){
    const path =`${this.url}/${servicio.idservicio}` ;
    return this.http.delete<Servicio>(this.url+"/eliminar/"+servicio.idservicio,{headers: this.HttpHeaders});
  }

}
