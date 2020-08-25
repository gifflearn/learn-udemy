import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Ma super agence' ;
  isDisabled = false;
  dateNow = new Date();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.isDisabled =! this.isDisabled;
  }

}
