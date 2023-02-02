import { ToastrModule } from 'ngx-toastr';
import { ComponentsModule } from './../../components/components.module';
import { SidebarComponent } from './../../components/sidebar/sidebar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AngularFireAuthModule } from '@angular/fire/auth';



@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    AngularFireAuthModule,
    ToastrModule
  ]
})
export class AdminModule { }
