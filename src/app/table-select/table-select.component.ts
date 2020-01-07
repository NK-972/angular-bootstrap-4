import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.css']
})
export class TableSelectComponent implements OnInit {
  @Input() data : string[];
  selectedValue: string;
  constructor() { }

  ngOnInit() {
    this.selectedValue = this.data[0];
  }

}