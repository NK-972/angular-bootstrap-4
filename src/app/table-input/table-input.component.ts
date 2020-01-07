import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-input',
  templateUrl: './table-input.component.html',
  styleUrls: ['./table-input.component.css']
})
export class TableInputComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
  }

}