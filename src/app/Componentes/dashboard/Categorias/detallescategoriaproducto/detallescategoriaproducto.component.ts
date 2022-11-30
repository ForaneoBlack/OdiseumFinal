import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaProducto } from 'src/app/Models/categoriaProducto';
import { subcategoriaProducto } from 'src/app/Models/subcategoriaProducto';
import { CategoriaproductoService } from 'src/app/Service/categoriaproducto.service';
import { SubcategoriaproductoService } from 'src/app/Service/subcategoriaproducto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detallescategoriaproducto',
  templateUrl: './detallescategoriaproducto.component.html',
  styleUrls: ['./detallescategoriaproducto.component.css']
})
export class DetallescategoriaproductoComponent implements OnInit {

  id!:number;
  categorias: CategoriaProducto = new CategoriaProducto();
  categoria: CategoriaProducto [] = [];

  subcategorias: subcategoriaProducto = new subcategoriaProducto();
  subcategoria: subcategoriaProducto [] = [];

  constructor(private activedRoute: ActivatedRoute, private categoriaproductoService:CategoriaproductoService, private subcategoriaService: SubcategoriaproductoService, private router: Router) { }

  ngOnInit(): void {
    this.getSubcategorias();
    this.getCategorias();
    console.log()

    this.activedRoute.params
      .subscribe(params => {
        let catproid: number = params['catproid'];
        console.log(catproid)
        if (catproid) {
          this.categoriaproductoService.obtenerCategoria(catproid)
            .subscribe(response => this.categorias = response)
        }
      })



  }

  getCategorias() {
    this.categoriaproductoService.getCategoria()
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
    this.subcategorias = new subcategoriaProducto();
  }

  actualizarCategoria() {
    this.subcategoriaService.updateSubcategoria(this.subcategorias)
      .subscribe(response => {
        console.log('actualizado');
       this.subcategoria.forEach((resp,index) => {

         if(resp.subcatproid == response.subcatproid){
           this.subcategoria[index] = response;
         }
       });
        // @ts-ignore
        document.getElementById("closeM2").click();
      })
  }

  abrirmodaleditar(subcategoria: subcategoriaProducto) {
    this.subcategorias = {...subcategoria};

  }

  public delete(subcategoria: subcategoriaProducto): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro de eliminar!',
      text: `la categoria : ${subcategoria.subcatpronombre}`,
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
          this.subcategoria = this.subcategoria.filter(del => del.subcatproid != subcategoria.subcatproid)
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `Categoría eliminada ${subcategoria.subcatproid}`,
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
