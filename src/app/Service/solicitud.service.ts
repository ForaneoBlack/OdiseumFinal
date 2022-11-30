import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { solicitud } from '../Models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  url: string = 'https://bryantenemea.com/api/solicitud';

  constructor(private http: HttpClient) { }

  getSolicitud(): Observable<solicitud[]> {
    return this.http.get<solicitud[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }
  crearSolicitud(solciitud: solicitud): Observable<solicitud>{
    return this.http.post<solicitud>(this.url+'/crear',solciitud,{headers: this.HttpHeaders});
  }
  obtenerSolicitud(idsolicitud: number): Observable<solicitud>{
    return this.http.get<solicitud>(this.url+'/listar id/'+idsolicitud,{headers: this.HttpHeaders});
  }
  updateSolicitud(solicitud: solicitud): Observable<solicitud>{
    return this.http.put<solicitud>(this.url+'/editar/'+solicitud.idsolicitud,solicitud,{headers: this.HttpHeaders});
  }
  eliminar(solicitud: solicitud){
    const path =`${this.url}/${solicitud.idsolicitud}` ;
    return this.http.delete<solicitud>(this.url+"/eliminar/"+solicitud.idsolicitud,{headers: this.HttpHeaders});
  }
}
