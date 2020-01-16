import { Component, ViewChild, Input, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-table-rows',
  templateUrl: './table-rows.component.html',
  styleUrls: ['./table-rows.component.css']
})

export class TableRowsComponent implements OnInit{
  @Input() table : [];
  displayedColumns: string[]; // = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;
  boolMethod: boolean;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatPaginator;

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
  getDisplayedColumns(): string[]{
    let list : string[] = [];
    for(var value of this.displayedColumns){
      if(!value.includes('-$nc$')){
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
  dataInCell(key: string, row: string): any{
    let s: any;
    s = row;
    if(key.includes('$eL$')){
      return row.split(',');
    }
    return s;
  }
  compareEgalite(str: string): boolean{
    return str=='string' ? true : false;
  }
  ngOnInit(){
    this.displayedColumns = this.table[this.table.length -1]['headers'];
    this.table.splice(this.table.length -1, 1);
    this.dataSource = new MatTableDataSource(this.table);
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
