import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/Models/categoria';
import { Subcategoriaempresa } from 'src/app/Models/subcategoriaempresa';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { SubcategoriaService } from 'src/app/Service/subcategoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detallescategoriaempresa',
  templateUrl: './detallescategoriaempresa.component.html',
  styleUrls: ['./detallescategoriaempresa.component.css']
})
export class DetallescategoriaempresaComponent implements OnInit {
  id!:number;
  categorias: Categoria = new Categoria();
  categoria: Categoria [] = [];

  subcategorias: Subcategoriaempresa = new Subcategoriaempresa();
  subcategoria: Subcategoriaempresa [] = [];
  constructor(private activedRoute: ActivatedRoute, private categoriaService:CategoriaService, private subcategoriaService: SubcategoriaService, private router: Router ) { }

  ngOnInit(): void {
    this.getSubcategorias();
    this.getCategorias();
    console.log()

    this.activedRoute.params
      .subscribe(params => {
        let idcatemp: number = params['idcatemp'];
        console.log(idcatemp)
        if (idcatemp) {
          this.categoriaService.obtenerCategoria(idcatemp)
            .subscribe(response => this.categorias = response)
        }
      })



  }


  getCategorias() {
    this.categoriaService.getCategoria()
      .subscribe(response => this.categoria = response);
  }
  getSubcategorias() {
    this.subcategoriaService.getSubcategoria()
      .subscribe(response => this.subcategoria = response);
  }


  agregarSubcategoria() {
    this.subcategoriaService.crearSubcategoria(this.subcategorias)
      .subscribe(response => {
        console.log('exito');
        console.log(response)
        this.subcategoria.push(response);
        // @ts-ignore
        document.getElementById("closeM1").click();

      });
  }

  cleanModal(){
    this.subcategorias = new Subcategoriaempresa();
  }
  actualizarCategoria() {
    this.subcategoriaService.updateSubcategoria(this.subcategorias)
      .subscribe(response => {
        console.log('actualizado');
       this.subcategoria.forEach((resp,index) => {

         if(resp.idsubcatemp == response.idsubcatemp){
           this.subcategoria[index] = response;
         }
       });
        // @ts-ignore
        document.getElementById("closeM2").click();
      })
  }

  abrirmodaleditar(subcategoria: Subcategoriaempresa) {
    this.subcategorias = {...subcategoria};
    this.categorias = this.subcategorias.idcatemp;

  }


  public delete(subcategoria: Subcategoriaempresa): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro de eliminar!',
      text: `la categoria : ${subcategoria.subcatnombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
        //funcion eliminar
        this.subcategoriaService.eliminar(subcategoria).subscribe(data => {
          this.subcategoria = this.subcategoria.filter(del => del.idsubcatemp != subcategoria.idsubcatemp)
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `Categoría eliminada ${subcategoria.idsubcatemp}`,
            'success'
          );

        })


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          ' ',
          'error'
        )
      }
    })
  }








}


