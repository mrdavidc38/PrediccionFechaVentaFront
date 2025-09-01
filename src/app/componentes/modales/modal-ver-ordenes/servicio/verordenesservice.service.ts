import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/componentes/interfaces/response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerordenesserviceService {

  private urlApi = environment.endopoint + "Orders/"

  constructor(private http : HttpClient) { }

  ConsultarOrdenes(pageNumber: number, pageSize: number, id:number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}lista?pageNumber=${pageNumber}&pageSize=${pageSize}&id=${id}`)

  }
}
