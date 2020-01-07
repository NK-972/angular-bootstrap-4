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
 /* Marché du travail */
  string_marche: string = "[[id -$nc$, employeur -$nc$, prenom/nom, personnalité, moral, bonus -$nc$, valeur bonus -$nc$, installations  -$e$, formations/spécialités, salaire -$e$, prime -$e$, durée du contrat -$e$, temps restant, etat -$nc$, hide], [3, 1, augie burry, déprésif, 0.04, null, 0, null, null, 1350, 0, 40, 20, 0, true], [5, 1, arlan falco, déprésif, 0.93, null, 0, null, null, 1350, 0, 40, 20, 0, true], [10, 1, aubrie sollam, joyeux, 0.18, null, 0, null, null, 1350, 0, 40, 20, 0, true], [11, 1, agnes raiston, déprésif, 0.23, null, 0, null, null, 1350, 0, 40, 20, 0, true], [15, 1, alic bernaert, joyeux, 0.6, null, 0, null, null, 1350, 0, 40, 20, 0, true], [19, 1, arturo naisbet, ambitieux, 0.82, null, 0, null, null, 1350, 0, 40, 20, 0, true], [20, 1, anet thelwll, déprésif, 0.75, null, 0, null, null, 1350, 0, 40, 20, 0, true], [24, 1, abbot barlthrop, joyeux, 0.41, null, 0, null, null, 1350, 0, 40, 20, 0, true], [26, 1, arabelle bordessa, ambitieux, 0.04, null, 0, null, null, 1350, 0, 40, 20, 0, true], [30, 1, agnes gabb, ambitieux, 0.06, null, 0, null, null, 1350, 0, 40, 20, 0, true], [31, 1, anjanette haffner, déprésif, 0.14, null, 0, null, null, 1350, 0, 40, 20, 0, true], [35, 1, angela jaslem, déprésif, 0.92, null, 0, null, null, 1350, 0, 40, 20, 0, true], [36, 1, adolpho farbrother, joyeux, 0.29, null, 0, null, null, 1350, 0, 40, 20, 0, true], [37, 1, alexia winchcombe, déprésif, 0.77, null, 0, null, null, 1350, 0, 40, 20, 0, true], [41, 1, alfie jammet, déprésif, 0.12, null, 0, null, null, 1350, 0, 40, 20, 0, true], [47, 1, aindrea fassbindler, joyeux, 0.58, null, 0, null, null, 1350, 0, 40, 20, 0, true], [52, 1, abram sextie, joyeux, 0.71, null, 0, null, null, 1350, 0, 40, 20, 0, true], [57, 1, ara shearwood, déterminé, 0.77, null, 0, null, null, 1350, 0, 40, 20, 0, true], [58, 1, amela gentry, déprésif, 0.68, null, 0, null, null, 1350, 0, 40, 20, 0, true], [60, 1, anderson justham, déterminé, 0.11, null, 0, null, null, 1350, 0, 40, 20, 0, true], [63, 1, augie burry, déprésif, 0.04, null, 0, Entrepôt n°1, null, 1350, 0, 39, 20, 1, true], [65, 1, arlan falco, déprésif, 0.93, null, 0, Entrepôt n°1, null, 1350, 0, 39, 20, 1, true], [70, 1, aubrie sollam, joyeux, 0.18, null, 0, Entrepôt n°1, null, 1350, 0, 39, 20, 1, true], [71, 1, agnes raiston, déprésif, 0.23, null, 0, Usine n°1, null, 1350, 0, 39, 20, 1, true], [75, 1, alic bernaert, joyeux, 0.6, null, 0, Usine n°1, null, 1350, 0, 39, 20, 1, true], [79, 1, arturo naisbet, ambitieux, 0.82, null, 0, Entrepôt n°1, null, 1350, 0, 39, 20, 1, true], [80, 1, anet thelwll, déprésif, 0.75, null, 0, Usine n°1, null, 1350, 0, 39, 20, 1, true], [84, 1, abbot barlthrop, joyeux, 0.41, null, 0, Usine n°1, null, 1350, 0, 39, 20, 1, true], [86, 1, arabelle bordessa, ambitieux, 0.04, null, 0, Entrepôt n°1, null, 1350, 0, 39, 20, 1, true], [90, 1, agnes gabb, ambitieux, 0.06, null, 0, Usine n°1, null, 1350, 0, 39, 20, 1, true], [91, 1, anjanette haffner, déprésif, 0.14, null, 0, Usine n°1, null, 1350, 0, 39, 20, 1, true], [95, 1, angela jaslem, déprésif, 0.92, null, 0, Usine n°1, null, 1350, 0, 39, 20, 1, true], [96, 1, adolpho farbrother, joyeux, 0.29, null, 0, Usine n°1, null, 1350, 0, 39, 20, 1, true], [97, 1, alexia winchcombe, déprésif, 0.77, null, 0, Usine n°1, null, 1350, 0, 39, 20, 1, true], [101, 1, alfie jammet, déprésif, 0.12, null, 0, Usine n°1, null, 1350, 0, 39, 20, 1, true], [107, 1, aindrea fassbindler, joyeux, 0.58, null, 0, Usine n°1, null, 1350, 0, 39, 20, 1, true], [112, 1, abram sextie, joyeux, 0.71, null, 0, Usine n°1, null, 1350, 0, 39, 20, 1, true], [117, 1, ara shearwood, déterminé, 0.77, null, 0, Usine n°1, null, 1350, 0, 39, 20, 1, true], [118, 1, amela gentry, déprésif, 0.68, null, 0, Usine n°1, null, 1350, 0, 39, 20, 1, true], [120, 1, anderson justham, déterminé, 0.11, null, 0, Usine n°1, null, 1350, 0, 39, 20, 1, true], [124, 1, abbot barlthrop, joyeux, 0.41, null, 0, Usine n°1, null, 1350, 0, 38, 20, 1, true], [125, 1, abram sextie, joyeux, 0.71, null, 0, Usine n°1, null, 1350, 0, 38, 20, 1, true], [126, 1, adolpho farbrother, joyeux, 0.29, null, 0, Usine n°1, null, 1350, 0, 38, 20, 1, true], [127, 1, agnes gabb, ambitieux, 0.06, null, 0, Usine n°1, null, 1350, 0, 38, 20, 1, true], [128, 1, agnes raiston, déprésif, 0.23, null, 0, Usine n°1, null, 1350, 0, 38, 20, 1, true], [129, 1, aindrea fassbindler, joyeux, 0.58, null, 0, Usine n°1, null, 1350, 0, 38, 20, 1, true], [130, 1, alexia winchcombe, déprésif, 0.77, null, 0, Usine n°1, null, 1350, 0, 38, 20, 1, true], [131, 1, alfie jammet, déprésif, 0.12, null, 0, Usine n°1, null, 1350, 0, 38, 20, 1, true], [132, 1, alic bernaert, joyeux, 0.6, null, 0, Usine n°1, null, 1350, 0, 38, 20, 1, true], [133, 1, amela gentry, déprésif, 0.68, null, 0, Usine n°1, null, 1350, 0, 38, 20, 1, true], [134, 1, anderson justham, déterminé, 0.11, null, 0, Usine n°1, null, 1350, 0, 38, 20, 1, true], [135, 1, anet thelwll, déprésif, 0.75, null, 0, Usine n°1, null, 1350, 0, 38, 20, 1, true], [136, 1, angela jaslem, déprésif, 0.92, null, 0, Usine n°1, null, 1350, 0, 38, 20, 1, true], [137, 1, anjanette haffner, déprésif, 0.14, null, 0, Usine n°1, null, 1350, 0, 38, 20, 1, true], [138, 1, ara shearwood, déterminé, 0.77, null, 0, Usine n°1, null, 1350, 0, 38, 20, 1, true], [139, 1, arabelle bordessa, ambitieux, 0.04, null, 0, Entrepôt n°1, null, 1350, 0, 38, 20, 1, true], [140, 1, arlan falco, déprésif, 0.93, null, 0, Entrepôt n°1, null, 1350, 0, 38, 20, 1, true], [141, 1, arturo naisbet, ambitieux, 0.82, null, 0, Entrepôt n°1, null, 1350, 0, 38, 20, 1, true], [142, 1, aubrie sollam, joyeux, 0.18, null, 0, Entrepôt n°1, null, 1350, 0, 38, 20, 1, true], [143, 1, augie burry, déprésif, 0.04, null, 0, Entrepôt n°1, null, 1350, 0, 38, 20, 1, true], [187, null, brandise crigin, ambitieux, 0.76, null, 0, null, null, 1350, 0, 40, 20, 0, false], [189, null, bradley hammond, déterminé, 0.1, null, 0, null, null, 1350, 0, 40, 20, 0, false], [190, null, macon lancaster, déprésif, 0.91, null, 0, null, null, 1350, 0, 40, 20, 0, false], [191, null, fulton bentley, ambitieux, 0.11, null, 0, null, null, 1350, 0, 40, 20, 0, false], [192, null, berte giacomasso, joyeux, 0.53, null, 0, null, null, 1350, 0, 40, 20, 0, false], [193, null, conan bauer, déterminé, 0.14, null, 0, null, null, 1350, 0, 40, 20, 0, false], [194, null, brnaba cowdrey, ambitieux, 0.26, null, 0, null, null, 1350, 0, 40, 20, 0, false], [196, null, kellie cooke, joyeux, 0.54, null, 0, null, null, 1350, 0, 40, 20, 0, false], [200, null, blake o'nowlan, ambitieux, 0.43, null, 0, null, null, 1350, 0, 40, 20, 0, false], [201, null, ulric weeks, ambitieux, 0.93, null, 0, null, null, 1350, 0, 40, 20, 0, false], [202, null, camila rawkesby, déterminé, 0, null, 0, null, null, 1350, 0, 40, 20, 0, false], [203, null, brock yakuntsov, ambitieux, 0.17, null, 0, null, null, 1350, 0, 40, 20, 0, false], [204, null, britteny ghelardi, déterminé, 0.23, null, 0, null, null, 1350, 0, 40, 20, 0, false], [206, null, colorado carrillo, joyeux, 0.53, null, 0, null, null, 1350, 0, 40, 20, 0, false], [207, null, burtie keppie, joyeux, 0.02, null, 0, null, null, 1350, 0, 40, 20, 0, false], [208, null, pascale valencia, joyeux, 0.34, null, 0, null, null, 1350, 0, 40, 20, 0, false], [209, null, jasmine chase, déprésif, 0.54, null, 0, null, null, 1350, 0, 40, 20, 0, false], [210, null, ave ennor, déprésif, 0.58, null, 0, null, null, 1350, 0, 40, 20, 0, false], [211, null, bentlee wincott, ambitieux, 0.71, null, 0, null, null, 1350, 0, 40, 20, 0, false], [212, null, beck hailes, déterminé, 0.33, null, 0, null, null, 1350, 0, 40, 20, 0, false], [213, null, colorado riddle, déprésif, 0.86, null, 0, null, null, 1350, 0, 40, 20, 0, false], [214, null, berty tomasino, déprésif, 0.8, null, 0, null, null, 1350, 0, 40, 20, 0, false], [215, null, bastian monte, déterminé, 0.29, null, 0, null, null, 1350, 0, 40, 20, 0, false], [218, null, clarke pearson, déprésif, 0.62, null, 0, null, null, 1350, 0, 40, 20, 0, false], [219, null, xaviera pope, joyeux, 0.5, null, 0, null, null, 1350, 0, 40, 20, 0, false], [220, null, byrle pargeter, ambitieux, 0.8, null, 0, null, null, 1350, 0, 40, 20, 0, false], [221, null, barrett pace, déterminé, 0.98, null, 0, null, null, 1350, 0, 40, 20, 0, false], [223, null, auguste domek, déterminé, 0.52, null, 0, null, null, 1350, 0, 40, 20, 0, false], [224, null, kyle craft, déprésif, 0.24, null, 0, null, null, 1350, 0, 40, 20, 0, false], [226, null, brear redfield, déterminé, 0.08, null, 0, null, null, 1350, 0, 40, 20, 0, false], [227, null, auguste domek, déterminé, 0.52, null, 0, null, null, 1350, 0, 40, 19, 0, false], [228, null, ave ennor, déprésif, 0.58, null, 0, null, null, 1350, 0, 40, 19, 0, false], [229, null, barrett pace, déterminé, 0.98, null, 0, null, null, 1350, 0, 40, 19, 0, false], [230, null, bastian monte, déterminé, 0.29, null, 0, null, null, 1350, 0, 40, 19, 0, false], [231, null, beck hailes, déterminé, 0.33, null, 0, null, null, 1350, 0, 40, 19, 0, false], [232, null, bentlee wincott, ambitieux, 0.71, null, 0, null, null, 1350, 0, 40, 19, 0, false], [233, null, berte giacomasso, joyeux, 0.53, null, 0, null, null, 1350, 0, 40, 19, 0, false], [234, null, berty tomasino, déprésif, 0.8, null, 0, null, null, 1350, 0, 40, 19, 0, false], [235, null, blake o'nowlan, ambitieux, 0.43, null, 0, null, null, 1350, 0, 40, 19, 0, false], [236, null, bradley hammond, déterminé, 0.1, null, 0, null, null, 1350, 0, 40, 19, 0, false], [237, null, brandise crigin, ambitieux, 0.76, null, 0, null, null, 1350, 0, 40, 19, 0, false], [238, null, brear redfield, déterminé, 0.08, null, 0, null, null, 1350, 0, 40, 19, 0, false], [239, null, britteny ghelardi, déterminé, 0.23, null, 0, null, null, 1350, 0, 40, 19, 0, false], [240, null, brnaba cowdrey, ambitieux, 0.26, null, 0, null, null, 1350, 0, 40, 19, 0, false], [241, null, brock yakuntsov, ambitieux, 0.17, null, 0, null, null, 1350, 0, 40, 19, 0, false], [242, null, burtie keppie, joyeux, 0.02, null, 0, null, null, 1350, 0, 40, 19, 0, false], [243, null, byrle pargeter, ambitieux, 0.8, null, 0, null, null, 1350, 0, 40, 19, 0, false], [244, null, camila rawkesby, déterminé, 0, null, 0, null, null, 1350, 0, 40, 19, 0, false], [245, null, clarke pearson, déprésif, 0.62, null, 0, null, null, 1350, 0, 40, 19, 0, false], [246, null, colorado carrillo, joyeux, 0.53, null, 0, null, null, 1350, 0, 40, 19, 0, false], [247, null, colorado riddle, déprésif, 0.86, null, 0, null, null, 1350, 0, 40, 19, 0, false], [248, null, conan bauer, déterminé, 0.14, null, 0, null, null, 1350, 0, 40, 19, 0, false], [249, null, fulton bentley, ambitieux, 0.11, null, 0, null, null, 1350, 0, 40, 19, 0, false], [250, null, jasmine chase, déprésif, 0.54, null, 0, null, null, 1350, 0, 40, 19, 0, false], [251, null, kellie cooke, joyeux, 0.54, null, 0, null, null, 1350, 0, 40, 19, 0, false], [252, null, kyle craft, déprésif, 0.24, null, 0, null, null, 1350, 0, 40, 19, 0, false], [253, null, macon lancaster, déprésif, 0.91, null, 0, null, null, 1350, 0, 40, 19, 0, false], [254, null, pascale valencia, joyeux, 0.34, null, 0, null, null, 1350, 0, 40, 19, 0, false], [255, null, ulric weeks, ambitieux, 0.93, null, 0, null, null, 1350, 0, 40, 19, 0, false], [256, null, xaviera pope, joyeux, 0.5, null, 0, null, null, 1350, 0, 40, 19, 0, false], [257, 1, abbot barlthrop, joyeux, 0.41, null, 0, Usine n°1, null, 1350, 0, 37, 20, 1, true], [258, 1, abram sextie, joyeux, 0.71, null, 0, Usine n°1, null, 1350, 0, 37, 20, 1, true], [259, 1, adolpho farbrother, joyeux, 0.29, null, 0, Usine n°1, null, 1350, 0, 37, 20, 1, true], [260, 1, agnes gabb, ambitieux, 0.06, null, 0, Usine n°1, null, 1350, 0, 37, 20, 1, true], [261, 1, agnes raiston, déprésif, 0.23, null, 0, Usine n°1, null, 1350, 0, 37, 20, 1, true], [262, 1, aindrea fassbindler, joyeux, 0.58, null, 0, Usine n°1, null, 1350, 0, 37, 20, 1, true], [263, 1, alexia winchcombe, déprésif, 0.77, null, 0, Usine n°1, null, 1350, 0, 37, 20, 1, true], [264, 1, alfie jammet, déprésif, 0.12, null, 0, Usine n°1, null, 1350, 0, 37, 20, 1, true], [265, 1, alic bernaert, joyeux, 0.6, null, 0, Usine n°1, null, 1350, 0, 37, 20, 1, true], [266, 1, amela gentry, déprésif, 0.68, null, 0, Usine n°1, null, 1350, 0, 37, 20, 1, true], [267, 1, anderson justham, déterminé, 0.11, null, 0, Usine n°1, null, 1350, 0, 37, 20, 1, true], [268, 1, anet thelwll, déprésif, 0.75, null, 0, Usine n°1, null, 1350, 0, 37, 20, 1, true], [269, 1, angela jaslem, déprésif, 0.92, null, 0, Usine n°1, null, 1350, 0, 37, 20, 1, true], [270, 1, anjanette haffner, déprésif, 0.14, null, 0, Usine n°1, null, 1350, 0, 37, 20, 1, true], [271, 1, ara shearwood, déterminé, 0.77, null, 0, Usine n°1, null, 1350, 0, 37, 20, 1, true], [272, 1, arabelle bordessa, ambitieux, 0.04, null, 0, Entrepôt n°1, null, 1350, 0, 37, 20, 1, true], [273, 1, arlan falco, déprésif, 0.93, null, 0, Entrepôt n°1, null, 1350, 0, 37, 20, 1, true], [274, 1, arturo naisbet, ambitieux, 0.82, null, 0, Entrepôt n°1, null, 1350, 0, 37, 20, 1, true], [275, 1, aubrie sollam, joyeux, 0.18, null, 0, Entrepôt n°1, null, 1350, 0, 37, 20, 1, true], [276, 1, augie burry, déprésif, 0.04, null, 0, Entrepôt n°1, null, 1350, 0, 37, 20, 1, true], [354, null, auguste domek, déterminé, 0.52, null, 0, null, null, 1350, 0, 40, 18, 0, false], [355, null, ave ennor, déprésif, 0.58, null, 0, null, null, 1350, 0, 40, 18, 0, false], [356, null, barrett pace, déterminé, 0.98, null, 0, null, null, 1350, 0, 40, 18, 0, false], [357, null, bastian monte, déterminé, 0.29, null, 0, null, null, 1350, 0, 40, 18, 0, false], [358, null, beck hailes, déterminé, 0.33, null, 0, null, null, 1350, 0, 40, 18, 0, false], [359, null, bentlee wincott, ambitieux, 0.71, null, 0, null, null, 1350, 0, 40, 18, 0, false], [360, null, berte giacomasso, joyeux, 0.53, null, 0, null, null, 1350, 0, 40, 18, 0, false], [361, null, berty tomasino, déprésif, 0.8, null, 0, null, null, 1350, 0, 40, 18, 0, false], [362, null, blake o'nowlan, ambitieux, 0.43, null, 0, null, null, 1350, 0, 40, 18, 0, false], [363, null, bradley hammond, déterminé, 0.1, null, 0, null, null, 1350, 0, 40, 18, 0, false], [364, null, brandise crigin, ambitieux, 0.76, null, 0, null, null, 1350, 0, 40, 18, 0, false], [365, null, brear redfield, déterminé, 0.08, null, 0, null, null, 1350, 0, 40, 18, 0, false], [366, null, britteny ghelardi, déterminé, 0.23, null, 0, null, null, 1350, 0, 40, 18, 0, false], [367, null, brnaba cowdrey, ambitieux, 0.26, null, 0, null, null, 1350, 0, 40, 18, 0, false], [368, null, brock yakuntsov, ambitieux, 0.17, null, 0, null, null, 1350, 0, 40, 18, 0, false], [369, null, burtie keppie, joyeux, 0.02, null, 0, null, null, 1350, 0, 40, 18, 0, false], [370, null, byrle pargeter, ambitieux, 0.8, null, 0, null, null, 1350, 0, 40, 18, 0, false], [371, null, camila rawkesby, déterminé, 0, null, 0, null, null, 1350, 0, 40, 18, 0, false], [372, null, clarke pearson, déprésif, 0.62, null, 0, null, null, 1350, 0, 40, 18, 0, false], [373, null, colorado carrillo, joyeux, 0.53, null, 0, null, null, 1350, 0, 40, 18, 0, false], [374, null, colorado riddle, déprésif, 0.86, null, 0, null, null, 1350, 0, 40, 18, 0, false], [375, null, conan bauer, déterminé, 0.14, null, 0, null, null, 1350, 0, 40, 18, 0, false], [376, null, fulton bentley, ambitieux, 0.11, null, 0, null, null, 1350, 0, 40, 18, 0, false], [377, null, jasmine chase, déprésif, 0.54, null, 0, null, null, 1350, 0, 40, 18, 0, false], [378, null, kellie cooke, joyeux, 0.54, null, 0, null, null, 1350, 0, 40, 18, 0, false], [379, null, kyle craft, déprésif, 0.24, null, 0, null, null, 1350, 0, 40, 18, 0, false], [380, null, macon lancaster, déprésif, 0.91, null, 0, null, null, 1350, 0, 40, 18, 0, false], [381, null, pascale valencia, joyeux, 0.34, null, 0, null, null, 1350, 0, 40, 18, 0, false], [382, null, ulric weeks, ambitieux, 0.93, null, 0, null, null, 1350, 0, 40, 18, 0, false], [383, null, xaviera pope, joyeux, 0.5, null, 0, null, null, 1350, 0, 40, 18, 0, false], [384, 1, abbot barlthrop, joyeux, 0.41, null, 0, Usine n°1, null, 1350, 0, 36, 20, 1, true], [385, 1, abram sextie, joyeux, 0.71, null, 0, Usine n°1, null, 1350, 0, 36, 20, 1, true], [386, 1, adolpho farbrother, joyeux, 0.29, null, 0, Usine n°1, null, 1350, 0, 36, 20, 1, true], [387, 1, agnes gabb, ambitieux, 0.06, null, 0, Usine n°1, null, 1350, 0, 36, 20, 1, true], [388, 1, agnes raiston, déprésif, 0.23, null, 0, Usine n°1, null, 1350, 0, 36, 20, 1, true], [389, 1, aindrea fassbindler, joyeux, 0.58, null, 0, Usine n°1, null, 1350, 0, 36, 20, 1, true], [390, 1, alexia winchcombe, déprésif, 0.77, null, 0, Usine n°1, null, 1350, 0, 36, 20, 1, true], [391, 1, alfie jammet, déprésif, 0.12, null, 0, Usine n°1, null, 1350, 0, 36, 20, 1, true], [392, 1, alic bernaert, joyeux, 0.6, null, 0, Usine n°1, null, 1350, 0, 36, 20, 1, true], [393, 1, amela gentry, déprésif, 0.68, null, 0, Usine n°1, null, 1350, 0, 36, 20, 1, true], [394, 1, anderson justham, déterminé, 0.11, null, 0, Usine n°1, null, 1350, 0, 36, 20, 1, true], [395, 1, anet thelwll, déprésif, 0.75, null, 0, Usine n°1, null, 1350, 0, 36, 20, 1, true], [396, 1, angela jaslem, déprésif, 0.92, null, 0, Usine n°1, null, 1350, 0, 36, 20, 1, true], [397, 1, anjanette haffner, déprésif, 0.14, null, 0, Usine n°1, null, 1350, 0, 36, 20, 1, true], [398, 1, ara shearwood, déterminé, 0.77, null, 0, Usine n°1, null, 1350, 0, 36, 20, 1, true], [399, 1, arabelle bordessa, ambitieux, 0.04, null, 0, Entrepôt n°1, null, 1350, 0, 36, 20, 1, true], [400, 1, arlan falco, déprésif, 0.93, null, 0, Entrepôt n°1, null, 1350, 0, 36, 20, 1, true], [401, 1, arturo naisbet, ambitieux, 0.82, null, 0, Entrepôt n°1, null, 1350, 0, 36, 20, 1, true], [402, 1, aubrie sollam, joyeux, 0.18, null, 0, Entrepôt n°1, null, 1350, 0, 36, 20, 1, true], [403, 1, augie burry, déprésif, 0.04, null, 0, Entrepôt n°1, null, 1350, 0, 36, 20, 1, true]]";
  table_marche = [];
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
    /* */
    this.table_marche = this.utilitaire.createTableRow(this.string_marche);
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
      , productionPossible: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Production possible"))
      , pl: Number(this.utilitaire.getData(json, name, "_"+this.turn, "Production max"))
      , prod: Number(0)
    }
    factory.pourcentageProduction = factory.production / factory.productionPossible;
    
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
    if(attribue == 0){this.panel_produits[key_prod].prix = data;}
    else if(attribue == 1){this.panel_produits[key_prod].rd = data;}
    else if(attribue == 2){this.panel_produits[key_prod].installationSelected = data;}
    else{
      attribue = data - this.panel_produits[key_prod];
      this.panel_produits[key_prod].productionbyFactory = data;
      this.panel_produits[key_prod].production += attribue; 
      this.actuliserPoucentageProduction("Usine n°1", attribue);
      }  
  }
  actuliserPoucentageProduction(key: string, variation:Number){
    this.panel_factory[key].production = this.panel_factory[key].production + variation;
    this.panel_factory[key].pourcentageProduction = this.panel_factory[key].production / this.panel_factory[key].productionPossible;
    for (var k in this.panel_produits){
      if (this.panel_produits[k].installationSelected == key){
        this.panel_produits[k].pourcentageProduction = this.panel_factory[key].pourcentageProduction;
      }
    }
  }
}