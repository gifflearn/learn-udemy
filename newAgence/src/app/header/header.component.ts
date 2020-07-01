import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Ma Super Agence';
  IsDisabled = false;

  constructor() { }

  ngOnInit() {
  }

  OnClick() {
    if (this.IsDisabled === false) {this.IsDisabled = true; } else {this.IsDisabled = false; }
  }

}
