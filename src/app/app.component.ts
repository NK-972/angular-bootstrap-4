import { Component } from '@angular/core';
import { CenterService } from './Services/center.service';
//
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private centerService: CenterService){}
}