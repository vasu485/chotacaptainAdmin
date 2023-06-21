import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

import { catchError, map } from 'rxjs/operators';

// import 'rxjs/add/operator/catch';

@Injectable()
export class ApiUserProvider {
  // private serverURL1 = 'http://139.59.45.85/api/v1/';

  //private serverURL1 = 'http://apnachotuservices.com/api/v1/';
 // private serverURL1 = 'http://backend.prod.chotacaptain.com/api/v1/';
  private serverURL1 = 'http://api.chotacaptain.com/api/v1/';

  // http://159.89.171.183/api/v1/admin/paymentMethods

  //private serverURL1 = 'http://apnachotuservices.com/api/v1/';

  private getCatagiousURL = 'meta/categories';
  private getSubCatagiousURL = 'meta/sub_categories/';
  private getOffersURL = 'offers.json';
  private restraurantsURL = 'vendors/getall';
  private adminURL = 'admin.json';

  private getSingleVendor = 'vendors/get/';
  private updateVendorURL = 'vendors/edit';

  private signUp = 'user/signup';
  private updateProfileURL = 'user/profileUpdate';
  private getOTP = 'user/mobile/verify';

  private editBoyURL = 'admin/deliveryBoy/edit';

  private loginURL = 'user/login';
  private logoutURL = 'user/logout';

  private profileURL = 'user/profile/';
  private locationURL = 'meta/locations';

  private createOrderURL = 'order/create';
  private getAllOrdersURL = 'order/getall';
  private geOrderListSinglURL = 'order/get/';
  private updateOrderURL = 'order/update';
  private cancelOrderURL = 'order/cancel';

  private getDashboardURL = 'meta/offers';
  private getAdminOrdersURL = 'admin/getAllOrders';
  public getDeliveryBoyslURL = 'admin/getBoys';

  public typeURLs = 'meta/tags';

  private getLocationURL = 'admin/locations';
  private getPartnerLocationURL = 'admin/partnerlocations';
  private getDeliveryChargesURL = 'admin/deliverycharges';
  private getPartnersURL = 'user/partners';

  public updateLocationURL = 'admin/locations/update';
  public createPartnerLocationURL = 'admin/Partnerlocations/create';
  public UpdatePartnerLocation = 'admin/locations/updatePartnerLocation';
  public UpdateDC = 'admin/deliverycharge/update';
  public createDc = 'admin/deliverycharge/create';
  
  private createVendorURL = 'vendors/create';

  private getItemGroupURL = 'item_group/getall/';
  private createItemGroupURL = 'item_group/create';
  private updateItemGroupURL = 'item_group/edit';

  private updateItemURL = 'item/edit';
  private createItemURL = 'item/create';

  private updatemeatVegItemURL = 'item/update/meatVeg';
  private createmeatVegItemURL = 'item/create/meatVeg';

  private getVendorOfferURL = 'vendorOffer/all/';
  private createVendorOfferURL = 'vendorOffer/create';
  private updateVendorOfferURL = 'vendorOffer/remove/';

  private getDashboardOfferURL = 'meta/offers';
  private createDashboardOfferURL = 'meta/crud/offer/create';
  private updateDashboardOfferURL = 'meta/crud/offer/update';
  private deleteDashboardOfferURL = 'meta/crud/offer/delete/';

  private getVendorSettlementURL = 'admin/vendor/currentDaySettlementOrders';
  private updateVendorSettlementURL = 'admin/vendor/makeSettlementPayment';

  private getBoysSettlementURL = 'admin/deliveryBoy/currentDaySettlementOrders';
  private getBoysBetweenSettlementURL =
    'admin/deliveryBoy/betweenDatesSettlementOrders';
  private updateBoySettlementURL = 'admin/deliveryBoy/makeSettlementPayment';

  private createMisOrderURL = 'order/mis-create';

  private getCategoriesURL = 'meta/categories';

  private serverURL = './assets/data/admin/';
  // private serverHotelsURL = "./assets/data/hotels/";
  public serverImagesURL = './assets/images/';

  private getMiscSettlementURL = 'admin/miscSettlementOrders';

  public changeRolelURL = 'user/change_role';

  public vendorImageUploadURL = 'vendors/imageUpload';

  public itemImageUploadURL = 'item/imageUpload';

  public displaySequenceURL = 'vendors/displaySequence';

  getAllAnnouncementsURL = 'announcement/getall';
  createAnnouncementsURL = 'announcement/create';
  deleteAnnouncementsURL = 'announcement/delete';

  currentOrdersStatus = 'admin/delivery_boys/currentOrdersStatus';

  encript = 'user/mobile/verifyAdmin';
  checkUserExistedOrNot = 'user/checkUserExistedOrNot';

  signup = 'user/signup';

  getReports = 'getTodayTotalReport';

  pushGroupFCMNotifications = 'admin/pushGroupFCMNotifications';

  addPrimecustomer = 'admin/add_primecustomer';

  taxesURL = 'admin/terms_conditions/update';

  getTaxesURL = 'admin/terms_conditions/get';

  getSubCategoriesURL = 'meta/sub_categories';

  updateTaxOnItemsURL = 'admin/updateNewItemPriceBasedOnVendorOriginalItemTax';

  private getPaymentMethodsURL = "admin/paymentMethods";
  private updatePaymentMethodsURL = "admin/paymentMethods/edit";

  //  http://159.89.171.183/api/getTodayTotalReport/2021-04-03

  // http://139.59.45.85/api/v1/admin/delivery_boys/currentOrdersStatus

  constructor(public http: HttpClient, private router: Router) {
    // //console.log("Hello ApiUserProvider Provider");
  }

  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('jwt'),
      }),
    };
    return httpOptions;
  }

  extractData(res: Response | any) {
    // //console.log('res::::::::::::::', res);
    let body = res;
    // console.error('body:::::', body);
    return body || {};
  }

  handleErrorObservable(error: Response | any) {
    //console.log('errorrMEssage', error.error.message);
    alert(error.error.message);
    //this.router.navigate(['login']);

    return error.error || error;
  }

  logout(): Observable<any> {
    return this.http.get(this.serverURL1 + this.logoutURL, this.getHeaders());
  }

  getLoginDetails(id?: any): Observable<any> {
    return this.http.get(
      this.serverURL1 + this.profileURL + id,
      this.getHeaders()
    );
  }

  getLocations() {
    return this.http.get(this.serverURL1 + this.locationURL);
  }

  getDashboardOffersFn(): Observable<any> {
    return this.http.get(this.serverURL1 + this.getDashboardURL);
  }

  createOrder(details: any): Observable<any> {
    return this.http
      .post(this.serverURL1 + this.createOrderURL, details, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  // createOrder(details: any): Observable<any> {
  //   return this.http.post((this.serverURL1 + this.createOrderURL), details, this.getHeaders())
  //   .catchError((err) => this.handleErrorObservable(err));
  // }

  getOrdersAll(): Observable<any> {
    return this.http.get(
      this.serverURL1 + this.getAllOrdersURL,
      this.getHeaders()
    );
  }

  getCatagious(): Observable<any> {
    return this.http.get(this.serverURL1 + this.getCatagiousURL);
  }
  getSubCatagious(id?: any): Observable<any> {
    return this.http.get(this.serverURL1 + this.getSubCatagiousURL + id);
  }

  getRestraurants(vendorData: any): Observable<any> {
    // //console.log("add project fired" + vendorData);
    return this.http
      .post(
        this.serverURL1 + this.restraurantsURL,
        vendorData,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getMenuFn(id: any) {
    return this.http
      .get(this.serverURL1 + this.getSingleVendor + id, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getLogin(mobile: any): Observable<any> {
    return this.http
      .post(this.serverURL1 + this.loginURL, mobile, {
        observe: 'response',
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getSignUp(details: any): Observable<any> {
    return this.http
      .post(this.serverURL1 + this.signUp, details, {
        observe: 'response',
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getOtp(details: any): Observable<any> {
    // //console.log('mobile no', details);
    return this.http.post(this.serverURL1 + this.getOTP, details).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return this.handleErrorObservable(error);
      })
    );
  }

  getAdminAllOrders(details) {
    return this.http
      .post(
        this.serverURL1 + this.getAdminOrdersURL,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getOffers(): Observable<any> {
    return this.http.get(this.serverURL + this.getOffersURL).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return this.handleErrorObservable(error);
      })
    );
  }

  getAdminDetails(): Observable<any> {
    return this.http.get(this.serverURL + this.adminURL).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return this.handleErrorObservable(error);
      })
    );
  }

  getOrderDetails(id): Observable<any> {
    return this.http
      .get(this.serverURL1 + this.geOrderListSinglURL + id, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getDeliveryBoys(id): Observable<any> {
    return this.http
      .get(this.serverURL1 + this.getDeliveryBoyslURL+'/'+id, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  updateOrderFn(data): Observable<any> {
    return this.http
      .put(this.serverURL1 + this.updateOrderURL, data, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  cancelOrderFn(data): Observable<any> {
    return this.http
      .put(this.serverURL1 + this.cancelOrderURL, data, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  createVendorFn(details): Observable<any> {
    return this.http
      .post(this.serverURL1 + this.createVendorURL, details, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }
  updateProfileFn(details): Observable<any> {
    return this.http
      .put(this.serverURL1 + this.updateProfileURL, details, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  updateVendorFn(details): Observable<any> {
    return this.http
      .put(this.serverURL1 + this.updateVendorURL, details, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getTypesDetails(): Observable<any> {
    return this.http.get(this.serverURL1 + this.typeURLs).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return this.handleErrorObservable(error);
      })
    );
  }

  createItemGroup(details): Observable<any> {
    return this.http
      .post(
        this.serverURL1 + this.createItemGroupURL,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getItemGroup(id) {
    return this.http
      .get(this.serverURL1 + this.getItemGroupURL + id, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getReportsFn(date) {
    //console.log(date, "date")
    window.open(`${this.serverURL1}${this.getReports}/${date}`);

    // 'http://159.89.171.183/api/v1/getTodayTotalReport/2021-07-03'

    // this.http.get(this.serverURL1 + this.getReports +'/' +date);
    // return this.http

    //   .pipe(
    //     map((data) => {
    //       return data;
    //     }),
    //     catchError((error) => {
    //       return this.handleErrorObservable(error);
    //     })
    //   );
  }

  updateItemGroup(details): Observable<any> {
    return this.http
      .put(
        this.serverURL1 + this.updateItemGroupURL,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  createItem(details): Observable<any> {
    return this.http
      .post(this.serverURL1 + this.createItemURL, details, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  updateItem(details): Observable<any> {
    return this.http
      .put(this.serverURL1 + this.updateItemURL, details, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  createMeatVegItem(details): Observable<any> {
    return this.http
      .post(
        this.serverURL1 + this.createmeatVegItemURL,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  updateMeatVegItem(details): Observable<any> {
    return this.http
      .put(
        this.serverURL1 + this.updatemeatVegItemURL,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  createVendorOffer(details): Observable<any> {
    return this.http
      .post(
        this.serverURL1 + this.createVendorOfferURL,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getVendorOffer(details): Observable<any> {
    return this.http
      .get(
        this.serverURL1 + this.getVendorOfferURL + details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  deleteVendorOffer(id): Observable<any> {
    return this.http
      .delete(
        this.serverURL1 + this.updateVendorOfferURL + id,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  createDashboardOffer(details): Observable<any> {
    return this.http
      .post(
        this.serverURL1 + this.createDashboardOfferURL,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getDashboardOffer(): Observable<any> {
    return this.http.get(this.serverURL1 + this.getDashboardOfferURL).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return this.handleErrorObservable(error);
      })
    );
  }

  getAllAnnouncements(): Observable<any> {
    return this.http.get(this.serverURL1 + this.getAllAnnouncementsURL).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return this.handleErrorObservable(error);
      })
    );
  }

  createAnnouncements(details): Observable<any> {
    return this.http
      .post(
        this.serverURL1 + this.createAnnouncementsURL,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  deleteAnnouncements(id): Observable<any> {
    return this.http
      .delete(
        this.serverURL1 + this.deleteAnnouncementsURL + '/' + id,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getCategoriesFn(): Observable<any> {
    return this.http.get(this.serverURL1 + this.getCategoriesURL).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return this.handleErrorObservable(error);
      })
    );
  }

  updateDashboard(details): Observable<any> {
    return this.http
      .put(
        this.serverURL1 + this.updateDashboardOfferURL,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  deleteDashboardOffer(id): Observable<any> {
    return this.http
      .delete(
        this.serverURL1 + this.deleteDashboardOfferURL + id,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  // getVendorSettlementURL

  vendorSettlement(details): Observable<any> {
    return this.http
      .post(
        this.serverURL1 + this.getVendorSettlementURL,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  updatevendorSettlement(details): Observable<any> {
    return this.http
      .post(
        this.serverURL1 + this.updateVendorSettlementURL,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getBoysSettlement(details): Observable<any> {
    return this.http
      .post(
        this.serverURL1 + this.getBoysSettlementURL,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getBoysbetweenSettlement(details): Observable<any> {
    return this.http
      .post(
        this.serverURL1 + this.getBoysBetweenSettlementURL,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  updateboySettlement(details) {
    return this.http
      .post(
        this.serverURL1 + this.updateBoySettlementURL,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  createMisOrder(details: any): Observable<any> {
    return this.http.post(
      this.serverURL1 + this.createMisOrderURL,
      details,
      this.getHeaders()
    );
  }

  miscSettlement(details): Observable<any> {
    return this.http
      .post(
        this.serverURL1 + this.getMiscSettlementURL,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  changeRole(data): Observable<any> {
    return this.http
      .put(this.serverURL1 + this.changeRolelURL, data, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  editBoy(data): Observable<any> {
    return this.http
      .put(this.serverURL1 + this.editBoyURL, data, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getLocationsFn(): Observable<any> {
    return this.http
      .get(this.serverURL1 + this.getLocationURL, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }
  getPartnerLocationsFn(): Observable<any> {
    return this.http
      .get(this.serverURL1 + this.getPartnerLocationURL, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }
  getDeliveryChargesFn(): Observable<any> {
    return this.http
      .get(this.serverURL1 + this.getDeliveryChargesURL, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }
  getPartners(): Observable<any> {
    return this.http
      .get(this.serverURL1 + this.getPartnersURL, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  currentOrdersStatusFn(details) {
    return this.http
      .post(
        this.serverURL1 + this.currentOrdersStatus,
        details,
        this.getHeaders()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  updateLocations(details): Observable<any> {
    return this.http
      .put(this.serverURL1 + this.updateLocationURL, details, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }
  updatePartnerLocations(details): Observable<any> {
    return this.http
      .put(this.serverURL1 + this.UpdatePartnerLocation, details, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }
  updateDeliveryCharge(details): Observable<any> {
    return this.http
      .put(this.serverURL1 + this.UpdateDC, details, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }
  createPartnerLocation(details): Observable<any> {
    return this.http
      .post(this.serverURL1 + this.createPartnerLocationURL, details, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }
  createDeliveryCharges(details): Observable<any> {
    return this.http
      .post(this.serverURL1 + this.createDc, details, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }
  
  createPartner(details): Observable<any> {
    return this.http
      .post(this.serverURL1 + this.signUp, details, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  encriptOTPFn(details: any): Observable<any> {
    // //console.log('mobile no', details);
    return this.http.post(this.serverURL1 + this.encript, details).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return this.handleErrorObservable(error);
      })
    );
  }

  checkUserExistedOrNotFn(details: any): Observable<any> {
    return this.http
      .post(this.serverURL1 + this.checkUserExistedOrNot, details)
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  signupFn(details: any): Observable<any> {
    return this.http.post(this.serverURL1 + this.signup, details).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return this.handleErrorObservable(error);
      })
    );
  }

  getHeaders1() {
    const HttpUploadOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        Authorization: sessionStorage.getItem('jwt'),
      }),
    };
    return HttpUploadOptions;
  }

  vendorImageUpload(formData): Observable<any> {
    return this.http
      .post(
        this.serverURL1 + this.vendorImageUploadURL,
        formData,
        this.getHeaders1()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  itemImageUpload(formData): Observable<any> {
    return this.http
      .post(
        this.serverURL1 + this.itemImageUploadURL,
        formData,
        this.getHeaders1()
      )
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  displaySequence(details: any): Observable<any> {
    return this.http
      .post(
        this.serverURL1 + this.displaySequenceURL,
        details,
        this.getHeaders()
      )

      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  // pushGroupFCMNotifications = 'admin/pushGroupFCMNotifications';

  // addPrimecustomer = 'admin/add_primecustomer';

  pushGroupFCMNotificationsFn(details: any): Observable<any> {
    return this.http
      .post(
        this.serverURL1 + this.pushGroupFCMNotifications,
        details,
        this.getHeaders()
      )

      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  addPrimecustomerFn(details: any): Observable<any> {
    return this.http
      .post(this.serverURL1 + this.addPrimecustomer, details, this.getHeaders())

      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  taxesFn(data): Observable<any> {
    return this.http
      .put(this.serverURL1 + this.taxesURL, data, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getTaxesFn(): Observable<any> {
    return this.http.get(this.serverURL1 + this.getTaxesURL, this.getHeaders());
  }

  getSubCategories(id): Observable<any> {
    return this.http.get(
      this.serverURL1 + this.getSubCategoriesURL + '/' + id,
      this.getHeaders()
    );
  }

  updateTaxOnItems(vendor): Observable<any> {
    return this.http
      .post(this.serverURL1 + this.updateTaxOnItemsURL, vendor, this.getHeaders())

      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }

  getPaymentMethods(): Observable<any> {
    return this.http.get(
      this.serverURL1 + this.getPaymentMethodsURL,
      this.getHeaders()
    );
  }

  updatePaymentMethods(data): Observable<any> {
    return this.http
      .put(this.serverURL1 + this.updatePaymentMethodsURL, data, this.getHeaders())
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return this.handleErrorObservable(error);
        })
      );
  }



}
