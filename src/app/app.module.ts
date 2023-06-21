import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './header/topbar/topbar.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OrderListComponent } from './order-list/order-list.component';
import { MainContentComponent } from './main-content/main-content.component';
import { OrderContentComponent } from './order-content/order-content.component';
import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

import { RegistrationComponent } from './registration/registration.component';

import { ApiUserProvider } from '../providers/api-user/api-user';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddOrderComponent } from './add-order/add-order.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { AddMiscOrderComponent } from './add-misc-order/add-misc-order.component';

import { SearchPipe } from '../pipes/search/search';
import { QuantityComponent } from './quantity/quantity.component';
import { FoodItemComponent } from './food-item/food-item.component';
import { DeliveryBoysComponent } from './delivery-boys/delivery-boys.component';
import { BoyNameComponent } from './boy-name/boy-name.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { AddOffersComponent } from './add-offers/add-offers.component';
import { SettlementComponent } from './settlement/settlement.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { SortableModule } from 'ngx-bootstrap/sortable';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationsComponent } from './locations/locations.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PriceQuantityComponent } from './add-items/price-quantity/price-quantity.component';
import { OtherItemComponent } from './add-order/other-item/other-item.component';
import { InputGroupComponent } from './add-order/input-group/input-group.component';
import { ExecutiveStatusComponent } from './executive-status/executive-status.component';
import { AgmCoreModule } from '@agm/core';
import { CategoryPipe } from 'src/pipes/search/pipe';
import { OthersComponent } from './others/others.component';
import { AddServiceOrderComponent } from './add-service-order/add-service-order.component';
import { LocationPartnersComponent } from './location-partners/location-partners.component';
import { PartnersComponent } from './partners/partners.component';
import { DeliverychargesComponent } from './deliverycharges/deliverycharges.component';

// import { FirebaseModule, FirebaseProvider } from 'angular-firebase';



// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)

// import {AgmMap, MouseEvent,MapsAPILoader, AgmCoreModule  } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    LoginComponent,
    SidebarComponent,
    OrderListComponent,
    MainContentComponent,
    OrderContentComponent,
    RegistrationComponent,
    AddOrderComponent,
    AddMiscOrderComponent,
    AddVendorComponent,
    SearchPipe,
    QuantityComponent,
    FoodItemComponent,
    DeliveryBoysComponent,
    BoyNameComponent,
    AddItemsComponent,
    AddOffersComponent,
    SettlementComponent,
    LocationsComponent,
    PriceQuantityComponent,
    OtherItemComponent,
    InputGroupComponent,
    ExecutiveStatusComponent,
    CategoryPipe,
    OthersComponent,
    AddServiceOrderComponent,
    LocationPartnersComponent,
    PartnersComponent,
    DeliverychargesComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    SortableModule.forRoot(),
    ModalModule,
    // FirebaseModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDkPgrqFFeFqZi5IvmNmbKzKwZ6V4slRsw',
    }),
  ],

  providers: [ApiUserProvider],
  bootstrap: [AppComponent],
})
export class AppModule { }
