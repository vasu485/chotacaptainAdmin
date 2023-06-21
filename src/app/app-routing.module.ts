import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainContentComponent } from './main-content/main-content.component';
import { RegistrationComponent } from './registration/registration.component';

import { OrderContentComponent } from './order-content/order-content.component';
import { AddOrderComponent } from './add-order/add-order.component';

import { AddMiscOrderComponent } from './add-misc-order/add-misc-order.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { DeliveryBoysComponent } from './delivery-boys/delivery-boys.component';
import { AddItemsComponent } from './add-items/add-items.component';

import { AddOffersComponent } from './add-offers/add-offers.component';
import { SettlementComponent } from './settlement/settlement.component';
import { LocationsComponent } from './locations/locations.component';
import { ExecutiveStatusComponent } from './executive-status/executive-status.component';
import { OthersComponent } from './others/others.component';
import { AddServiceOrderComponent } from './add-service-order/add-service-order.component';
import { LocationPartnersComponent } from './location-partners/location-partners.component';
import { PartnersComponent } from './partners/partners.component';
import { DeliverychargesComponent } from './deliverycharges/deliverycharges.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },

  {
    path: 'dashboard',
    component: MainContentComponent,
    children: [
      { path: '', redirectTo: 'LoginComponent', pathMatch: 'full' },
      { path: 'orderList', component: OrderContentComponent },
      { path: 'addOrder', component: AddOrderComponent },
      { path: 'addMiscOrder', component: AddMiscOrderComponent },
      { path: 'addServiceOrder', component: AddServiceOrderComponent },
      { path: 'addvendor', component: AddVendorComponent },
      { path: 'addDeliveryBoys', component: DeliveryBoysComponent },
      { path: 'addItems', component: AddItemsComponent },
      { path: 'offers', component: AddOffersComponent },
      { path: 'settlement', component: SettlementComponent },
      { path: 'locations', component: LocationsComponent },
      { path: 'executive', component: ExecutiveStatusComponent },
      { path: 'locationPartners', component: LocationPartnersComponent },
      { path: 'others', component: OthersComponent },
      { path: 'partners', component: PartnersComponent },
      { path: 'deliverycharges', component: DeliverychargesComponent },
    ],
  },

  { path: '', redirectTo: 'LoginComponent', pathMatch: 'full' },

  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
