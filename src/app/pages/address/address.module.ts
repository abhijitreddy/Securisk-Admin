import { AddressRoutingModule } from './address-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent, AddressActionComponent } from './address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';



@NgModule({
  declarations: [
    AddressComponent,
    AddressActionComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    AngularFirestoreModule
  ]
})
export class AddressModule { }
