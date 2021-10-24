import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { GridOptions, IDatasource, IGetRowsParams, ColDef } from 'ag-grid';
import { AgGridNg2 } from 'ag-grid-angular';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {

  public columnDefs: any[];
  public rowData: any[];
  public gridOptions: any;
  public info: string;
  @ViewChild('grid') grid: AgGridNg2;

  constructor() {
    console.log("in constructor");
    this.columnDefs = [
      { headerName: 'One', field: 'one' },
      { headerName: 'Two', field: 'two' },
      { headerName: 'Three', field: 'three' }
    ];

    this.gridOptions = {
      rowSelection: 'single',
      cacheBlockSize: 50,
      maxBlocksInCache: 2,
      enableServerSideFilter: false,
      enableServerSideSorting: false,
      rowModelType: 'infinite',
      pagination: true,
      paginationAutoPageSize: true
    };

  }


  private createRowData(startRow: number, endRow: number): any[] {
    var rowdata = [];
    for (var i = startRow; i <= endRow; i++) {
      rowdata.push({ one: "hello", two: "world", three: "Item " + i });
    }
    return rowdata;
  }

  onGridReady(params: any) {
    console.log("onGridReady");
    var datasource = {
      getRows: (params: IGetRowsParams) => {
        this.info = "Getting datasource rows, start: " + params.startRow + ", end: " + params.endRow;
        var data = this.createRowData(params.startRow, params.endRow);
        params.successCallback(data, 2000);
      }
    };
    params.api.setDatasource(datasource);

  }

  toggleColumn() {
    var col1 = this.columnDefs[0];
    col1.hide = !col1.hide;
    this.grid.api.setColumnDefs(this.columnDefs);
  }

}
