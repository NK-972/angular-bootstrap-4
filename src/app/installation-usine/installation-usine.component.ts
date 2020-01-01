import { Component, Input, OnInit } from '@angular/core';
import { Utilitaire } from '../../utilitaire';
import { Factory } from '../Interfaces/factory';
import { CenterService } from '../Services/center.service';

@Component({
  selector: 'app-installation-usine',
  templateUrl: './installation-usine.component.html',
  styleUrls: ['./installation-usine.component.css']
})
export class InstallationUsineComponent implements OnInit {
  @Input() data: Factory;
  utilitaire: Utilitaire = new Utilitaire();
  prod: Factory;
  constructor(private centerService: CenterService) { }

  ngOnInit() {
    this.data = this.data as JSON;
  }

}