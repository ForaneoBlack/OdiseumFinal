import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {SharedModule} from "../shared/shared.module";
import { DashboardComponent } from './dashboard.component';

import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { RolComponent } from './rol/rol.component';
import {HeaderComponent} from "./header/header.component";
import { CrudEmpresaComponent } from './Empresa/crud-empresa/crud-empresa.component';
import { DatosEmpresaComponent } from './Empresa/datos-empresa/datos-empresa.component';
import { ListarproductoComponent } from './Productos/listarproducto/listarproducto.component';
import { ListarServicioComponent } from './Servicio/listar-servicio/listar-servicio.component';
import { ListausuariosComponent } from './Usuario/listausuarios/listausuarios.component';
import { DetallescategoriaempresaComponent } from './Categorias/detallescategoriaempresa/detallescategoriaempresa.component';
import { ListacategoriaempresaComponent } from './Categorias/listacategoriaempresa/listacategoriaempresa.component';
import { IngresosolicitudComponent } from './Solicitud/ingresosolicitud/ingresosolicitud.component';
import { SolicitudregistroComponent } from './Solicitud/solicitudregistro/solicitudregistro.component';
import { ListacategoriaproductoComponent } from './Categorias/listacategoriaproducto/listacategoriaproducto.component';
import { DetallescategoriaproductoComponent } from './Categorias/detallescategoriaproducto/detallescategoriaproducto.component';
import { ListacategoriaservicioComponent } from './Categorias/listacategoriaservicio/listacategoriaservicio.component';
import { DetallescategoriaservicioComponent } from './Categorias/detallescategoriaservicio/detallescategoriaservicio.component';
import { CategorizarempresaComponent } from './Categorias/categorizarempresa/categorizarempresa.component';
import { ReporteproductosComponent } from './Productos/reporteproductos/reporteproductos.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    RolComponent, 
    CrudEmpresaComponent,
    DatosEmpresaComponent,
    ListarproductoComponent,
    ListarServicioComponent,
    ListausuariosComponent,
    DetallescategoriaempresaComponent,
    ListacategoriaempresaComponent,
    IngresosolicitudComponent,
    SolicitudregistroComponent,
    ListacategoriaproductoComponent,
    DetallescategoriaproductoComponent,
    ListacategoriaservicioComponent,
    DetallescategoriaservicioComponent,
    CategorizarempresaComponent,
    ReporteproductosComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
