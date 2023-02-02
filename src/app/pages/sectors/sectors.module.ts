import { ToastrModule } from 'ngx-toastr';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SectorsRoutingModule } from './sectors-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorsComponent, SectorsActionComponent } from './sectors.component';



@NgModule({
  declarations: [
    SectorsComponent,
    SectorsActionComponent
  ],
  imports: [
    CommonModule,
    SectorsRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    ToastrModule
  ]
})
export class SectorsModule { }
