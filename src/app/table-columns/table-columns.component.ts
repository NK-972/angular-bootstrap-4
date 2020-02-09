import { Component, ViewChild, Input, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-table-columns',
  templateUrl: './table-columns.component.html',
  styleUrls: ['./table-columns.component.css']
})
export class TableColumnsComponent implements OnInit {
  @Input() dataSource : any[];
  @Input() displayedColumns: string[]; // = ['position', 'name', 'weight', 'symbol'];
  @Input() height: string = '50vh';

  boolPag: boolean = true;
  boolMethod: boolean;
  len: number;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  formateKey(row: string, ncol: string, nrow: number): string{
    return row[nrow+''+ncol];
  }
  getDisplayedColumns(): string[]{
    let list : string[] = [];
    for(var value of this.displayedColumns){
      if(!value.includes('-$nc$') || value!=""){
        list.push(value);
      }
    }
    return list;
  }
  actionOnRow(key: string): string{
    if(key.includes('$eL$')){
      return 'select';
    }else if(key.includes('$eN$')){
      return 'inputNumber';
    }
    return 'string';
  }
  isSticky(value: string): boolean{
    if(value ==' '){
      return true;
    }
    return false;
  }

  constructor() {}

  ngOnInit() {
  }

}