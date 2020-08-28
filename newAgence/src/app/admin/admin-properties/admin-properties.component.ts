import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertiesService } from 'src/app/services/properties.service';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {

  public propertiesForm: FormGroup;
  public propertiesSubscription: Subscription;
  properties: any[] = [];
  indexToRemove;

  constructor(private formBuilder: FormBuilder, private propService: PropertiesService) { }


  ngOnInit() {
    // Formulaire avec la methode reactive
    // console.log('Ngoninit');
    this.initPropertiesForm();
    this.propService.propertiesSubject.subscribe(
      (data) => {
        // console.log(data);
        this.properties = data;
      }
    );
    this.propService.emitProperties();
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
    // console.log(this.propertiesForm.value);
    const newProperty = this.propertiesForm.value;
    this.propService.createProperty(newProperty);
    $('#propertiesFormModal').modal('hide');
  }

  resetForm() {
    this.propertiesForm.reset();
  }

  onEditProperty() {

  }

  onDeleteProperty(index) {
    $('#deletePropertyModal').modal('show');
    this.indexToRemove = index;
  }

  onConfirmDeleteProperty() {
    this.propService.deleteProperty(this.indexToRemove);
    $('#deletePropertyModal').modal('hide');
  }
}
