import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VerordenesserviceService } from './servicio/verordenesservice.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
export interface DialogData {
  customerName: string;
}
@Component({
  selector: 'app-modal-ver-ordenes',

  templateUrl: './modal-ver-ordenes.component.html',
  styleUrl: './modal-ver-ordenes.component.css'
})
export class ModalVerOrdenesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resultsLength =0;
  orders: any[] = [];
  filteredOrders: any[] = [];
  displayedColumns: string[] = [
    // 'freight',
    'orderid',
    'requireddate',
    'shippeddate',
    'shipname',
    // 'orderdate',
    // 'orderDetails',

  
    'shipaddress',
    'shipcity',
    // 'shipcountry',
    
    
    
    // 'shippostalcode'
  ];

  constructor(
    public dialogRef: MatDialogRef<ModalVerOrdenesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _verordenesserviceService :VerordenesserviceService
  ) { }

  ngOnInit(): void {
   
   
  }
  ngAfterViewInit() {
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.cargarClientes();
  }
  cargarClientes(): void {


    var id = parseInt(this.data.customerName);
    const pageNumber = this.paginator ? this.paginator.pageIndex + 1 : 1;
    const pageSize = this.paginator ? this.paginator.pageSize : 10;
    this._verordenesserviceService.ConsultarOrdenes(pageNumber,pageSize,id).subscribe(resp =>
    {
      console.log(resp);
      this.orders = resp.value.records;
      this.resultsLength = resp.value.totalRecords;
      this.filteredOrders = [...this.orders];
    }
    )

    this.filteredOrders = [...this.orders];
  }




  exportOrders(): void {
    console.log('Export orders for:', this.data.customerName);
 
  }

  onClose(): void {
    this.dialogRef.close();
  }
  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredOrders = this.orders.filter(order => 
      // order.orderId.toString().includes(filterValue) ||
      order.shipname.toLowerCase().includes(filterValue) ||
      order.shipcity.toLowerCase().includes(filterValue) ||
      order.shipcountry.toLowerCase().includes(filterValue)
    );

   
}
}
