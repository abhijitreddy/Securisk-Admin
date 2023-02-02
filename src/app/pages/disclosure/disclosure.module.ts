import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DisclosureRoutingModule } from './disclosure-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisclosureComponent } from './disclosure.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    DisclosureComponent
  ],
  imports: [
    CommonModule,
    DisclosureRoutingModule,
    CKEditorModule,
    AngularFirestoreModule,
    FormsModule,
    ToastrModule
  ]
})
export class DisclosureModule { }
