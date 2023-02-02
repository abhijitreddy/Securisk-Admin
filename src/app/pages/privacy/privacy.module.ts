import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PrivacyRoutingModule } from './privacy-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    PrivacyRoutingModule,
    CKEditorModule,
    AngularFirestoreModule,
    FormsModule,
    ToastrModule
  ]
})
export class PrivacyModule { }
