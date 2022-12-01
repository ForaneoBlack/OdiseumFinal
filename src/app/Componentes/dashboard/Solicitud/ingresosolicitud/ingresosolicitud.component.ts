import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { empresa } from 'src/app/Models/empresa';
import { Servicio } from 'src/app/Models/servicio';
import { solicitud } from 'src/app/Models/solicitud';
import { Userlogin } from 'src/app/Models/userlogin';
import { Usuario } from 'src/app/Models/usuario';
import { EmpresaService } from 'src/app/Service/empresa.service';
import { SolicitudService } from 'src/app/Service/solicitud.service';
import { UsuarioService } from 'src/app/Service/usuario.service';
import { EmpresaLogin } from '../../../../Models/empresalogin';

@Component({
  selector: 'app-ingresosolicitud',
  templateUrl: './ingresosolicitud.component.html',
  styleUrls: ['./ingresosolicitud.component.css']
})
export class IngresosolicitudComponent implements OnInit {


  public datos:Userlogin=new Userlogin();
  id:number;
  public nombre!: string;
  public nombreemp!: string;
  idemp!:number;
  servicios: Servicio = new Servicio();
  empresas: empresa = new empresa();
  empresa: empresa [] = [];
  empresasdatos : empresa = new empresa();
  public datosusu: Usuario = new Usuario();

  usuarios: Usuario = new Usuario();
  usuario: Usuario [] = [];

  solicitudes: solicitud = new solicitud();
  solicitud: solicitud [] = [];

  constructor(private activedRoute: ActivatedRoute, private empresaService: EmpresaService, private solicitudService: SolicitudService, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.guardarempresa()
    this.getEmpresas();
    this.getUsuarios();
    console.log()
    this.datos=JSON.parse(sessionStorage['usuario']);
    this.id=this.datos.usu_id;
    this.nombre=this.datos.usuusuario;
   
    console.log(this.nombre);
    this.obetenerusuario( this.id);
    //this.obetenerempresa(this.idemp);
    console.log(this.obetenerusuario(this.id));

    this.activedRoute.params
      .subscribe(params => {
        let idsolicitud: number = params['usuario'];
        console.log(idsolicitud)
        if (idsolicitud) {
          this.solicitudService.obtenerSolicitud(idsolicitud)
            .subscribe(response => this.solicitudes = response)
        }
      })
  }
  guardarempresa(){

    this.datosusu=JSON.parse(sessionStorage['usuario']);
    console.log(this.datos.usu_id)
     this.usuarioService.consultarempresa(this.datosusu.usu_id).subscribe(
      response => {this.empresasdatos= response
  
        
        this.obetenerempresa(this.empresasdatos.idempresa)
        this.nombreemp=this.empresasdatos.empnombre;
        this.idemp=this.empresasdatos.idempresa;
        this.nombreemp=this.empresasdatos.empnombre;
        console.log(this.id)
        console.log(this.empresasdatos.empcorreo)}
       )
  
  
  
  }
  obetenerempresa(idempresa: number){
    this.empresaService.obtenerEmpresa(idempresa)
    .subscribe(response => {
        this.empresas = response
        console.log(response)
    });

}
  obetenerusuario(usu_id: number){
    this.usuarioService.obtenerUser(usu_id)
    .subscribe(response => {
        this.usuarios = response
        console.log(response)
    });

}
  getEmpresas() {
    this.empresaService.getEmpresa()
      .subscribe(response => this.empresa = response);
  }

  getUsuarios() {
    this.usuarioService.getUser()
      .subscribe(response => this.usuario = response);
  }

  agregarSolicitud() {
    this.solicitudService.crearSolicitud(this.solicitudes)
      .subscribe(response => {
        console.log('exito');
        console.log(response)
        this.solicitud.push(response);
      });
  }

  cleanModal(){
    this.solicitudes = new solicitud();
  }

  actualizarCatSubEmp() {
    this.solicitudService.updateSolicitud(this.solicitudes)
      .subscribe(response => {
        console.log('actualizado');
       this.solicitud.forEach((resp,index) => {

         if(resp.idsolicitud == response.idsolicitud){
           this.solicitud[index] = response;
         }
       });
        // @ts-ignore
        document.getElementById("closeM2").click();
      })
  }

  abrirmodaleditar(catsubemp: solicitud) {
    this.solicitudes = {...catsubemp};

  }


}
