import { AuthService } from './services/auth.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../environments/environment';
import { CustomerGrievenceModule } from './pages/customer-grievence/customer-grievence.module';
import { DisclosureModule } from './pages/disclosure/disclosure.module';
import { DisclaimerModule } from './pages/disclaimer/disclaimer.module';
import { CookiesModule } from './pages/cookies/cookies.module';
import { PrivacyModule } from './pages/privacy/privacy.module';
import { TermsModule } from './pages/terms/terms.module';
import { SectorsModule } from './pages/sectors/sectors.module';
import { AddressModule } from './pages/address/address.module';
import { ProductsModule } from './pages/products/products.module';
import { AboutUsModule } from './pages/about-us/about-us.module';
import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesModule } from './pages/services/services.module';
import { AngularFireModule } from '@angular/fire';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    AboutUsModule,
    ServicesModule,
    ProductsModule,
    AddressModule,
    SectorsModule,
    TermsModule,
    PrivacyModule,
    CookiesModule,
    DisclaimerModule,
    DisclosureModule,
    CustomerGrievenceModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
