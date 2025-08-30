import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AutenticacionComponent } from './componentes/autenticacion/autenticacion.component';
import { PrediccionOrdenesComponent } from './componentes/prediccion-ordenes/prediccion-ordenes.component';
import { OrdenesComponent } from './componentes/ordenes/ordenes.component';
import { FormularioOrdenesComponent } from './componentes/formulario-ordenes/formulario-ordenes.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { MatTableModule } from '@angular/material/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing-module';
import { LayoutComponent } from './shared/layout/layout.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    AppComponent,
    AutenticacionComponent,
    PrediccionOrdenesComponent,
    OrdenesComponent,
    FormularioOrdenesComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    MatTooltipModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    // MatPaginatorModule,
    MatSortModule,
   // AppRoutingModule,
    BrowserAnimationsModule,MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
