import { Injectable } from '@angular/core';
import { Server } from '../Interfaces/server';
import { Utilitaire } from '../../utilitaire';

@Injectable()
export class InitService {
  server_string : string ="[[Nom du serveur, Début, Nbr de tour, D des tours, Fin, Nombre de joueur, Etat], [astro, null, 0, 0, null, 3, 1]]";
  panel_server: JSON;
  key_server: string[];
  utilitaire: Utilitaire = new Utilitaire();
  constructor() {
    var JSONQury = {};
    this.panel_server = this.utilitaire.StringToTable(this.server_string);
    this.key_server = Object.keys(this.panel_server);
    for (var key of this.key_server) {
      this.panel_server[key] = this.createServer(key, this.panel_server);
    }
    console.log(this.panel_server);
   }
  

  createServer(name: string, json:JSON): Server{
    let server: Server = {
      id: name
      , debut: ''
      , nbrTourMax: Number(0)
      , Dtours: Number(0)
      , Fin: ''
      , nbrJoueur: Number(0)
      , Etat: ''
    }
    return server;
  }
}