import { Component, ViewChild, Input, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatChipInputEvent} from '@angular/material/chips';
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
  @Input() chipcol: string = null;
  @Input() filtercol: string = null;
  boolPag: boolean = true;
  boolMethod: boolean;
  selection = new SelectionModel<any>(true, []);
  filterlist: string[];

  chipList: any = []; 
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

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
  ngOnInit(){
    this.dataSource = new MatTableDataSource(this.dataSource);
    if(this.chipcol != null){
      this.centerService.utilitaire.getMyData(this.centerService.json_serveur, this.chipcol).split(',').forEach(element => this.chipList.push({'name':element, 'state': false}));
    }
    if(this.filtercol !=null){
      this.filterlist = this.filtercol.split(',')
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: Element, filter: string) => {
      if(Object.keys(data).includes(this.filterlist[0])){return data[this.filterlist[0]].includes(filter);}
     };
    console.log(this.dataSource.data);
    //this.dataSource.filter = this.dataSource.data.filter(e => console.log( && e['Installation -$nC$'].indexOf('Usin') !== -1));
    //this.dataSource.data[1]["Id -$nc$"] = 'test';
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
  
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.chipList.push({'name':value, 'state':false});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(str: JSON): void {
    const index = this.chipList.indexOf(str);
    if (index >= 0) {
      this.chipList.splice(index, 1);
    }
  }
  chipsSelection(json: any){
    const state = json.state;
    this.chipList.forEach(e=>e.state=false);
    if(!state){
      const index = this.chipList.indexOf(json);
      if (index >= 0){this.chipList[index].state = true;}
      this.dataSource.filter = json.name;
    }else{
      this.dataSource.filter = "";
    }
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
