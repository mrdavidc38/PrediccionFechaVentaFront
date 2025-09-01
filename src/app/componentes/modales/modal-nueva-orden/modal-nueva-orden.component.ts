import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NuevaordenservicioService } from './servicio/nuevaordenservicio.service';
import { forkJoin } from 'rxjs';
import { Order } from 'src/app/shared/interfaces/Order';
import { CurrencyPipe } from '@angular/common';
import { OrderDetail } from 'src/app/shared/interfaces/OrderDetail';
@Component({
  selector: 'app-modal-nueva-orden',

  templateUrl: './modal-nueva-orden.component.html',
  styleUrl: './modal-nueva-orden.component.css'
})
export class ModalNuevaOrdenComponent implements OnInit {
  orderForm: FormGroup;
  employees = [{ id: 1, name: 'John' }, { id: 2, name: 'Alice' }];
  shippers = [{ id: 1, name: 'UPS' }, { id: 2, name: 'FedEx' }];
  products = [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Phone' }];
  constructor(private currencyPipe: CurrencyPipe,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalNuevaOrdenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicoCreacionOrdenes : NuevaordenservicioService
  ) {
    this.orderForm = this.fb.group({
      customer: [''],
      employee: ['',[ Validators.required]],
      shipper: ['', Validators.required],
      shipName: ['', [Validators.required,Validators.maxLength(100)]],
      shipAddress: ['', [Validators.required,Validators.maxLength(100)]],
      shipCity: ['', [Validators.required,Validators.maxLength(100)]],
      shipCountry: ['', [Validators.required,Validators.maxLength(100)]],
      orderDate: ['', Validators.required],
      requiredDate: ['', Validators.required],
      shippedDate: ['', Validators.required],
      freight: [0, Validators.required],
      product: ['', Validators.required],
      unitPrice: [0, Validators.required],
      quantity: [1, Validators.required],
      discount: [0]
    });
  }
  ngOnInit(): void {

    
    forkJoin(this.servicoCreacionOrdenes.ConsultarEmpleados(1,10),
    this.servicoCreacionOrdenes.ConsultarExpedidores(1,10),
    this.servicoCreacionOrdenes.ConsultarPrductos(1,10) ).subscribe(resp =>{
      console.log(resp);
      var empleados = resp[0].value.records.map((e: { empid: any; firstname: any; }) => ({ 
        id: e.empid, 
        name: e.firstname 
      }));
      this.employees = empleados;
      var expedidoras = resp[1].value.records.map((e: { shipperid: any; companyname: any; }) => ({ 
        id: e.shipperid, 
        name: e.companyname 
      }));
      this.shippers = expedidoras;
      var productos = resp[2].value.records.map((e: { productid: any; productname: any; }) => ({ 
        id: e.productid, 
        name: e.productname 
      }));
      this.products = productos;

        })
  }
  save() {
    if (this.orderForm.valid) {
      var detalle: OrderDetail = {} as OrderDetail;
      const formValues = this.orderForm.value;
  
      
      var id = parseInt(this.data.customerName);
      const order: Order = {
        orderid: 0, // se genera en backend normalmente
        custid: id, // si no se maneja en este form
        empid: formValues.employee,
        orderdate: new Date(formValues.orderDate).toISOString(),
        requireddate: new Date(formValues.requiredDate).toISOString(),
        shippeddate: new Date(formValues.shippedDate).toISOString(),
        shipperid: formValues.shipper,
        freight: this.parseToDecimal(formValues.freight),
        shipname: formValues.shipName,
        shipaddress: formValues.shipAddress,
        shipcity: formValues.shipCity,
        shipregion: null, // no está en tu form
        shippostalcode: null, // no está en tu form
        shipcountry: formValues.shipCountry,
        orderDetails: [],
        Qty: formValues.quantity
      };
      detalle.discount = this.parseToDecimal(formValues.discount);
      detalle.productid = this.parseToDecimal(formValues.product);
      detalle.qty = formValues.quantity;
      detalle.unitprice = this.parseToDecimal(formValues.unitPrice);
      order.orderDetails?.push(detalle);

      this.servicoCreacionOrdenes.CrearOrden(order).subscribe(res =>{
         this.dialogRef.close(this.orderForm.value);
      })
     
    }}
    onInput(event: any, controlName: string) {
      const input = event.target as HTMLInputElement;
      input.value = input.value.replace(/[^0-9.]/g, '');
      this.orderForm.get(controlName)?.setValue(input.value);
    }
    parseToDecimalWithPrecision(value: string | number, decimals: number = 2): number {
      const result = this.parseToDecimal(value);
      return Math.round(result * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }

    parseToDecimal(value: string | number): number {
      if (value === null || value === undefined || value === '') {
        return 0;
      }
      
      // Si ya es un número, devolverlo
      if (typeof value === 'number') {
        return value;
      }
      
      // Convertir a string y limpiar
      let cleanValue = value.toString();
      
      // Remover espacios al inicio y final
      cleanValue = cleanValue.trim();
      
      // Remover símbolos de moneda, comas, espacios internos
      cleanValue = cleanValue.replace(/[$,\s]/g, '');
      
      // Convertir a número
      const numericValue = parseFloat(cleanValue);
      
      // Validar que sea un número válido
      return isNaN(numericValue) ? 0 : numericValue;
    }
    formatCurrency(controlName: string) {
      let value = this.orderForm.get(controlName)?.value;
      if (value !== null && value !== '') {
        this.orderForm.get(controlName)?.setValue(
          this.currencyPipe.transform(value, 'USD', 'symbol', '1.0-0')
        );
      }
    }
    
    removeFormat(controlName: string) {
      let value = this.orderForm.get(controlName)?.value;
      if (value) {
        this.orderForm.get(controlName)?.setValue(value.replace(/[^0-9.]/g, ''));
      }}
  
   
}
