import { RouterModule, Routes } from "@angular/router";
import { FormularioOrdenesComponent } from "./componentes/formulario-ordenes/formulario-ordenes.component";
import { OrdenesComponent } from "./componentes/ordenes/ordenes.component";
import { PrediccionOrdenesComponent } from "./componentes/prediccion-ordenes/prediccion-ordenes.component";
import { NgModule } from "@angular/core";
import { LayoutComponent } from "./shared/layout/layout.component";

const routes: Routes = [
    {
      path: '', component: LayoutComponent, children: [
        { path: 'prediccion-ordenes', component: PrediccionOrdenesComponent },
        { path: 'ordenes', component: OrdenesComponent },
        { path: 'agregar-orden', component: FormularioOrdenesComponent },
        { path: '', redirectTo: 'prediccion-ordenes', pathMatch: 'full' }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  }) export class AppRoutingModule { }