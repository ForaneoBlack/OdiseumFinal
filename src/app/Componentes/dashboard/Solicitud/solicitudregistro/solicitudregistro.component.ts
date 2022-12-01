import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/Models/categoria';
import { CategoriaProducto } from 'src/app/Models/categoriaProducto';
import { empresa } from 'src/app/Models/empresa';
import { solicitud } from 'src/app/Models/solicitud';
import { Subcategoriaempresa } from 'src/app/Models/subcategoriaempresa';
import { subcategoriaProducto } from 'src/app/Models/subcategoriaProducto';
import { Usuario } from 'src/app/Models/usuario';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { EmpresaService } from 'src/app/Service/empresa.service';
import { SolicitudService } from 'src/app/Service/solicitud.service';
import { SubcategoriaService } from 'src/app/Service/subcategoria.service';
import { UsuarioService } from 'src/app/Service/usuario.service';

@Component({
  selector: 'app-solicitudregistro',
  templateUrl: './solicitudregistro.component.html',
  styleUrls: ['./solicitudregistro.component.css']
})
export class SolicitudregistroComponent implements OnInit {

  id!:number;

  empresas: empresa = new empresa();
  empresa: empresa [] = [];

  solicitudes: solicitud = new solicitud();
  solicitud: solicitud [] = [];

  categorias: Categoria = new Categoria();
  categoria: Categoria [] = [];

  subcategorias: Subcategoriaempresa = new Subcategoriaempresa();
  subcategoria: Subcategoriaempresa [] = [];

  constructor(private activedRoute: ActivatedRoute, private empresaService: EmpresaService, private solicitudService: SolicitudService, private usuarioService: UsuarioService, private router: Router, private categoriaService: CategoriaService, private subcategoriaService: SubcategoriaService) { }

  getSolicitudes() {
    this.solicitudService.getSolicitud()
      .subscribe(response => this.solicitud = response);
  }

  ngOnInit(): void {
    this.getSolicitudes();
    this.getEmpresas();
    this.getSubcategorias();
    this.getCategorias();
    this.activedRoute.params
      .subscribe(params => {
        let idsolicitud: number = params['idsolicitud'];
        if (idsolicitud) {
          this.solicitudService.obtenerSolicitud(idsolicitud)
            .subscribe(response => this.solicitudes = response)
        }
      })
  }

  getEmpresas() {
    this.empresaService.getEmpresa()
      .subscribe(response => this.empresa = response);
  }

  getCategorias() {
    this.categoriaService.getCategoria()
      .subscribe(response => this.categoria = response);
  }

  getSubcategorias() {
    this.subcategoriaService.getSubcategoria()
      .subscribe(response => this.subcategoria = response);
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
        
        document.getElementById("closeM2").click();
      })
  }
  cerrarmodal(){
    document.getElementById("closeM2").click();

  }

  abrirmodalDetalle(solicitud: solicitud) {
    this.solicitudes = {...solicitud};
    this.empresas = this.solicitudes.idempresa;
    this.categorias = this.solicitudes.idcatemp;
    this.subcategorias = this.solicitudes.idsubcatemp;
}

compararcategoria(o1: Categoria, o2: Categoria): boolean{
  if(o1==undefined && o2 == undefined)return true;
  return o1 == null || o2 ==null || o1 == undefined || o2 == undefined ? false : o1.idcatemp == o2.idcatemp;

}
compararsubcategoria(o1: Subcategoriaempresa, o2: Subcategoriaempresa): boolean{
  if(o1==undefined && o2 == undefined)return true;
  return o1 == null || o2 ==null || o1 == undefined || o2 == undefined ? false : o1.idsubcatemp == o2.idsubcatemp;

}

}
