import { Component, Input } from '@angular/core';
import { Utilitaire } from '../../utilitaire'

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent{
  @Input() data: string;
  utilitaire: Utilitaire = new Utilitaire();

  constructor() { 
    console.log('mydata '+this.data);
  }


}