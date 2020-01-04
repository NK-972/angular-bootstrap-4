import { Component, OnInit, Input } from '@angular/core';
import { InitService } from '../Services/init.service';
import { Server } from '../Interfaces/server';

@Component({
  selector: 'app-serveur',
  templateUrl: './serveur.component.html',
  styleUrls: ['./serveur.component.css']
})
export class ServeurComponent implements OnInit {
  @Input() key: string;
  server: Server;
  constructor(private initServer: InitService) { }

  ngOnInit() {
  }

}