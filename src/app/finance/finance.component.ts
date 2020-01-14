import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { CenterService } from '../Services/center.service';
/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent{

  constructor(private centerService: CenterService ){}
}