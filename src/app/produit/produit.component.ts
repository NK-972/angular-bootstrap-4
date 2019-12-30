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
  @Input() data: Product;
  utilitaire: Utilitaire = new Utilitaire();
  prod: Product;

  constructor(private dataService: CenterService) {
  }

  ngOnInit(){
    this.data = this.data as Product;
    console.log('mydata '+this.data);
  }

}