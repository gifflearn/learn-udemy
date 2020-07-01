import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'newAgence';

  sold = false;

  properties = [
    {title : 'Ma super Maison',
    category: 'Maison',
    sold: true},
    {title : 'Petit Appartement',
    category: 'Appartement',
    sold: false},
    {title : 'Belle villa',
    category: 'Maison',
    sold: true}
  ];

  getSoldValue() {
    if (this.sold) {
      return 'red';
    } else {
      return  'green';
    }
  }
}
