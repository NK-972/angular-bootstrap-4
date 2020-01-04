import { Injectable } from '@angular/core';
import { Server } from '../Interfaces/server';
import { Utilitaire } from '../../utilitaire';

@Injectable()
export class InitService {
  server_string : string ="[[JSON, Nom du serveur, Début, Nbr de tour, D des tours, Fin, Nombre de joueur, Etat], [astro, astro, null, 0, 0, null, 3, 1]]";
  json_server: JSON;
  panel_server: JSON;
  key_server: string[];
  utilitaire: Utilitaire = new Utilitaire();
  constructor() {
    var JSONQury = {};
    this.json_server = this.utilitaire.StringToTable(this.server_string);
    this.key_server = Object.keys(this.json_server);
    //console.log(this.json_server);
    for (var key of this.key_server) {
      if(!key.includes('JSON')){
        JSONQury[key] = this.createServer(key, this.json_server);  
      }
    }
    this.panel_server = JSONQury as JSON;
    this.key_server = Object.keys(this.panel_server);
    console.log(this.panel_server);
   }
  

  createServer(name: string, json:JSON): Server{
    let server: Server = {
      id: name
      , debut: this.utilitaire.getData(json, name, '', 'Début')
      , nbrTourMax: Number(this.utilitaire.getData(json, name, '', 'Nbr de tour'))
      , Dtours: Number(this.utilitaire.getData(json, name, '', 'D des tours'))
      , Fin: this.utilitaire.getData(json, name, '', 'Fin')
      , nbrJoueur: Number(this.utilitaire.getData(json, name, '', 'Nombre de joueur'))
      , Etat: this.utilitaire.getData(json, name, '', 'Etat')
    }
    return server;
  }
}
