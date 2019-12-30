import { Component, Input, OnInit } from '@angular/core';
import { Utilitaire } from '../../utilitaire';
import { Product } from '../Interfaces/product';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit{
  @Input() data: Product;
  utilitaire: Utilitaire = new Utilitaire();


  constructor() { 
    console.log('mydata '+this.data);
  }

  ngOnInit(){
    //this.data = this.data as string[];
    console.log('mydata '+this.data);
  }

}