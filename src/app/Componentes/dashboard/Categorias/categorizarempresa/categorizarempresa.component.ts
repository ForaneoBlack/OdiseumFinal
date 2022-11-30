import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/Models/categoria';
import { Cat_Sub_Emp } from 'src/app/Models/cat_sub_emp';
import { empresa } from 'src/app/Models/empresa';
import { Subcategoriaempresa } from 'src/app/Models/subcategoriaempresa';
import { Usuario } from 'src/app/Models/usuario';
import { CatSubEmpService } from 'src/app/Service/cat-sub-emp.service';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { EmpresaService } from 'src/app/Service/empresa.service';
import { SubcategoriaService } from 'src/app/Service/subcategoria.service';
import { UsuarioService } from 'src/app/Service/usuario.service';

@Component({
  selector: 'app-categorizarempresa',
  templateUrl: './categorizarempresa.component.html',
  styleUrls: ['./categorizarempresa.component.css']
})
export class CategorizarempresaComponent implements OnInit {

  id!:number;

  empresas: empresa = new empresa();
  empresa: empresa [] = [];

  categorias: Categoria = new Categoria();
  categoria: Categoria [] = [];

  subcategorias: Subcategoriaempresa = new Subcategoriaempresa();
  subcategoria: Subcategoriaempresa [] = [];

  catsubemps: Cat_Sub_Emp = new Cat_Sub_Emp();
  catsubemp: Cat_Sub_Emp [] = [];

  constructor(private activedRoute: ActivatedRoute, private empresaService: EmpresaService, private categoriaService:CategoriaService, private subcategoriaService: SubcategoriaService, private catsubempService: CatSubEmpService, private router: Router) { }

  ngOnInit(): void {
    this.getSubcategorias();
    this.getCategorias();
    this.getEmpresas();
    console.log()
    this.activedRoute.params
      .subscribe(params => {
        let iddetalle: number = params['iddetalle'];
        console.log(iddetalle)
        if (iddetalle) {
          this.empresaService.obtenerEmpresa(iddetalle)
            .subscribe(response => this.empresas = response)
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

  agregarCatSubEmp() {
    this.catsubempService.crearCatSubEmp(this.catsubemps)
      .subscribe(response => {
        console.log('exito');
        console.log(response)
        this.catsubemp.push(response);
      });
  }

  cleanModal(){
    this.catsubemps = new Cat_Sub_Emp();
  }

  actualizarCatSubEmp() {
    this.catsubempService.updateCatSubEmp(this.catsubemps)
      .subscribe(response => {
        console.log('actualizado');
       this.catsubemp.forEach((resp,index) => {

         if(resp.iddetalle == response.iddetalle){
           this.catsubemp[index] = response;
         }
       });
        // @ts-ignore
        document.getElementById("closeM2").click();
      })
  }

  abrirmodaleditar(catsubemp: Cat_Sub_Emp) {
    this.catsubemps = {...catsubemp};

  }

}
