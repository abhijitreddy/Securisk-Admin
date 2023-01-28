import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {path: '', redirectTo: 'about-us', pathMatch: 'full'},
            {path: 'about-us', loadChildren: () => import('./../about-us/about-us.module').then(m => m.AboutUsModule)},
            {path: 'services', loadChildren: () => import('./../services/services.module').then(m => m.ServicesModule)},
            {path: 'address', loadChildren: () => import('./../address/address.module').then(m => m.AddressModule)},
            {path: 'products', loadChildren: () => import('./../products/products.module').then(m => m.ProductsModule)},
            {path: 'sectors', loadChildren: () => import('./../sectors/sectors.module').then(m => m.SectorsModule)},
            {path: 'terms', loadChildren: () => import('./../terms/terms.module').then(m => m.TermsModule)},
            {path: 'privacy', loadChildren: () => import('./../privacy/privacy.module').then(m => m.PrivacyModule)},
            {path: 'cookies', loadChildren: () => import('./../cookies/cookies.module').then(m => m.CookiesModule)},
            {path: 'disclaimer', loadChildren: () => import('./../disclaimer/disclaimer.module').then(m => m.DisclaimerModule)},
            {path: 'disclosuer', loadChildren: () => import('./../disclosure/disclosure.module').then(m => m.DisclosureModule)},
            {path: 'customer-grievence', loadChildren: () => import('./../customer-grievence/customer-grievence.module').then(m => m.CustomerGrievenceModule)},
            {path: 'leadership-team', loadChildren: () => import('./../leadership-team/leadership-team.module').then(m => m.LeadershipTeamModule)},
            {path: 'footer', loadChildren: () => import('./../footer/footer.module').then(m => m.FooterModule)},        
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
