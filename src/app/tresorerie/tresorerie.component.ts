import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { CenterService } from '../Services/center.service';

@Component({
  selector: 'app-tresorerie',
  templateUrl: './tresorerie.component.html',
  styleUrls: ['./tresorerie.component.css']
})
export class TresorerieComponent {

  constructor(private centerService: CenterService) { }


}