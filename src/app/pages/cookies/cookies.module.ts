import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CookiesRoutingModule } from './cookies-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookiesComponent } from './cookies.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    CookiesComponent
  ],
  imports: [
    CommonModule,
    CookiesRoutingModule,
    CKEditorModule,
    AngularFirestoreModule,
    FormsModule,
    ToastrModule
  ]
})
export class CookiesModule { }
