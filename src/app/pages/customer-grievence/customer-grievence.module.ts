import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CustomerGrievenceRoutingModule } from './customer-grievence-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerGrievenceComponent } from './customer-grievence.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    CustomerGrievenceComponent
  ],
  imports: [
    CommonModule,
    CustomerGrievenceRoutingModule,
    CKEditorModule,
    AngularFirestoreModule,
    FormsModule,
    ToastrModule
  ]
})
export class CustomerGrievenceModule { }
