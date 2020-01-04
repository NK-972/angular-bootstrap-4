import { Component, OnInit} from '@angular/core';
import { Utilitaire } from '../../utilitaire';
import { CenterService } from '../Services/center.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit{
  panel_produits: JSON;
  key_panel_produits: string[];

  constructor(private centerService: CenterService) {
  }

  ngOnInit(){
    this.panel_produits = this.centerService.panel_produits;
    this.key_panel_produits = this.centerService.key_panel_produits;
  }

}