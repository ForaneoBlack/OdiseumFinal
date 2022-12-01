import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Detalle_Factura } from 'src/app/Models/detalle_factura';
import { empresa } from 'src/app/Models/empresa';
import { Factura } from 'src/app/Models/factura';
import { Persona } from 'src/app/Models/persona';
import { Producto } from 'src/app/Models/producto';
import { Usuario } from 'src/app/Models/usuario';
import { DetalleFacturaService } from 'src/app/Service/detalle-factura.service';
import { FacturaService } from 'src/app/Service/factura.service';
import { UsuarioService } from 'src/app/Service/usuario.service';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent implements OnInit {

  id!:number;

  detalles: Detalle_Factura = new Detalle_Factura();
  detalle: Detalle_Factura [] = [];

  facturas: Factura = new Factura();
  factura: Factura [] = [];

  productos: Producto = new Producto();
  producto : Producto []=[];

  personas: Persona = new Persona();
  persona: Persona [] = [];

  usuarios: Usuario = new Usuario();
  usuario: Usuario []=[];

  empresas: empresa = new empresa();
  empresa: empresa []=[];

  constructor(private activedRoute: ActivatedRoute, private detalleFactService: DetalleFacturaService, private facturaService: FacturaService, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.getFacturas();
    this.getDetalleFacturas();
    this.activedRoute.params
      .subscribe(params => {
        let iddetalle: number = params['iddetalle'];
        if (iddetalle) {
          this.detalleFactService.obtenergetDetalleFactura(iddetalle)
            .subscribe(response => this.detalles = response)
        }
      })
  }

  getDetalleFacturas() {
    this.detalleFactService.getDetalleFactura()
      .subscribe(response => this.detalle = response);
  }

  getFacturas() {
    this.facturaService.getFactura()
      .subscribe(response => this.factura = response);
  }

  abrirdetalleFactura(detalle: Detalle_Factura) {
    this.detalles = {...detalle};
    this.facturas = this.detalles.idfactura;
    this.productos = this.detalles.idproducto;
    this.personas = this.detalles.idpersona;
    this.usuarios = this.detalles.usu_id;
    this.empresas = this.detalles.idempresa;

  }

}
