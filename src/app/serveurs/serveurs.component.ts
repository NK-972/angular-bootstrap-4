import { Component, OnInit } from '@angular/core';
import { InitService } from '../Services/init.service';

@Component({
  selector: 'app-serveurs',
  templateUrl: './serveurs.component.html',
  styleUrls: ['./serveurs.component.css']
})
export class ServeursComponent implements OnInit {
  panel_servers: JSON;
  key_panel_servers: string[];

  constructor(private initServer: InitService) { }

  ngOnInit() {
  }

}