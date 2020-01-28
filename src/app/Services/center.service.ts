import { Injectable } from '@angular/core';
import { Utilitaire } from '../../utilitaire';
import { Product } from '../Interfaces/product';
import { Factory } from '../Interfaces/factory';
import { Storage } from '../Interfaces/storage';
import {MatTableDataSource} from '@angular/material/table';

@Injectable()
export class CenterService {
  turn: number = 4;
  utilitaire: Utilitaire = new Utilitaire();
  /* Info Serveur */
  string_serveur = "[[Nom du serveur, Date de début, Tour, Durée des tours, Date de fin, trésorerie, Point de recherche, Installations, Taille, Installation, Pays, Temps restant, Prix usine A, Prix usine B, Prix usine C, Entretien usine C, Entretien usnie B, Entretien usine A, Indice d'entretien minimal usine C, Indice d'entretien minimal usine B, Indice d'entretien minimal usine A, Indice upgrade u c to b, Indice upgrade u c to a, Indice upgrade u c to a, Prix entrepôt A, Prix entrepôt B, Prix entrepôt C, Entretien entrepôt C, Entretien usnie B, Entretien entrepôt A, Indice d'entretien minimal entrepôt C, Indice d'entretien minimal entrepôt B, Indice d'entretien minimal entrepôt A, Indice upgrade e c to b, Indice upgrade e c to a, Indice upgrade e c to a], [astro, null, 6, 0, null, 470070, 3, Usine n°1,Entrepôt n°1,Entrepôt n°2, A,B,C, U,E, xxx, 5,3,1, 1600000, 700000, 250000, 100000, 500000, 1000000, 1, 1, 1, 0.1, 0.1, 0.1, 1000000, 600000, 100000, 100000, 600000, 100000, 60000, 1, 1, 0.1, 0.1, 0.1]]";
  json_serveur: JSON;
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
 /* Marché du travail */
  string_marche: string = "[[Id -$nc$, Prenom/nom, Salaire -$iN$E$, Prime -$iN$E$, Durée du contrat -$iN$E$, Temps restant, Recrutement -$iC$], [354, arleta paige, 1350, 0, 40, 18, false], [355, art coldwell, 1350, 0, 40, 18, false], [356, auguste domek, 1350, 0, 40, 18, false], [357, avrom di batista, 1350, 0, 40, 18, false], [358, baird blueman, 1350, 0, 40, 18, false], [359, beckie stockney, 1350, 0, 40, 18, false], [360, brad tacker, 1350, 0, 40, 18, false], [361, brear redfield, 1350, 0, 40, 18, false], [362, brittany piffe, 1350, 0, 40, 18, false], [363, britte garrud, 1350, 0, 40, 18, false], [364, brnaby dyzart, 1350, 0, 40, 18, false], [365, brock sumption, 1350, 0, 40, 18, false], [366, brody mcdaniel, 1350, 0, 40, 18, false], [367, burg imlaw, 1350, 0, 40, 18, false], [368, cahra killigrew, 1350, 0, 40, 18, false], [369, camila rawkesby, 1350, 0, 40, 18, false], [370, catherine riley, 1350, 0, 40, 18, false], [371, charity jacobs, 1350, 0, 40, 18, false], [372, clark bentley, 1350, 0, 40, 18, false], [373, flavia strong, 1350, 0, 40, 18, false], [374, harper boyer, 1350, 0, 40, 18, false], [375, jasmine joyce, 1350, 0, 40, 18, false], [376, kadeem nixon, 1350, 0, 40, 18, false], [377, lacota snyder, 1350, 0, 40, 18, false], [378, mannix winters, 1350, 0, 40, 18, false], [379, miriam shaffer, 1350, 0, 40, 18, false], [380, mohammad marquez, 1350, 0, 40, 18, false], [381, murphy hansen, 1350, 0, 40, 18, false], [382, sacha irwin, 1350, 0, 40, 18, false], [383, sopoline neal, 1350, 0, 40, 18, false]]";
  table_marche: JSON[];
  columns_marche =[];
  /* */
  string_salaries = "[[Id -$nc$, Prénom/nom, Installation -$nC$, Installations  -$iL$E$, Salaire -$iN$D$, Prime -$iN$D$, Durée du contrat restant -$iN$D$], [608, abbe serchwell, Usine n°1, Usine n°1,Entrepôt n°1,Entrepôt n°2, 1350, 0, 34], [610, adams duncanson, Usine n°1, Usine n°1,Entrepôt n°1,Entrepôt n°2, 1350, 0, 34], [616, aimee triggs, Usine n°1, Usine n°1,Entrepôt n°1,Entrepôt n°2, 1350, 0, 34], [618, alfonso willingale, Usine n°1, Usine n°1,Entrepôt n°1,Entrepôt n°2, 1350, 0, 34], [619, allyn ruffey, Usine n°1, Usine n°1,Entrepôt n°1,Entrepôt n°2, 1350, 0, 34], [620, aloisia sturton, Usine n°1, Usine n°1,Entrepôt n°1,Entrepôt n°2, 1350, 0, 34], [621, alonso kundert, Usine n°1, Usine n°1,Entrepôt n°1,Entrepôt n°2, 1350, 0, 34], [622, aluino seal, Usine n°1, Usine n°1,Entrepôt n°1,Entrepôt n°2, 1350, 0, 34], [623, alvin russell, Usine n°1, Usine n°1,Entrepôt n°1,Entrepôt n°2, 1350, 0, 34], [624, amandi knappe, Usine n°1, Usine n°1,Entrepôt n°1,Entrepôt n°2, 1350, 0, 34], [625, amara imason, Usine n°1, Usine n°1,Entrepôt n°1,Entrepôt n°2, 1350, 0, 34], [627, anatol fulks, Usine n°1, Usine n°1,Entrepôt n°1,Entrepôt n°2, 1350, 0, 34], [628, ancell yurukhin, Usine n°1, Usine n°1,Entrepôt n°1,Entrepôt n°2, 1350, 0, 34], [629, andrej nestor, Usine n°1, Usine n°1,Entrepôt n°1,Entrepôt n°2, 1350, 0, 34], [630, andrew elcome, Usine n°1, Usine n°1,Entrepôt n°1,Entrepôt n°2, 1350, 0, 34], [631, anet thelwll, Entrepôt n°1, Entrepôt n°1,Usine n°1,Entrepôt n°2, 1350, 0, 34], [633, angelique irvin, Entrepôt n°1, Entrepôt n°1,Usine n°1,Entrepôt n°2, 1350, 0, 34], [635, anthony rumming, Entrepôt n°1, Entrepôt n°1,Usine n°1,Entrepôt n°2, 1350, 0, 34], [636, april hucks, Entrepôt n°1, Entrepôt n°1,Usine n°1,Entrepôt n°2, 1350, 0, 34], [638, arline blenkhorn, Entrepôt n°1, Entrepôt n°1,Usine n°1,Entrepôt n°2, 1350, 0, 34]]";
  table_salaries: JSON[];
  columns_salaries = [];
  /* */
  string_finances="[[Nombre de ventes, Chiffre d'affaire, Total produit -$sG$, Dépense de Production, Frais de distribution, Charge social, Coût des structure, Budgets, Intérêt des emprunts, Total charge -$sG$, Déficit -$sC$, Impôt sur les revenu, Exedent brute d'exploitation, Résultat  d'exploitation, Résultat net -$sG$], [0, 0, 0, 0, 0, 0, 10000¤Entretien:10000Amortissement:0, 0¤Commerciale: 0Publicité: 0Recherche: 0, 0, 10000, -10000, 0, 0, 0, 0], [3600, 108000, 108000, 39600, 14400, 20250, 10000¤Entretien:10000Amortissement:0, 0¤Commerciale: 0Publicité: 0Recherche: 0, 0, 84250, 23750, 9025, 0, 0, 0], [5000, 150000, 150000, 65000, 20000, 20250, 10000¤Entretien:10000Amortissement:0, 0¤Commerciale: 0Publicité: 0Recherche: 0, 0, 115250, 34750, 13205, 0, 0, 0], [3600, 108000, 108000, 50400, 14400, 65812, 10000¤Entretien:10000Amortissement:0, 0¤Commerciale: 0Publicité: 0Recherche: 0, 0, 140612, -32612, 0, 0, 0, 0]]";
  table_finances: JSON[];
  columns_finances: [];
   /* */
  string_bilan_actif="[[Actif immobilisé coporel, Actif immobilisé incorporel, Actif immobilisé financier, Amortissement, Stock de produit finis, Créance clients, Disponibilité], [450000, 0, 0, 625000, 0, 0, 500000], [450000, 0, 0, 625000, 0, 0, 250000], [450000, 0, 0, 625000, 0, 0, 221175], [450000, 0, 0, 625000, 0, 0, 175470]]";
  table_bilan_actif: JSON[];
  columns_bilan_actif= [];
   /* */
  string_bilan_passif="[[Capital social, Réserve, Report à nouveau, Situation nette, Dette financière, Dette fournisseur, Bilan découvet, Total passif], [500000, 0, 0, 500000, 0, 0, -10000, 0], [500000, 0, 0, 500000, 0, 0, 0, 0], [500000, 0, 0, 500000, 0, 0, 0, 0], [500000, 0, 0, 500000, 0, 0, -32612, 0]]";
  table_bilan_passif: [];
  columns_bilan_passif= [];
  string_tresorerie= "[[Trésorerie initiale, Vente Comptant, Encaissements, Achat comptant, Achat d'usine, Remboursement Anticipé de Prêt, Décaissement, Impôt sur les benéfices, Flux de tresorerie, Trésorerie, Capital social], [500000, 0, 0, 0, 250000, 0, 250000, 0, -250000, 250000, 500000], [250000, 108000, 108000, 39600, 0, 0, 39600, 9025, 59375, 309375, 500000], [221175, 150000, 150000, 65000, 0, 0, 65000, 13205, 71795, 292970, 500000], [175470, 108000, 108000, 50400, 0, 0, 50400, 0, 57600, 233070, 500000]]";
  table_tresorerie: JSON[];
  columns_tresorerie = [];
  /* */
  string_log = "[[Tour, Info, Type], [0, bienvenue sur le serveur astro manmay man kontan wé zot !, 3], [0, l'achat de l'installation Usine n°1 confirmé !, 1], [0, l'achat de l'installation Entrepôt n°1 confirmé !, 1], [0, l'achat de l'installation Entrepôt n°2 confirmé !, 1], [0, vous avez débloquer le produit Bouteille d'eau ref :21811, 1]]";
  table_log: JSON[];
  columns_log= [];
  /* */
  string_produits_possibles = "[[Références, Nom du produit, Ingrédient 1, Ingrédient 2, Ingrédient 3, Ingrédient 4, Qualité, Valeur, Point de recherche, Mise sur le marché -$iC$E$, brevet -$iC$E$], [818191, boite de steak, boeuf(xxx), plastique(xxx), carton(xxx), , 3, 10, 2, false, false], [818501, boite de steak, boeuf(xxx), plastique(xxx), carton(yyy), , 5, 7, 2, false, false], [849191, boite de steak, boeuf(xxx), plastique(yyy), carton(xxx), , 5, 14, 2, false, false], [849501, boite de steak, boeuf(xxx), plastique(yyy), carton(yyy), , 7, 11, 2, false, false], [3818191, boite de steak, boeuf(yyy), plastique(xxx), carton(xxx), , 5, 11, 2, false, false], [3818501, boite de steak, boeuf(yyy), plastique(xxx), carton(yyy), , 7, 8, 2, false, false], [3849191, boite de steak, boeuf(yyy), plastique(yyy), carton(xxx), , 7, 15, 2, false, false], [3849501, boite de steak, boeuf(yyy), plastique(yyy), carton(yyy), , 9, 12, 2, false, false], [21811, bouteille d'eau, eau(xxx), plastique(xxx), , , 2, 14, 2, true, false], [24911, bouteille d'eau, eau(xxx), plastique(yyy), , , 4, 18, 2, false, false], [321811, bouteille d'eau, eau(yyy), plastique(xxx), , , 4, 13, 2, false, false], [324911, bouteille d'eau, eau(yyy), plastique(yyy), , , 6, 17, 2, false, false], [31911, briques de lait, lait(xxx), carton(xxx), , , 2, 15, 2, false, false], [35011, briques de lait, lait(xxx), carton(yyy), , , 4, 12, 2, false, false], [331911, briques de lait, lait(yyy), carton(xxx), , , 4, 14, 2, false, false], [335011, briques de lait, lait(yyy), carton(yyy), , , 6, 11, 2, false, false], [42181, jus de canne, canne(xxx), eau(xxx), plastique(xxx), , 3, 16, 2, false, false], [42491, jus de canne, canne(xxx), eau(xxx), plastique(yyy), , 5, 20, 2, false, false], [432181, jus de canne, canne(xxx), eau(yyy), plastique(xxx), , 5, 15, 2, false, false], [432491, jus de canne, canne(xxx), eau(yyy), plastique(yyy), , 7, 19, 2, false, false], [342181, jus de canne, canne(yyy), eau(xxx), plastique(xxx), , 5, 11, 2, false, false], [342491, jus de canne, canne(yyy), eau(xxx), plastique(yyy), , 7, 15, 2, false, false], [3432181, jus de canne, canne(yyy), eau(yyy), plastique(xxx), , 7, 10, 2, false, false], [3432491, jus de canne, canne(yyy), eau(yyy), plastique(yyy), , 9, 14, 2, false, false], [303201, pain, farine(xxx), lait(xxx), papier(xxx), , 5, 8, 2, false, false], [303511, pain, farine(xxx), lait(xxx), papier(yyy), , 7, 11, 2, false, false], [3033201, pain, farine(xxx), lait(yyy), papier(xxx), , 7, 7, 2, false, false], [3033511, pain, farine(xxx), lait(yyy), papier(yyy), , 9, 10, 2, false, false], [313201, pain, farine(yyy), lait(xxx), papier(xxx), , 5, 8, 2, false, false], [313511, pain, farine(yyy), lait(xxx), papier(yyy), , 7, 11, 2, false, false], [3133201, pain, farine(yyy), lait(yyy), papier(xxx), , 7, 7, 2, false, false], [3133511, pain, farine(yyy), lait(yyy), papier(yyy), , 9, 10, 2, false, false], [91811, sachet de poulet, poulet(xxx), plastique(xxx), , , 2, 12, 2, false, false], [94911, sachet de poulet, poulet(xxx), plastique(yyy), , , 4, 16, 2, false, false], [391811, sachet de poulet, poulet(yyy), plastique(xxx), , , 4, 17, 2, false, false], [394911, sachet de poulet, poulet(yyy), plastique(yyy), , , 6, 21, 2, false, false], [72181, soda, arome(xxx), eau(xxx), plastique(xxx), , 3, 10, 2, false, false], [72491, soda, arome(xxx), eau(xxx), plastique(yyy), , 5, 14, 2, false, false], [732181, soda, arome(xxx), eau(yyy), plastique(xxx), , 5, 9, 2, false, false], [732491, soda, arome(xxx), eau(yyy), plastique(yyy), , 7, 13, 2, false, false], [372181, soda, arome(yyy), eau(xxx), plastique(xxx), , 5, 16, 2, false, false], [372491, soda, arome(yyy), eau(xxx), plastique(yyy), , 7, 20, 2, false, false], [3732181, soda, arome(yyy), eau(yyy), plastique(xxx), , 7, 15, 2, false, false], [3732491, soda, arome(yyy), eau(yyy), plastique(yyy), , 9, 19, 2, false, false], [13111, t-shirt, coton(xxx), , , , 1, 15, 2, false, false], [43111, t-shirt, coton(yyy), , , , 3, 14, 2, false, false]]";
  table_produits_possibles: JSON[];
  columns_produits_possibles: [];

  constructor() {
    var JSONQury;
    /*  */
    this.json_serveur = this.utilitaire.StringToTable(this.string_serveur);
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
    console.log(this.panel_factory["Usine n°1"].production)
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
    //console.log(this.getProductionProduitbyUsine("Bouteille d'eau 21811", "Usine n°1", null));
    //this.actuliserPoucentageProduction("Usine n°1", 3600);
    /* */
    this.table_marche = this.utilitaire.createTableRow(this.string_marche);
    this.columns_marche = this.table_marche[this.table_marche.length -1]['headers'];
    this.table_marche.splice(this.table_marche.length -1, 1);
    /* */
    this.table_salaries = this.utilitaire.createTableRow(this.string_salaries);
    this.columns_salaries = this.table_salaries[this.table_salaries.length -1]['headers'];
    this.table_salaries.splice(this.table_salaries.length -1, 1);
    /* */
    this.table_log = this.utilitaire.createTableRow(this.string_log);
    this.columns_log= this.table_log[this.table_log.length -1]['headers'];
    this.table_log.splice(this.table_log.length -1, 1);
    /* */
    this.table_finances = this.utilitaire.createTableColumns(this.string_finances, this.turn-1);
    this.columns_finances = this.table_finances[this.table_finances.length -1]['headers'];
    this.table_finances.splice(this.table_finances.length -1, 1);
    /* */
    this.table_bilan_actif = this.utilitaire.createTableColumns(this.string_bilan_actif, this.turn-1);
    this.columns_bilan_actif = this.table_bilan_actif[this.table_bilan_actif.length -1]['headers'];
    this.table_bilan_actif.splice(this.table_bilan_actif.length -1, 1);
    /* */
    this.table_bilan_passif = this.utilitaire.createTableColumns(this.string_bilan_passif, this.turn-1);
    this.columns_bilan_passif = this.table_bilan_passif[this.table_bilan_passif.length -1]['headers'];
    this.table_bilan_passif.splice(this.table_bilan_passif.length -1, 1);
    /* */
    this.table_tresorerie = this.utilitaire.createTableColumns(this.string_tresorerie, this.turn-1);
    this.columns_tresorerie= this.table_tresorerie[this.table_tresorerie.length -1]['headers'];
    this.table_tresorerie.splice(this.table_tresorerie.length -1, 1);
    /* */
    this.table_produits_possibles = this.utilitaire.createTableRow(this.string_produits_possibles);
    this.columns_produits_possibles = this.table_produits_possibles[this.table_produits_possibles.length -1]['headers'];
    this.table_produits_possibles.splice(this.table_produits_possibles.length -1, 1);
    /* */
    this.actualiserValeurProduit("Bouteille d'eau 21811", 4, 2000);
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
    prod.productionbyFactory = Number(this.getProductionProduitbyUsine(name, arrIns[0], prod));
    prod.pourcentageProduction = Number(this.panel_factory[prod.installationSelected].pourcentageProduction);
    return prod;
  }

  createFactory(name: string, json:JSON): Factory{
    console.log(json);
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
      , productionPossible: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Production possible"))
      , pl: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Production max"))
      , prod: Number(0)
    }
    factory.pourcentageProduction = Number(factory.production / factory.productionPossible);
    
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

  iDInstallationToName(n: number){
    for(var key of this.key_panel_factory){
        if (n == this.panel_factory[key].nIns){
          return this.panel_factory[key].id
        }
    }
  }

  getProductionProduitbyUsine(key_prod: string, key_ins: string, myproduct: Product): number{
    if (myproduct==null){return this.panel_produits[key_prod].productions[this.panel_produits[key_prod].installations.indexOf(key_ins)];}
    else{return myproduct.productions[myproduct.installations.indexOf(key_ins)]};
  }

  actualiserValeurProduit(key_prod: string, attribue: number, data:any){
    if(attribue == 1){this.panel_produits[key_prod].prix = data;}
    else if(attribue == 2){this.panel_produits[key_prod].rd = data;}
    else if(attribue == 3){this.panel_produits[key_prod].installationSelected = data;}
    else{
      attribue = data - this.panel_produits[key_prod].productionbyFactory;
      data = this.actuliserPoucentageProduction(this.panel_produits[key_prod].installationSelected, attribue, data);
      this.panel_produits[key_prod].productionbyFactory += Number(data[1]);
      this.panel_produits[key_prod].production += Number(data[1]); 
    }
    console.log(this.panel_produits[key_prod].productionbyFactory +' '+this.panel_produits[key_prod].production);
    this.panel_produits[key_prod].productionbyFactory=this.panel_produits[key_prod].productionbyFactory;
  }
  actuliserPoucentageProduction(key: string, variation:number, data:number): number[]{
    var val = this.panel_factory[key].production + variation;
    if (val <= this.panel_factory[key].productionPossible && val >= 0 ){
      this.panel_factory[key].production += variation;
      this.panel_factory[key].pourcentageProduction = this.panel_factory[key].production / this.panel_factory[key].productionPossible;
      return [data, variation];
    }else{
      return [0, 0];
    }
  }
}