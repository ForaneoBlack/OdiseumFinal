import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat_Sub_Emp } from '../Models/cat_sub_emp';

@Injectable({
  providedIn: 'root'
})
export class CatSubEmpService {

  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  url: string = 'http://localhost:8080/api/cat-sub-emp';

  constructor(private http: HttpClient) { }

  getCatSubEmp(): Observable<Cat_Sub_Emp[]> {
    return this.http.get<Cat_Sub_Emp[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }
  crearCatSubEmp(cat_sub_emp: Cat_Sub_Emp): Observable<Cat_Sub_Emp>{
    return this.http.post<Cat_Sub_Emp>(this.url+'/crear',cat_sub_emp,{headers: this.HttpHeaders});
  }
  obtenerCatSubEmp(iddetalle: number): Observable<Cat_Sub_Emp>{
    return this.http.get<Cat_Sub_Emp>(this.url+'/listar id/'+iddetalle,{headers: this.HttpHeaders});
  }
  updateCatSubEmp(cat_sub_emp: Cat_Sub_Emp): Observable<Cat_Sub_Emp>{
    return this.http.put<Cat_Sub_Emp>(this.url+'/editar/'+cat_sub_emp.iddetalle,cat_sub_emp,{headers: this.HttpHeaders});
  }
  eliminar(cat_sub_emp: Cat_Sub_Emp){
    const path =`${this.url}/${cat_sub_emp.iddetalle}` ;
    return this.http.delete<Cat_Sub_Emp>(this.url+"/eliminar/"+cat_sub_emp.iddetalle,{headers: this.HttpHeaders});
  }

}