import { Component, Input, OnInit } from '@angular/core';
import { Utilitaire } from '../../utilitaire';
import { Storage } from '../Interfaces/storage';
import { CenterService } from '../Services/center.service';

@Component({
  selector: 'app-installation-entrepot',
  templateUrl: './installation-entrepot.component.html',
  styleUrls: ['./installation-entrepot.component.css']
})
export class InstallationEntrepotComponent implements OnInit {
  @Input() key: Storage;
  utilitaire: Utilitaire = new Utilitaire();
  constructor(private centerService: CenterService) { }

  ngOnInit() {
  }

}