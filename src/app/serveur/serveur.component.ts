import { Component, OnInit } from '@angular/core';
import { InitService } from '../Services/init.service'

@Component({
  selector: 'app-serveur',
  templateUrl: './serveur.component.html',
  styleUrls: ['./serveur.component.css']
})
export class ServeurComponent implements OnInit {
  server_json: JSON;
  constructor(private initServer: InitService) { }

  ngOnInit() {
    this.initServer
  }

}