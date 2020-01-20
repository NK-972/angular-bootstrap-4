import { Component, OnInit } from '@angular/core';
import { CenterService } from '../Services/center.service';

@Component({
  selector: 'app-marche-du-travail',
  templateUrl: './marche-du-travail.component.html',
  styleUrls: ['./marche-du-travail.component.css']
})
export class MarcheDuTravailComponent implements OnInit {
  step: number = 1;
  constructor(private centerService: CenterService) { }

  ngOnInit() {

  }

}