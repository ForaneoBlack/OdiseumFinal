import { Component, OnInit } from "@angular/core";
import { EmpresaService } from "src/app/Service/empresa.service";
import { empresa } from "src/app/Models/empresa";
import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from "src/app/Service/usuario.service";
import { Usuario } from "src/app/Models/usuario";
import { Userlogin } from "src/app/Models/userlogin";
import { EmpresaLogin } from '../../../../Models/empresalogin';

@Component({
  selector: "app-datos-empresa",
  templateUrl: "./datos-empresa.component.html",
  styleUrls: ["./datos-empresa.component.css"],
})
export class DatosEmpresaComponent implements OnInit {
  public datos:Userlogin=new Userlogin();
  id!:number;
  public nombre!: string;

  usuarios: Usuario = new Usuario();
  usuario: Usuario [] = [];

  empresas: empresa = new empresa();
  empresa: empresa [] = [];

  constructor(private activedRoute: ActivatedRoute, private usuarioService: UsuarioService, private empresaService: EmpresaService, private router: Router) {}

  ngOnInit(): void {
    this.getEmpresas();
    this.getUsuarios();

    this.datos=JSON.parse(sessionStorage['usuario']);
    this.id=this.datos.usu_id;
    this.nombre=this.datos.usuusuario;
    console.log(this.nombre);
    this.obetenerusuario( this.id);
    console.log(this.obetenerusuario(this.id));

    this.activedRoute.params
      .subscribe(params => {

        console.log(this.id);
        let usu_id: number = params['usu_id'];
        console.log(usu_id)
        if (usu_id) {
          this.usuarioService.obtenerUser(this.id)
            .subscribe(response => this.usuarios = response)
        }
      })
  }
  obetenerusuario(usu_id: number){
    this.usuarioService.obtenerUser(usu_id)
    .subscribe(response => {
        this.usuarios = response
        console.log(response)
    });

}

  getUsuarios() {
    this.usuarioService.getUser()
      .subscribe(response => this.usuario = response);
  }
  getEmpresas() {
    this.empresaService.getEmpresa()
      .subscribe(response => this.empresa = response);
  }

  agregarEmpresa() {
    this.empresaService.crearEmpresa(this.empresas)
      .subscribe(response => {
        console.log('exito');
        console.log(response)
        this.empresa.push(response);
      });
  }

  cleanModal(){
    this.empresas = new empresa();
  }
  compararusuarios(o1: Userlogin, o2: Userlogin): boolean{
    if(o1==undefined && o2 == undefined)return true;
    return o1 == null || o2 ==null || o1 == undefined || o2 == undefined ? false : o1.usu_id == o2.usu_id;

  }
}
