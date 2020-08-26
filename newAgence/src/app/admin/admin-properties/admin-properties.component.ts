import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {

  public propertiesForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    // Formulaire avec la methode reactive
    this.initPropertiesForm();
  }

  // Formulaire avec la methode reactive
  initPropertiesForm() {
    this.propertiesForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: '',
      price: ['', Validators.required]
    });
  }

  // Si on code le formulaire avec Template
  // onSubmitPropertiesForm(form: NgForm) {
  //   console.log(form.value);
  //   // methode template ngForm
  //   const theTitle = form.value['title'];
  //   console.log(theTitle);
  // }

  // Formulaire avec la methode reactive
  onSubmitPropertiesForm() {
    console.log(this.propertiesForm.value);
  }

}
