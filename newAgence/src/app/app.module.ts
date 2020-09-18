import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AdminPropertiesComponent } from './admin/admin-properties/admin-properties.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SinglePropertyComponent } from './single-property/single-property.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AdminPropertiesComponent,
    AdminDashboardComponent,
    SigninComponent,
    SinglePropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
