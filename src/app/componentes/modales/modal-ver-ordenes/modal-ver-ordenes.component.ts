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
    'freight',
    'orderdate',
    'orderDetails',

    'requireddate',
    'shipaddress',
    'shipcity',
    'shipcountry',
    'shipname',
    'shippeddate',
    'shipperid',
    'shippostalcode'
  ];
  // displayedColumns: string[] = ['orderId', 'orderDate', 'shippedDate', 'freight', 'shipInfo', 'actions'];

  constructor(
    public dialogRef: MatDialogRef<ModalVerOrdenesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _verordenesserviceService :VerordenesserviceService
  ) { }

  ngOnInit(): void {
   
   
  }
  ngAfterViewInit() {
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.loadCustomerOrders();
  }
  loadCustomerOrders(): void {
    // Aquí cargarías las órdenes del cliente desde tu servicio
    // Por ahora uso datos de ejemplo

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
    // this.orders = [
    //   {
    //     orderId: 10643,
    //     orderDate: '2007-08-25',
    //     shippedDate: '2007-09-02',
    //     freight: 29.46,
    //     shipName: 'Destination LOUIE',
    //     shipCity: 'Berlin',
    //     shipCountry: 'Germany'
    //   },
    //   {
    //     orderId: 10692,
    //     orderDate: '2007-10-03',
    //     shippedDate: '2007-10-13',
    //     freight: 61.02,
    //     shipName: 'Destination RSVRP',
    //     shipCity: 'Berlin',
    //     shipCountry: 'Germany'
    //   }
    // ];
    this.filteredOrders = [...this.orders];
  }
  viewOrderDetails(order: any): void {
    console.log('View order details:', order);
    // Implementar vista de detalles
  }

  editOrder(order: any): void {
    console.log('Edit order:', order);
    // Implementar edición de orden
  }

  exportOrders(): void {
    console.log('Export orders for:', this.data.customerName);
    // Implementar exportación
  }

  onClose(): void {
    this.dialogRef.close();
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredOrders = this.orders.filter(order => 
      // order.orderId.toString().includes(filterValue) ||
      order.shipname.toLowerCase().includes(filterValue) ||
      order.shipcity.toLowerCase().includes(filterValue) ||
      order.shipcountry.toLowerCase().includes(filterValue)
    );

    // this.filteredOrders = this.orders;
}
}
