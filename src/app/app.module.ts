import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProduitsComponent } from './produits/produits.component';
import { ProduitComponent } from './produit/produit.component';
import { CenterService } from './Services/center.service';
import { InstallationsComponent } from './installations/installations.component';
import { UsineComponent } from './usine/usine.component';
import { InstallationUsineComponent } from './installation-usine/installation-usine.component';
import { InstallationEntrepotComponent } from './installation-entrepot/installation-entrepot.component';
import { ServeurComponent } from './serveur/serveur.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HeaderComponent, ProduitsComponent, ProduitComponent, InstallationsComponent, UsineComponent, InstallationUsineComponent, InstallationEntrepotComponent, ServeurComponent],
  bootstrap: [AppComponent],
  providers: [CenterService]
})
export class AppModule { }
