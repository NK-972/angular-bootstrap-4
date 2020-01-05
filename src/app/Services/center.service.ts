import { Injectable } from '@angular/core';
import { Utilitaire } from '../../utilitaire';
import { Product } from '../Interfaces/product';
import { Factory } from '../Interfaces/factory';
import { Storage } from '../Interfaces/storage';

@Injectable()
export class CenterService {
  turn: Number = 4;
  utilitaire: Utilitaire = new Utilitaire();
  /* Products */
  string_produits: string = "[[JSON, Tour, Nom du produit, Recette, Prix, R&D, Production, Prod° par instal, Installation, Actif, Qualité, Indice technique, Image prix, Marge brute, Taux de marge brute, Demande, Stock, Prix de mp, Notoriété, Indice R&D, Brevet, Nbr de produit vendu, Frais de transport], [Bouteille d'eau 21811_0, 0, Bouteille d'eau, 21811, 0, 0, 0, 0, 1, 0, 0, 0.000000, 1.00, 0, 0.00, 0, 0, null, 0.00, 1.00, 0, 0, 0], [Bouteille d'eau 21811_1, 1, Bouteille d'eau, 21811, 30, 30000, 3600, 3600, 1, 1, 0, 0.400000, 1.00, 19, 1.73, 13200, 0, null, 0.00, 1.60, 0, 3600, 14400], [Bouteille d'eau 21811_2, 2, Bouteille d'eau, 21811, 30, 30000, 5000, 5000, 1, 1, 0, 0.470000, 1.00, 11, 0.58, 11800, 0, null, 0.00, 1.60, 0, 5000, 20000], [Bouteille d'eau 21811_3, 3, Bouteille d'eau, 21811, 30, 30000, 3600, 3600, 1, 1, 0, 0.670000, 1.00, 6, 0.25, 13200, 0, null, 0.00, 1.60, 0, 3600, 14400]]";
  json_produits: JSON;
  key_product: string[];
  panel_produits: JSON;
  key_panel_produits: string[];
  /* Installations - Usine */
  string_usines: string = "[[JSON, Tour, Nom de l'installation, N° Installation joueur, Taille, Région, Entretien, Indice salaire, Nombre d'employés, Nombre d'employés max, Production, Production possible, Indice technique, Consommation énergétique, Moral, Situation, Durée ammortissement, Temps avant utilisation, Valeur, Production max], [Usine n°1_0, 0, Usine n°1(U), 1, C, xxx, 0, 1.00, 0, 20, 0, 0, 0.00, 10000, 0, En construction, 25, 1, 250000, 30000], [Usine n°1_1, 1, Usine n°1(U), 1, C, xxx, 40000, 1.00, 15, 20, 3600, 11251, 0.40, 10000, 7, Fonctionnelle, 25, 0, 250000, 30000], [Usine n°1_2, 2, Usine n°1(U), 1, C, xxx, 40000, 1.00, 15, 20, 5000, 11251, 0.47, 10000, 7, Fonctionnelle, 25, 0, 250000, 30000], [Usine n°1_3, 3, Usine n°1(U), 1, C, xxx, 50000, 3.25, 15, 20, 3600, 11251, 0.67, 10000, 7, Fonctionnelle, 25, 0, 250000, 30000], [Usine n°1_4, 4, Usine n°1(U), 1, C, xxx, 50000, 3.25, 15, 20, 3600, 11251, 0.74, 10000, 7, Fonctionnelle, 25, 0, 250000, 30000]]";
  json_usines: JSON;
  key_factory: string[];
  usine: Factory;
  panel_factory: JSON;
  key_panel_factory: string[];
  /* Installations - Entrepôt */
  string_entrepot: string = "[[JSON, Tour, nom de l'entrepôt, N° entrepôt joueur, Taille, Région, Entretien, Indice salaire, Nombre d'employés, Nombre d'employés max, Stock, Taille du stockage, Indice technique, Frais divers, Situation, Moral, Valeur, Durée amortissement], [Entrepôt n°1_0, 0, Entrepôt n°1(e), 1, C, xxx, 0, 1, 0, 0, 0, 0, 0.00, 0, fonctionnelle, 0, 0, 0], [Entrepôt n°2_0, 0, Entrepôt n°2(e), 2, C, xxx, 0, 1, 0, 0, 0, 0, 0.00, 0, fonctionnelle, 0, 0, 0], [Entrepôt n°1_1, 1, Entrepôt n°1(e), 1, C, xxx, 0, 1, 5, 0, 0, 0, 0.00, 0, fonctionnelle, 2, 0, 0], [Entrepôt n°2_1, 1, Entrepôt n°2(e), 2, C, xxx, 0, 1, 0, 0, 0, 0, 0.00, 0, fonctionnelle, 0, 0, 0], [Entrepôt n°1_2, 2, Entrepôt n°1(e), 1, C, xxx, 0, 1, 5, 0, 0, 0, 0.00, 0, fonctionnelle, 2, 0, 0], [Entrepôt n°2_2, 2, Entrepôt n°2(e), 2, C, xxx, 0, 1, 0, 0, 0, 0, 0.00, 0, fonctionnelle, 0, 0, 0], [Entrepôt n°1_3, 3, Entrepôt n°1(e), 1, C, xxx, 30000, 1, 5, 0, 0, 0, 0.00, 0, fonctionnelle, 2, 0, 0], [Entrepôt n°2_3, 3, Entrepôt n°2(e), 2, C, xxx, 0, 1, 0, 0, 0, 0, 0.00, 0, fonctionnelle, 0, 0, 0], [Entrepôt n°1_4, 4, Entrepôt n°1(e), 1, C, xxx, 30000, 1, 5, 0, 0, 0, 0.00, 0, fonctionnelle, 2, 0, 0], [Entrepôt n°2_4, 4, Entrepôt n°2(e), 2, C, xxx, 0, 1, 0, 0, 0, 0, 0.00, 0, fonctionnelle, 0, 0, 0]]";
  json_entrepot: JSON;
  key_storage: string[];
  entrepot: Factory;
  panel_storage: JSON;
  key_panel_storage: string[];


  constructor() {
    var JSONQury;
    /*  */
    JSONQury = {};
    this.json_usines = this.utilitaire.StringToTable(this.string_usines);
    this.key_factory = Object.keys(this.json_usines);
    let usine_turn: string[] = this.utilitaire.getAllOcc(this.key_factory, '_'+this.turn); 
    for (var i = 0; i < usine_turn.length; i++) {
      JSONQury[usine_turn[i].split('_')[0]] = this.createFactory(usine_turn[i].split('_')[0], this.json_usines);
    }
    this.panel_factory = JSONQury as JSON;
    this.key_panel_factory = Object.keys(this.panel_factory);
    console.log(this.panel_factory);
    /*  */
    JSONQury = {};
    this.json_entrepot = this.utilitaire.StringToTable(this.string_entrepot);
    this.key_storage = Object.keys(this.json_entrepot);
    let entrepot_turn: string[] = this.utilitaire.getAllOcc(this.key_storage, '_'+this.turn); 
    for (var i = 0; i < entrepot_turn.length; i++) {
      JSONQury[entrepot_turn[i].split('_')[0]] = this.createStorage(entrepot_turn[i].split('_')[0], this.json_entrepot);
    }
    this.panel_storage = JSONQury as JSON;
    this.key_panel_storage = Object.keys(this.panel_storage);
    console.log(this.panel_storage);
    /*  */
    JSONQury = {};
    this.json_produits = this.utilitaire.StringToTable(this.string_produits);
    this.key_product = Object.keys(this.json_produits);
    let product_turn: string[] = this.utilitaire.getAllOcc(this.key_product, '_'+(this.turn-1)); 
    for (var i = 0; i < product_turn.length; i++) {
      JSONQury[product_turn[i].split('_')[0]] = this.createProduct(product_turn[i].split('_')[0], this.json_produits);
    }
    this.panel_produits = JSONQury as JSON;
    this.key_panel_produits = Object.keys(this.panel_produits);
    console.log(this.panel_produits);
    console.log(this.getProductionProduitbyUsine("Bouteille d'eau 21811", "Usine n°1", null));
    //this.actuliserPoucentageProduction("Usine n°1", 3600);
  }

  createProduct(name: string, json:JSON): Product{
    var arrIns = new Array();
    var turn_prod = Number(this.turn)-1;
    var arr = this.utilitaire.getData(json, name, "_"+turn_prod, "Installation").split(',');
    for (var value of arr){
      console.log(this.iDInstallationToName(value));
      arrIns.push(this.iDInstallationToName(value));
    }
    
    let prod: Product = {
      id: name
      , prix : Number(this.utilitaire.getData(json, name, "_"+turn_prod, 'Prix'))
      , rd : Number(this.utilitaire.getData(json, name, "_"+turn_prod, 'R&D'))
      , installations: arrIns
      , installationSelected: arrIns[0]
      //, ProductionbyFactory: this.getProductionProduitbyUsine(name, arrIns[0])
      , production: Number(this.utilitaire.getData(json, name, "_"+turn_prod, 'Production'))
      , productions: this.utilitaire.getData(json, name, "_"+turn_prod, 'Prod° par instal').split(',')
      , qualite: Number(this.utilitaire.getData(json, name, "_"+turn_prod, 'Qualité'))
      , ip: Number(this.utilitaire.getData(json, name, "_"+turn_prod, 'Indice prix'))
      , it: Number(this.utilitaire.getData(json, name, "_"+turn_prod, 'Indice technique'))
      , notoriete: Number(this.utilitaire.getData(json, name, "_"+turn_prod, 'Notoriété'))
      , demande: Number(this.utilitaire.getData(json, name, "_"+turn_prod, 'Demande'))
      , stock: Number(this.utilitaire.getData(json, name, "_"+turn_prod, 'Stock'))
      , mb: Number(this.utilitaire.getData(json, name, "_"+turn_prod, 'Marge brute'))
      , tmb: Number(this.utilitaire.getData(json, name, "_"+turn_prod, 'taux de marge brute'))
    }
    prod.productionbyFactory = this.getProductionProduitbyUsine(name, arrIns[0], prod);
    prod.pourcentageProduction = this.panel_factory[prod.installationSelected].pourcentageProduction;
    return prod;
  }

  createFactory(name: string, json:JSON): Factory{
    let factory: Factory = {
      id: name
      , entretien: Number(this.utilitaire.getData(json, name, "_"+this.turn, 'Entretien'))
      , nbrEmployes: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Nombre d'employés"))
      , indS : Number(this.utilitaire.getData(json, name, "_"+this.turn, "Indice salaire"))
      , nIns: Number(this.utilitaire.getData(json, name, "_"+this.turn, "N° Installation joueur"))
      , tp : ['']
      , cout : Number(0)
      , moral: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Moral"))
      , region: this.utilitaire.getData(json, name, "_"+this.turn, "Région")
      , it: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Indice technique"))
      , fd: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Frais divers"))
      , production: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Production"))
      , pourcentageProduction: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Production possible"))
      , pl: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Production max"))
      , prod: Number(0)
    }
    factory.pourcentageProduction = factory.production / factory.pourcentageProduction;
    
    return factory;
  }

  createStorage(name: string, json:JSON): Storage{
    let storage: Storage = {
      id: name
      , entretien: Number(this.utilitaire.getData(json, name, "_"+this.turn, 'Entretien'))
      , nbrEmployes: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Nombre d'employés"))
      , indS : Number(this.utilitaire.getData(json, name, "_"+this.turn, "Indice salaire"))
      , TP : ['']
      , nIns: Number(this.utilitaire.getData(json, name, "_"+this.turn, "N° entrepôt joueur"))
      , cout : Number(0)
      , moral: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Moral"))
      , region: this.utilitaire.getData(json, name, "_"+this.turn, "Région")
      , it: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Indice technique"))
      , fd: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Frais divers"))
      , stock: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Stock"))
      , sl: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Taille du stockage"))
      , s: Number(0)
    }
    return storage;
  }

  iDInstallationToName(n: Number){
    for(var key of this.key_panel_factory){
        if (n == this.panel_factory[key].nIns){
          return this.panel_factory[key].id
        }
    }
  }

  getProductionProduitbyUsine(key_prod: string, key_ins: string, myproduct: Product): Number{
    if (myproduct==null){return this.panel_produits[key_prod].productions[this.panel_produits[key_prod].installations.indexOf(key_ins)];}
    else{return myproduct.productions[myproduct.installations.indexOf(key_ins)]};
  }

  actualiserValeurProduit(key_prod: string, attribue: number, data:any){
    if(attribue == 0){this.panel_produits[key_prod].prix = 0;}
    else if(attribue == 1){this.panel_produits[key_prod].rd = 0;}
    else if(attribue == 2){this.panel_produits[key_prod].installationSelected = 0;}
    else{
      attribue = data - this.panel_produits[key_prod];
      this.panel_produits[key_prod].attribue = 0;
      }  
  }
  actuliserPoucentageProduction(key: string, variation:Number){
    this.panel_factory[key].production = this.panel_factory[key].production + variation;
    this.panel_factory[key].pourcentageProduction = Math.round(this.panel_factory[key].production / this.panel_factory[key].productionPossible);
    for (var k in this.panel_produits){
      if (this.panel_produits[k].installationSelected == key){
        this.panel_produits[k].pourcentageProduction = this.panel_factory[key].pourcentageProduction;
      }
    }
  }
}