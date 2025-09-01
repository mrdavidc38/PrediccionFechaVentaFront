import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/componentes/interfaces/response-api';
import { Order } from 'src/app/shared/interfaces/Order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NuevaordenservicioService {

  
  private urlApi = environment.endopoint 

  constructor(private http : HttpClient) { }

  ConsultarEmpleados(pageNumber: number, pageSize: number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Employee/lista?pageNumber=${pageNumber}&pageSize=${pageSize}`)

  }
  ConsultarExpedidores(pageNumber: number, pageSize: number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Shipper/lista?pageNumber=${pageNumber}&pageSize=${pageSize}`)

  }
  ConsultarPrductos(pageNumber: number, pageSize: number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Product/lista?pageNumber=${pageNumber}&pageSize=${pageSize}`)

  }

  CrearOrden(orden: Order): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(
      `${this.urlApi}Orders/guardar`,  // ajusta la ruta según tu API
      orden
    );
  }
  
}
