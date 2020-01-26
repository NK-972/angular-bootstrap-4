import { Component, OnInit, Input } from '@angular/core';
import { InitService } from '../Services/init.service';
import { Router } from '@angular/router';
import { Server } from '../Interfaces/server';

@Component({
  selector: 'app-serveur',
  templateUrl: './serveur.component.html',
  styleUrls: ['./serveur.component.css']
})
export class ServeurComponent implements OnInit {
  @Input() key: string;
  server: Server;

  constructor(private initService: InitService, private router: Router) { }

  ngOnInit() {
  }

  connection(){
    console.log("connection to "+this.key);
    this.initService.signInServ(this.key).then(
      () => {
        console.log('Sign in successful!');
        this.router.navigate(['serveurs']);
      }
    );
  }

}