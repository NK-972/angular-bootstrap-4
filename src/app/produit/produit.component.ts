import { Component, Input, OnInit } from '@angular/core';
import { Utilitaire } from '../../utilitaire';
import { Product } from '../Interfaces/product';
import { CenterService } from '../Services/center.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit{
  @Input() key: Product;
  utilitaire: Utilitaire = new Utilitaire();
  prod: Product;
  selectedInstallation: string;

  constructor(private centerService: CenterService) {
  }

  ngOnInit(){
    this.selectedInstallation = this.centerService.panel_produits[this.key].installations[0];
  }

}