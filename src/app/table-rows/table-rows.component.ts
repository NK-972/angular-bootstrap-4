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
  }//str: string
  compareEgalite(str: string): boolean{
    return str=='string' ? true : false;
  }
  ngOnInit(){
    console.log(this.table);
    this.displayedColumns = this.table[this.table.length -1]['headers'];
    console.log(this.displayedColumns);
    this.table.splice(this.table.length -1, 1);
    console.log(this.table);
    this.dataSource = new MatTableDataSource(this.table);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }
}

const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];