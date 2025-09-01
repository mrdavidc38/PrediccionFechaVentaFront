import { Component, inject, ViewChild } from '@angular/core';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../interfaces/Customer';
import {forkJoin, merge, Observable, of as observableOf} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  startWith, switchMap, catchError, map } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { PrediccionServicioService } from './servicio/prediccion-servicio.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalNuevaOrdenComponent } from '../modales/modal-nueva-orden/modal-nueva-orden.component';
import { ModalVerOrdenesComponent } from '../modales/modal-ver-ordenes/modal-ver-ordenes.component';
@Component({
  selector: 'app-prediccion-ordenes',
  templateUrl: './prediccion-ordenes.component.html',
  styleUrls: ['./prediccion-ordenes.component.css']
})
export class PrediccionOrdenesComponent {
  private _httpClient = inject(HttpClient);

  displayedColumns: string[] = ['created','title', 'state',   'actions'];

  data: any[] = [];

  // filteredOrders :any[] = [];
  filteredOrders = new MatTableDataSource<any>();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
  
    this.filteredOrders.sort = this.sort;
    this.filteredOrders.paginator = this.paginator;
    
    // Configurar ordenamiento personalizado para fechas
    this.sort.sortChange.subscribe(() => {
      // this.paginator.pageIndex = 0; // Resetear a la primera página
      this.sortData();
    });
    //If the user changes the sort order, reset back to the first page.
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const pageNumber = this.paginator.pageIndex + 1;
        const pageSize = this.paginator.pageSize;
          this.isLoadingResults = true;
          return this.customerServicio.ConsultarClientesProductos(
            pageNumber,
            pageSize
            // this.sort.direction,
            // this.paginator.pageIndex,
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data: any) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.value.totalRecords;
          return data.value;
        }),
      )
      .subscribe(data => 
        
        {
//           this.filteredOrders.data = data.records;
// this.filteredOrders.sort = this.sort;
// this.filteredOrders.paginator = this.paginator;

        //   this.filteredOrders = data.records;
          this.data = data.records;
         this.resultsLength = data.totalRecords
      }
      );
  }



 

  constructor(private customerServicio : PrediccionServicioService, private dialog: MatDialog) {


   }

  ngOnInit(): void {
  
  }
  aplicarFiltroTabla(event : Event){
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredOrders.data = this.data.filter(order => 
      // order.orderId.toString().includes(filterValue) ||
      order.customerName.toLowerCase().includes(filterValue) 
      // order.shipcity.toLowerCase().includes(filterValue) ||
      // order.shipcountry.toLowerCase().includes(filterValue)
    );
  }
  viewOrders(customerName: string): void {
    const dialogRef = this.dialog.open(ModalVerOrdenesComponent, {
      width: '800px',
      data: { customerName: customerName }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado');
    });
  }

  newOrder(customerName: string): void {
    const dialogRef = this.dialog.open(ModalNuevaOrdenComponent, {
      width: '600px',
      data: { customerName: customerName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nueva orden creada:', result);
        // Refrescar datos si es necesario
      }
    });
  
}

sortData(): void {
  const sortedArray = [...this.data ];
  
  if (!this.sort.active || this.sort.direction === '') {
    this.data  = sortedArray;
    return;
  }

  this.data  = sortedArray.sort((a, b) => {
    const isAsc = this.sort.direction === 'asc';
    
    switch (this.sort.active) {
      case 'created': // Customer Name
        return this.compare(a.customerName, b.customerName, isAsc);
      
      case 'title': // Last Order Date
        return this.compareDate(a.lastOrderDate, b.lastOrderDate, isAsc);
      
      case 'state': // Next Predicted Order
        return this.compareDate(a.nextPredictedOrder, b.nextPredictedOrder, isAsc);
      
      default:
        return 0;
    }
  });
}

compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

compareDate(a: string, b: string, isAsc: boolean): number {
  const dateA = new Date(a).getTime();
  const dateB = new Date(b).getTime();
  return (dateA < dateB ? -1 : 1) * (isAsc ? 1 : -1);
}

}



