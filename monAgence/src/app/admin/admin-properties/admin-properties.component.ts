import { Component, OnInit } from '@angular/core';
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

  constructor(
        // pour l'init de la form
        private formBuilder: FormBuilder, //Reactive form
        private propertiesService : PropertiesService
  ) {}

  // Création de l'instance du formulaire
  propertiesForm: FormGroup; /// reactiveForm
  propertiesSubscription: Subscription;
  properties: Property[] = [];
  indexToRemove;
  indexToUpdate;
  editMode=false;


  ngOnInit(): void {
    this.initPropertiesForm();
    this.propertiesService.propertiesSubject.subscribe(
      (data) => {
        console.log(data);
        this.properties=data;
      }
    );
    this.propertiesService.emitProperties();
  }

  // Fonctionnement en mod template
  // onSubmitPropertiesForm(form: NgForm) {
  //     console.log(form.value);
  // }

  //initialisation de l'instance
 initPropertiesForm(){
   this.propertiesForm = this.formBuilder.group({
    title: ['',Validators.required],
    category: ['',Validators.required],
    surface: ['',Validators.required],
    rooms:['',Validators.required],
    description:'',
    price:['',Validators.required],
    sold:'false',
   });
 }

 resetForm(){
   this.propertiesForm.reset();
   this.editMode=false;
 }

  onSubmitPropertiesForm() {
    //console.log(this.propertiesForm.value);
    const newProperty: Property = {
     title: this.propertiesForm.get('title').value,
     category: this.propertiesForm.get('category').value,
     surface: this.propertiesForm.get('surface').value,
     rooms: this.propertiesForm.get('rooms').value,
     description: this.propertiesForm.get('description').value,
     price: this.propertiesForm.get('price').value,
     sold: this.propertiesForm.get('sold').value,
    }
    // ou
    //const newProperty: Property = this.propertiesForm.value;

    if (this.editMode) {
      this.propertiesService.updateProperty(newProperty,this.indexToUpdate);
    } else {
      this.propertiesService.createProperty(newProperty);
    }

    //console.log(this.properties);
    $('#propertiesFormModal').modal('hide');
  }

  onDeleteProperty(index){
      //console.log(this.properties[index]);
      $('#deletePropertyModal').modal('show');
      this.indexToRemove=index;

  }

  onConfirmDeleteProperty(){
      this.propertiesService.deleteProperty(this.indexToRemove);
      $('#deletePropertyModal').modal('hide');
  }

  onEditProperty(property){

    this.editMode=true;
    $('#propertiesFormModal').modal('show');
     this.propertiesForm.get('title').setValue(property.title);
     this.propertiesForm.get('category').setValue(property.category);
     this.propertiesForm.get('surface').setValue(property.surface);
     this.propertiesForm.get('rooms').setValue(property.rooms);
     this.propertiesForm.get('description').setValue(property.description);
     this.propertiesForm.get('price').setValue(property.price);
     this.propertiesForm.get('sold').setValue(property.sold);
     // Ici  on parcours le tableau properties ( récupéré grace à la subscription au service)
     // et on compare les éléments à celui passer en parametre
     // si les 2 éléments sont identiques on est sur le bon index
     const index = this.properties.findIndex(
      (propertyEl) => {
        if (propertyEl === property) {
          return true;
        }
      }
     );
     this.indexToUpdate=index;
  }



}
