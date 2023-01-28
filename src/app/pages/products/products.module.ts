import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProductsComponent, ProductsActionComponent } from './products.component';
import { AngularFireStorageModule } from '@angular/fire/storage';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsActionComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  exports: []
})
export class ProductsModule { }
