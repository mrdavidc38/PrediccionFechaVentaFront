import { Component, inject, ViewChild } from '@angular/core';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../interfaces/Customer';
import {merge, Observable, of as observableOf} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  startWith, switchMap, catchError, map } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-prediccion-ordenes',
  templateUrl: './prediccion-ordenes.component.html',
  styleUrls: ['./prediccion-ordenes.component.css']
})
export class PrediccionOrdenesComponent {
  private _httpClient = inject(HttpClient);

  displayedColumns: string[] = ['created', 'state',  'title', 'actions'];
   exampleDatabase!: ExampleHttpDatabase | null;
  data: GithubIssue[] = [];


  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    // this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
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
          this.resultsLength = data.total_count;
          return data.items;
        }),
      )
      .subscribe(data => (this.data = data));
  }


  customers: Customer[] = [
    {
      customerName: 'Customer AHPOF',
      lastOrderDate: '2/4/2008',
      nextPredictedOrder: '3/23/2008',
      lastOrderDateSort: new Date(2008, 1, 4),
      nextPredictedOrderSort: new Date(2008, 2, 23)
    },
    {
      customerName: 'Customer AHXHT',
      lastOrderDate: '5/5/2008',
      nextPredictedOrder: '8/9/2008',
      lastOrderDateSort: new Date(2008, 4, 5),
      nextPredictedOrderSort: new Date(2008, 7, 9)
    },
    {
      customerName: 'Customer AZUEO',
      lastOrderDate: '4/9/2008',
      nextPredictedOrder: '5/20/2008',
      lastOrderDateSort: new Date(2008, 3, 9),
      nextPredictedOrderSort: new Date(2008, 4, 20)
    },
    {
      customerName: 'Customer BSVAR',
      lastOrderDate: '2/16/2008',
      nextPredictedOrder: '6/23/2008',
      lastOrderDateSort: new Date(2008, 1, 16),
      nextPredictedOrderSort: new Date(2008, 5, 23)
    },
    {
      customerName: 'Customer CCFIZ',
      lastOrderDate: '4/23/2008',
      nextPredictedOrder: '7/4/2008',
      lastOrderDateSort: new Date(2008, 3, 23),
      nextPredictedOrderSort: new Date(2008, 6, 4)
    },
    {
      customerName: 'Customer CCKOT',
      lastOrderDate: '5/6/2008',
      nextPredictedOrder: '7/11/2008',
      lastOrderDateSort: new Date(2008, 4, 6),
      nextPredictedOrderSort: new Date(2008, 6, 11)
    },
    {
      customerName: 'Customer CQRAA',
      lastOrderDate: '3/16/2008',
      nextPredictedOrder: '5/13/2008',
      lastOrderDateSort: new Date(2008, 2, 16),
      nextPredictedOrderSort: new Date(2008, 4, 13)
    },
    {
      customerName: 'Customer CYZTN',
      lastOrderDate: '4/27/2008',
      nextPredictedOrder: '5/30/2008',
      lastOrderDateSort: new Date(2008, 3, 27),
      nextPredictedOrderSort: new Date(2008, 4, 30)
    },
    {
      customerName: 'Customer DVFMB',
      lastOrderDate: '4/13/2008',
      nextPredictedOrder: '6/23/2008',
      lastOrderDateSort: new Date(2008, 3, 13),
      nextPredictedOrderSort: new Date(2008, 5, 23)
    },
    {
      customerName: 'Customer EEALV',
      lastOrderDate: '4/24/2008',
      nextPredictedOrder: '5/29/2008',
      lastOrderDateSort: new Date(2008, 3, 24),
      nextPredictedOrderSort: new Date(2008, 4, 29)
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // this.loadCustomers();
  }

  // ngAfterViewInit(): void {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;

  //   // Configurar el accessor para el ordenamiento personalizado de fechas
  //   this.dataSource.sortingDataAccessor = (data: Customer, sortHeaderId: string) => {
  //     switch (sortHeaderId) {
  //       case 'lastOrderDate':
  //         return data.lastOrderDateSort;
  //       case 'nextPredictedOrder':
  //         return data.nextPredictedOrderSort;
  //       case 'customerName':
  //         return data.customerName;
  //       default:
  //         return data[sortHeaderId as keyof Customer];
  //     }
  //   };
  // }




  // onPageChange(event: PageEvent): void {
  //   this.currentPage = event.pageIndex;
  //   this.pageSize = event.pageSize;
  //   // Aquí puedes implementar la lógica para cargar datos de la página correspondiente
  //   console.log('Page changed:', event);
  // }

  viewOrders(customer: Customer): void {
    console.log('View orders for:', customer.customerName);
    // Implementa la lógica para ver las órdenes del cliente
  }

  newOrder(customer: Customer): void {
    console.log('Create new order for:', customer.customerName);
    // Implementa la lógica para crear una nueva orden
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
      page + 1
    }`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }
}