import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AutenticacionComponent } from './componentes/autenticacion/autenticacion.component';
import { PrediccionOrdenesComponent } from './componentes/prediccion-ordenes/prediccion-ordenes.component';
import { OrdenesComponent } from './componentes/ordenes/ordenes.component';
import { FormularioOrdenesComponent } from './componentes/formulario-ordenes/formulario-ordenes.component';

@NgModule({
  declarations: [
    AppComponent,
    AutenticacionComponent,
    PrediccionOrdenesComponent,
    OrdenesComponent,
    FormularioOrdenesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
