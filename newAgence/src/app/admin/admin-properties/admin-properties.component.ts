import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { NgForm, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {

  public propertiesForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

  initPropertiesForm() {
    this.propertiesForm = 
  }
  onSubmitPropertiesForm(form: NgForm) {
    console.log(form.value);
    // methode template ngForm
    const theTitle = form.value['title'];
    console.log(theTitle);
  }

}
