import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InitService } from '../Services/init.service'

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  constructor(private initService: InitService, private router: Router) { }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.initService.signIn().then(
      () => {
        console.log('Sign in successful!');
        this.router.navigate(['serveurs']);
      }
    );
  }
  onSignOut() {
    this.initService.signOut();
  }

  ngOnInit() {
  }

}