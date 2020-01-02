import { Injectable } from '@angular/core';

@Injectable()
export class InitService {
  server_string : string ="[[Nom du serveur, Début, Nbr de tour, D des tours, Fin, Nombre de joueur, Etat], [astro, null, 0, 0, null, 3, 1]]";
  constructor() { }
  
}