import { Component, Input, OnInit } from '@angular/core';
import { Utilitaire } from '../../utilitaire';
import { Product } from '../Interfaces/product';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { CenterService } from '../Services/center.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  numberFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);



  constructor(private centerService: CenterService) {
  }

  ngOnInit(){
    this.selectedInstallation = this.centerService.panel_produits[this.key].installations[0];
  }

  updateInstallations(value: string): string{
    console.log(value);
    this.centerService.actualiserValeurProduit(this.key, 3, value);
    return value;
  }

}