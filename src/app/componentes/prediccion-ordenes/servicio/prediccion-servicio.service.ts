import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../interfaces/response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrediccionServicioService {
  private urlApi = environment.endopoint + "Customer/"

  constructor(private http : HttpClient) { }

  ConsultarClientesProductos():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}lista`)

  }
}
