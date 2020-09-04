import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertiesService } from 'src/app/services/properties.service';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {

  public propertiesForm: FormGroup;
  public propertiesSubscription: Subscription;
  properties: Property[] = [];
  indexToRemove;
  indexToUpdate;
  editMode = false;


  constructor(private formBuilder: FormBuilder, private propService: PropertiesService) { }


  ngOnInit() {
    // Formulaire avec la methode reactive
    // console.log('Ngoninit');
    this.initPropertiesForm();
    this.propService.propertiesSubject.subscribe(
      (data: Property[]) => {
        // console.log(data);
        this.properties = data;
      }
    );
    this.propService.getProperties();
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
      price: ['', Validators.required],
      sold: ''
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
    // const newProperty: Property = this.propertiesForm.value;
    // ou plutot avec un objet JSON
    const newProperty: Property = {
      title: this.propertiesForm.get('title').value,
      category: this.propertiesForm.get('category').value,
      description: this.propertiesForm.get('description').value,
      surface: this.propertiesForm.get('surface').value,
      rooms: this.propertiesForm.get('rooms').value,
      price: this.propertiesForm.get('price').value,
      sold: this.propertiesForm.get('sold').value
    };
    if (this.editMode) {
      this.propService.updateProperty(newProperty, this.indexToUpdate);
    } else {
      this.propService.createProperty(newProperty);
    }

    $('#propertiesFormModal').modal('hide');
  }

  resetForm() {
    this.propertiesForm.reset();
    this.editMode = false;
  }

  onEditProperty(property: Property) {
    $('#propertiesFormModal').modal('show');
    this.propertiesForm.get('title').setValue(property.title);
    this.propertiesForm.get('category').setValue(property.category);
    this.propertiesForm.get('description').setValue(property.description);
    this.propertiesForm.get('surface').setValue(property.surface);
    this.propertiesForm.get('rooms').setValue(property.rooms);
    this.propertiesForm.get('price').setValue(property.price);
    this.propertiesForm.get('sold').setValue(property.sold);
    const index = this.properties.findIndex(
      (propertyEL) => {
        if (propertyEL === property) {
          return true;
        }
      }
    );
    this.editMode = true;
    this.indexToUpdate = index;
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
