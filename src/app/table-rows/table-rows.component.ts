import { Component, ViewChild, Input, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { CenterService } from '../Services/center.service';

@Component({
  selector: 'app-table-rows',
  templateUrl: './table-rows.component.html',
  styleUrls: ['./table-rows.component.css']
})

export class TableRowsComponent implements OnInit{
  @Input() dataSource : any;
  @Input() displayedColumns: string[]; // = ['position', 'name', 'weight', 'symbol'];
  @Input() height: string = '20vh';
  boolPag: boolean = true;
  boolMethod: boolean;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private centerService: CenterService){}
  getDisplayedColumns(): string[]{
    let list : string[] = [];
    for(var value of this.displayedColumns){
      if(!value.includes('-$nc$')){
        list.push(value);
      }
    }
    return list;
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.dataSource);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //this.dataSource.data[1]["Id -$nc$"] = 'test';
  console.log(this.dataSource.data);
  }
  testtest(row: any, val: string): boolean{
    //console.log('hello', row['Installation -$nC$'], val);
    //console.log(val.trim().toLowerCase() == row['Installation -$nC$'].trim().toLowerCase());
    return val == row['Installation -$nC$'];
  }
  selectChange(val: any, x: any, data: string){
    //console.log(this.dataSource.data[this.dataSource.data.indexOf(val)]['Installation -$nC$'], x, data);
    this.dataSource.data[this.dataSource.data.indexOf(val)]['Installation -$nC$'] = data;
    //console.log(this.dataSource.data[this.dataSource.data.indexOf(val)]['Installation -$nC$'], x, data);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //console.log(this.dataSource.data);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
