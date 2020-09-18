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

  photoUploading = false;
  photoUploded = false;
  photosAdded: any[] = [];

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
    newProperty.photos = this.photosAdded ? this.photosAdded : [];
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
    this.photosAdded = [];
  }

  onEditProperty(property: Property) {
    $('#propertiesFormModal').modal('show');
    this.propertiesForm.get('title').setValue(property.title);
    this.propertiesForm.get('category').setValue(property.category);
    this.propertiesForm.get('description').setValue(property.description ? property.description : '');
    this.propertiesForm.get('surface').setValue(property.surface);
    this.propertiesForm.get('rooms').setValue(property.rooms);
    this.propertiesForm.get('price').setValue(property.price);
    this.propertiesForm.get('sold').setValue(property.sold ? property.sold : false);
    this.photosAdded = property.photos ? property.photos : [];
    // this.propertiesForm.get('photo').setValue(property.photo);
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

  onUploadFile(event) {
    this.photoUploading = true;

    this.propService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        // if (this.photoUrl && this.photoUrl !== '') {
        //   this.propService.removeFile(this.photoUrl);
        // }
        this.photosAdded.push(url);
        this.photoUploading = false;
        this.photoUploded = true;
        // console.log(url);
        setTimeout( () => {
          this.photoUploded = false;
        }, 5000);
      }
    );
  }

  onDeleteProperty(index) {
    $('#deletePropertyModal').modal('show');
    this.indexToRemove = index;
  }

  onConfirmDeleteProperty() {
    // if (this.properties[this.indexToRemove].photo && this.properties[this.indexToRemove].photo !== '') {
    //   this.propService.removeFile(this.properties[this.indexToRemove].photo);
    // }
    this.properties[this.indexToRemove].photos.forEach(
      (photo) => {
        this.propService.removeFile(photo);
      }
    );
    this.propService.deleteProperty(this.indexToRemove);
    $('#deletePropertyModal').modal('hide');
  }

  onRemoveAddedPhoto(index) {
      this.propService.removeFile(this.photosAdded[index]);
      this.photosAdded.splice(index, 1 );
  }
}
