import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nov-child-born',
  templateUrl: './child-born.component.html',
  styleUrls: ['./child-born.component.scss']
})
export class ChildBornComponent implements OnInit {

    // Shows or hides beggining pray
    isBeginHidden = true;
    // Shows or hides about this Novena
    isAboutHidden = true;

  constructor() { }

  ngOnInit() {
  }

}
