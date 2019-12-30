import { Component, } from '@angular/core';
import { Utilitaire } from '../../utilitaire';
import { Product } from '../Interfaces/product'

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent{
  turn: Number = 1;
  utilitaire: Utilitaire = new Utilitaire();
  string_produits: string = "[[JSON, Tour, Nom du produit, Recette, Prix, R&D, Production, Prod° par instal, Installation, Actif, Qualité, Indice technique, Image prix, Marge brute, Taux de marge brute, Demande, Stock, Prix de mp, Notoriété, Indice R&D, Brevet, Nbr de produit vendu, Frais de transport], [Bouteille d'eau 21811_0, 0, Bouteille d'eau, 21811, 0, 0, 0, ,0,0,, ,0,1,, 0, 0, 0.000000, 1.00, 0, 0.00, 0, 0, null, 0.00, 1.00, 0, 0, 0], [Bouteille d'eau 21811_1, 1, Bouteille d'eau, 21811, 30, 30000, 0, ,0,0,, ,0,1,, 1, 0, 0.000000, 1.00, 24, 4.00, 11200, 0, null, 0.00, 1.60, 0, 0, 0], [Bouteille d'eau 21811_2, 2, Bouteille d'eau, 21811, 30, 30000, 2000, ,0,2000,, ,0,1,, 1, 0, 0.000000, 1.00, 19, 1.73, 9200, 0, null, 0.00, 1.60, 0, 2000, 8000], [Bouteille d'eau 21811_3, 3, Bouteille d'eau, 21811, 30, 30000, 0, ,0,0,, ,0,1,, 1, 0, 0.000000, 1.00, 9, 0.43, 11200, 0, null, 0.00, 1.60, 0, 0, 0], [Bouteille d'eau 21811_4, 4, Bouteille d'eau, 21811, 30, 30000, null, ,0,0,, ,0,1,, 1, 0, null, null, null, null, null, null, null, null, null, 0, null, null]]";
  json_produits: JSON;
  key_product: string[];
  produit: Product;
  panel_produits: Product[] = [];


  createProduct(name: string){
    let prod: Product = {
      id: name
    }
    return prod;
  }

  constructor() {
    this.json_produits = this.utilitaire.StringToTable(this.string_produits);
    console.log("Affichage JSON produit"+this.json_produits);
    console.log("Test getData "+this.utilitaire.getData(this.json_produits, "Bouteille d'eau 21811", "_"+this.turn, 'Recette'));
    this.key_product = Object.keys(this.json_produits);
    console.log("Product key "+this.key_product);
    console.log("Product get produit tour "+this.utilitaire.getAllOcc(this.key_product, ' '+this.turn));
    let product_turn: string[] = this.utilitaire.getAllOcc(this.key_product, ' '+this.turn); 
    for (var i = 0; i < product_turn.length; i++) {
      console.log(product_turn[i]);
      console.log(this.createProduct(product_turn[i].split('_')[0]));
    }
    console.log();
   }



}