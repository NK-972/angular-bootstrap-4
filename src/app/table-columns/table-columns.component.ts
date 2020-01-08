import { Component, ViewChild, Input, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-table-columns',
  templateUrl: './table-columns.component.html',
  styleUrls: ['./table-columns.component.css']
})
export class TableColumnsComponent implements OnInit {
  @Input() table : any;
  displayedColumns: string[]; // = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;
  boolMethod: boolean;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @ViewChild(MatPaginator, { static: false })
  set setpaginator(value: MatPaginator) {
    if(this.displayedColumns){
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, { static: false })
  set setsort(value: MatSort){
    if(this.displayedColumns){
      this.dataSource.sort = value;
    }
  }
  formateKey(str: string, num: number){
    return str+' -'+num;
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor() { }

  ngOnInit() {
    console.log('mytable'+this.table);
    this.displayedColumns = this.table[this.table.length -1]['headers'];
    this.displayedColumns.splice(this.displayedColumns.length -1, 1);
    console.log(this.displayedColumns);
    this.table.splice(this.table.length -1, 1);
    this.dataSource = new MatTableDataSource(this.table);
    console.log('mytable'+this.table);
  }

}