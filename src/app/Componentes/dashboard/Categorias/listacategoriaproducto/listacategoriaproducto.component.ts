import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaProducto } from 'src/app/Models/categoriaProducto';
import { CategoriaproductoService } from 'src/app/Service/categoriaproducto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listacategoriaproducto',
  templateUrl: './listacategoriaproducto.component.html',
  styleUrls: ['./listacategoriaproducto.component.css']
})
export class ListacategoriaproductoComponent implements OnInit {

  categorias: CategoriaProducto = new CategoriaProducto();
  categoria: CategoriaProducto [] = [];

  ngOnInit(): void {

    this.getCategorias();

    this.activedRoute.params
      .subscribe(params => {
        let catproid: number = params['catproid'];
        if (catproid) {
          this.categoriaproductoService.obtenerCategoria(catproid)
            .subscribe(response => this.categorias = response)
        }
      })
  }

  constructor(private modalService: NgbModal, private categoriaproductoService: CategoriaproductoService, private activedRoute: ActivatedRoute, private router: Router) { }

  getCategorias() {
    this.categoriaproductoService.getCategoria()
      .subscribe(response => this.categoria = response);
  }


  agregarCategoria() {
    this.categoriaproductoService.crearCategoria(this.categorias)
      .subscribe(response => {
        console.log('exito');
        console.log(response)
        this.categoria.push(response);
        // @ts-ignore
        document.getElementById("closeM1").click();

      });
  }

  cleanModal(){
    this.categorias = new CategoriaProducto();
  }

  actualizarCategoria() {
    this.categoriaproductoService.updateCategoria(this.categorias)
      .subscribe(response => {
        console.log('actualizado');
       this.categoria.forEach((resp,index) => {

         if(resp.catproid == response.catproid){
           this.categoria[index] = response;
         }
       });
        // @ts-ignore
        document.getElementById("closeM2").click();
      })
  }
  abrirmodaleditar(categoria: CategoriaProducto) {
    this.categorias = {...categoria};

  }
  public delete(categoria: CategoriaProducto): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro de eliminar!',
      text: `la categoria : ${categoria.catpronombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
        //funcion eliminar
        this.categoriaproductoService.eliminar(categoria).subscribe(data => {
          this.categoria = this.categoria.filter(del => del.catproid != categoria.catproid)
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `Categoría eliminada ${categoria.catproid}`,
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
  verDetallesDelaCategoria(categoria: CategoriaProducto){
    this.router.navigate(['/dashboard/detallescategoriaproductos',categoria.catproid]);
  }
}
