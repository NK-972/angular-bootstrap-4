import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
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
import { ConnectionComponent } from './connection/connection.component';
import { MenuLatComponent } from './menu-lat/menu-lat.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { BodyViewComponent } from './body-view/body-view.component';
import { InformationComponent } from './information/information.component';
import { HeaderTablePipe } from './Pipes/header-table.pipe';
import { MarcheDuTravailComponent } from './marche-du-travail/marche-du-travail.component';
import { LaboratoireComponent } from './laboratoire/laboratoire.component';
import { TresorerieComponent } from './tresorerie/tresorerie.component';
import { DescriptionDataPipe } from './Pipes/description-data.pipe';
import { InstallationAchatComponent } from './installation-achat/installation-achat.component';

import { AuthGuard } from './Guards/auth.guard';
import { ServGuard } from './Guards/serv.guard';


const appRoutes: Routes = [
  { path: '', component:  ConnectionComponent}
  , { path: 'auth', component: ConnectionComponent }
  , { path: 'serveurs', canActivate: [AuthGuard], component: ServeursComponent }
  , { path: 'presentation', canActivate: [AuthGuard, ServGuard], component: ProduitsComponent}
  , { path: 'produits', canActivate: [AuthGuard, ServGuard], component: ProduitsComponent}
  , { path: 'installations', canActivate: [AuthGuard, ServGuard], component: InstallationsComponent}
  , { path: 'finance', canActivate: [AuthGuard, ServGuard], component:  FinanceComponent}
  //, { path: 'finance', canActivate: [AuthGuardService], component: TresorerieComponent}
  , { path: 'marche', component: MarcheDuTravailComponent} //canActivate: [AuthGuard, ServGuard], 
  , { path: 'laboratoire', canActivate: [AuthGuard, ServGuard], component: LaboratoireComponent}
];

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
  imports: [BrowserModule, FormsModule, MatInputModule, MatButtonModule, MatTableModule,BrowserAnimationsModule, DemoMaterialModule, RouterModule.forRoot(appRoutes)],
  declarations: [AppComponent, HeaderComponent, ProduitsComponent, ProduitComponent, InstallationsComponent, InstallationUsineComponent, InstallationEntrepotComponent, ServeurComponent, ServeursComponent, FinanceComponent, TableColumnsComponent, TableRowsComponent, ConnectionComponent, MenuLatComponent, BodyViewComponent, InformationComponent, HeaderTablePipe, MarcheDuTravailComponent, LaboratoireComponent, TresorerieComponent, DescriptionDataPipe, InstallationAchatComponent],
  bootstrap: [AppComponent],
  providers: [CenterService, InitService, AuthGuardService, AuthGuard, ServGuard]
})
export class AppModule { }
