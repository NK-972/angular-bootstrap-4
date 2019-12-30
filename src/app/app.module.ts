import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProduitsComponent } from './produits/produits.component';
import { ProduitComponent } from './produit/produit.component';
import { CenterService } from './Services/center.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HeaderComponent, ProduitsComponent, ProduitComponent],
  bootstrap: [AppComponent],
  providers: [CenterService]
})
export class AppModule { }
