import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProduitsComponent } from './produits/produits.component';
import { ProduitComponent } from './produit/produit.component';
import { CenterService } from './Services/center.service';
import { InstallationsComponent } from './installations/installations.component';
import { InstallationUsineComponent } from './installation-usine/installation-usine.component';
import { InstallationEntrepotComponent } from './installation-entrepot/installation-entrepot.component';
import { ServeurComponent } from './serveur/serveur.component';
import { InitService } from './Services/init.service';
import { ServeursComponent } from './serveurs/serveurs.component';
import { FinanceComponent } from './finance/finance.component';
import { TableColumnsComponent } from './table-columns/table-columns.component';
import { TableRowsComponent } from './table-rows/table-rows.component';

@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})
export class DemoMaterialModule {}

@NgModule({
  imports: [BrowserModule, FormsModule, MatInputModule, MatButtonModule, MatTableModule,BrowserAnimationsModule, DemoMaterialModule],
  declarations: [AppComponent, HeaderComponent, ProduitsComponent, ProduitComponent, InstallationsComponent, InstallationUsineComponent, InstallationEntrepotComponent, ServeurComponent, ServeursComponent, FinanceComponent, TableColumnsComponent, TableRowsComponent],
  bootstrap: [AppComponent],
  providers: [CenterService, InitService]
})
export class AppModule { }
