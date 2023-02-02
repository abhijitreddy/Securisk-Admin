import { ToastrModule } from 'ngx-toastr';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { LeadershipTeamRoutingModule } from './leadership-team-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadershipTeamComponent, LeadershipImageComponent, LeadershipActionComponent } from './leadership-team.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LeadershipTeamComponent,
    LeadershipImageComponent,
    LeadershipActionComponent
  ],
  imports: [
    CommonModule,
    LeadershipTeamRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ToastrModule
  ]
})
export class LeadershipTeamModule { }
