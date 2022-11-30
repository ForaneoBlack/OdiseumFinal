import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {InicioComponent} from "./inicio/inicio.component";
import {RolComponent} from "./rol/rol.component";
import {ListacategoriaempresaComponent} from './Categorias/listacategoriaempresa/listacategoriaempresa.component';
import {
    DetallescategoriaempresaComponent
} from './Categorias/detallescategoriaempresa/detallescategoriaempresa.component';
import {CrudEmpresaComponent} from './Empresa/crud-empresa/crud-empresa.component';
import {DatosEmpresaComponent} from './Empresa/datos-empresa/datos-empresa.component';
import {ListarproductoComponent} from './Productos/listarproducto/listarproducto.component';
import {ListarServicioComponent} from './Servicio/listar-servicio/listar-servicio.component';
import {ListausuariosComponent} from './Usuario/listausuarios/listausuarios.component';
import {IngresosolicitudComponent} from './Solicitud/ingresosolicitud/ingresosolicitud.component';
import {SolicitudregistroComponent} from './Solicitud/solicitudregistro/solicitudregistro.component';
import {CategoriaProducto} from 'src/app/Models/categoriaProducto';
import {ListacategoriaproductoComponent} from './Categorias/listacategoriaproducto/listacategoriaproducto.component';
import {
    DetallescategoriaproductoComponent
} from './Categorias/detallescategoriaproducto/detallescategoriaproducto.component';
import {ListacategoriaservicioComponent} from "./Categorias/listacategoriaservicio/listacategoriaservicio.component";
import {
    DetallescategoriaservicioComponent
} from "./Categorias/detallescategoriaservicio/detallescategoriaservicio.component";
import { CategorizarempresaComponent } from './Categorias/categorizarempresa/categorizarempresa.component';
import { UsuarioguardianGuard } from '../login/usuarioguardian.guard';
import {RankingempresaComponent} from "./Empresa/rankingempresa/rankingempresa.component";
import {ReporteproductosComponent} from "./Productos/reporteproductos/reporteproductos.component";
import {ReporteservicioComponent} from "./Servicio/reporteservicio/reporteservicio.component";

const routes: Routes = [
    {
        path: '', component: DashboardComponent, children: [
            {path: 'inicio', component: InicioComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'rol', component: RolComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'listacategoria', component: ListacategoriaempresaComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'detallescategoria', component: DetallescategoriaempresaComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'detallescategoria/:idcatemp', component: DetallescategoriaempresaComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'listaempresa', component: CrudEmpresaComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'formempresa', component: DatosEmpresaComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'listaproductos', component: ListarproductoComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'listaservicio', component: ListarServicioComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'listausuario', component: ListausuariosComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'ingresosolicitud', component: IngresosolicitudComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'solicitudregistro', component: SolicitudregistroComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'categoriaproductos', component: ListacategoriaproductoComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'detallescategoriaproductos', component: DetallescategoriaproductoComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'detallescategoriaproductos/:catproid', component: DetallescategoriaproductoComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'listacategoriaservicios', component: ListacategoriaservicioComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'detallescategoriaservicio', component: DetallescategoriaservicioComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'detallescategoriaservicio/:idcatser', component: DetallescategoriaservicioComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'formempresa/:usu_id', component: DatosEmpresaComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'categorizarempresas', component: CategorizarempresaComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'categorizarempresas/:iddetalle', component: CategorizarempresaComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'rankingempresa', component: RankingempresaComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'reporteproducto', component: ReporteproductosComponent, canActivate:[UsuarioguardianGuard]},
            {path: 'reporteservicio', component: ReporteservicioComponent, canActivate:[UsuarioguardianGuard]},




        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
