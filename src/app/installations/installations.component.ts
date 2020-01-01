import { Component, OnInit } from '@angular/core';
import { Factory } from '../Interfaces/factory';
import { Storage } from '../Interfaces/storage';
import { CenterService } from '../Services/center.service';

@Component({
  selector: 'app-installations',
  templateUrl: './installations.component.html',
  styleUrls: ['./installations.component.css']
})
export class InstallationsComponent implements OnInit {
  key_panel_storage: string[];
  panel_storage: JSON;
  key_panel_factory: string[];
  panel_factory: JSON;
  constructor(private centerService: CenterService) { }

  ngOnInit() {
    this.key_panel_storage = this.centerService.key_panel_storage;
    this.panel_storage = this.centerService.panel_storage;
    this.key_panel_factory = this.centerService.key_panel_factory;
    this.panel_factory = this.centerService.panel_factory;
  }

}