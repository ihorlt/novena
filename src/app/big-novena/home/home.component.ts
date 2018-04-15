import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nov-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Shows or hides beggining pray
  isBeginHidden = true;
  // Shows or hides about this Novena
  isAboutHidden = true;

  constructor() { }

  ngOnInit() {
  }

}
