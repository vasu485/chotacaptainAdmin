import { Component, OnInit } from '@angular/core';

import { ApiUserProvider } from '../../providers/api-user/api-user';

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css'],
})
export class SettlementComponent implements OnInit {
  isRes: boolean;
  isBoy: boolean;
  isMisc: boolean;
  public restraurants: any = [];
  public vetable: any = [];
  public meat: any = [];
  boysArr: any = [];
  boysSettlement: any = [];
  isAdmin=!Number(localStorage.getItem('lid'))

  selectBoy: any;
  selectDate: any;
  selectEndDate: any;

  apiDate = new Date();

  nrSelect: any;
  srdate: any;
  nrdate: any;
  isLoadMoreBtn: boolean;

  catogriesIds: any = [1, 20, 21];

  count = 0;

  restraurantsSettlementlength: boolean;
  boySettlementlength: boolean;
  public restraurantsSettlement: any = [];
  public miscSettlement: any = [];

  isShow: boolean;
  menuItems = [
    { name: 'Food', url: 'addvendor', id: '1' },
    { name: 'Vegtables/Fruites', url: 'addvendor', id: '21' },
    { name: 'Meat', url: 'addvendor', id: '20' },
    { name: 'Groceries', url: 'addvendor', id: '18' },
  ];
  selectVendorType: any;
  locationListArr: any;
  location;

  constructor(private Api: ApiUserProvider) {}

  ngOnInit() {
    this.Api.getPartnerLocationsFn().subscribe(data => {
      this.locationListArr = data['data'];
   });
    let today = new Date();
    let dateToday =
      today.getFullYear() +
      '-' +
      ('0' + (today.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + today.getDate()).slice(-2);
    this.nrdate = dateToday;
    this.selectDate = dateToday;
    this.srdate = dateToday;

    // this.getrestarentsFn(this.catogriesIds[0]);
    // this.getBoys();

    // //console.log(this.apiDate);
  }

  getAllPartners() {
    // this.getrestarentsFn(this.catogriesIds[this.count]);
    // this.getrestarentsFn();
    // this.getrestarentsFn(this.catogriesIds[2]);
  }

  getrestarentsFn() {
    this.isShow = false;
    this.count++;
    this.isLoadMoreBtn = true;
    let vendorData: any = {
      offset: '0',
      limit: '200',
      category: this.selectVendorType,
      "locationid":this.location??localStorage.getItem('lid')
       
    };

    this.Api.getRestraurants(vendorData).subscribe((data) => {
      this.restraurants = data['data'];
      this.isLoadMoreBtn = false;
      this.isShow = true;
      // if(this.count < this.catogriesIds.length){
      //   this.getrestarentsFn(this.catogriesIds[this.count]);
      // }else{
      //   this.isLoadMoreBtn = false;
      // }

      // if(category == this.catogriesIds[0]){
      //   this.restraurants = data['data'];
      // }else if(category == this.catogriesIds[1]){
      //   this.meat = data['data'];
      // }else if(category == this.catogriesIds[2]){
      //   this.vetable = data['data'];
      // }

      // this.getrestarentsFn(this.catogriesIds[0]);
    });
  }

  getBoys() {
    this.Api.getDeliveryBoys(this.location??localStorage.getItem("lid")).subscribe(
      (resp) => {
        let activeFirst = resp['data']?.filter((boy) => boy.is_active == 1);
        let inactiveFirst = resp['data']?.filter((boy) => boy.is_active == 0);
        this.boysArr = [...activeFirst, ...inactiveFirst];
      },
      (error) => {
        // // alert(error.message);
        // //console.log('error::::::', error);
      }
    );
  }

  showRestraurant(name, dateVal) {
    //console.log(name, dateVal);
    this.isLoadMoreBtn = true;
    let vendorData: any = {
      vendorId: name,
      date: dateVal,
    };

    this.Api.vendorSettlement(vendorData).subscribe(
      (data) => {
        this.restraurantsSettlement = data['data'];
        this.restraurantsSettlementlength = data['data'] ? true : false;
        this.isLoadMoreBtn = false;
      },
      () => {
        this.isLoadMoreBtn = false;
        // // alert(error.message);
        this.restraurantsSettlement = [];
        this.restraurantsSettlementlength = false;
        // //console.log('error::::::', error);
      }
    );
  }

  updaterestraurantsSettlement(id, name, dateVal) {
    let vendorData: any = {
      settlementId: id,
      paymentMode: 'CASH',
      status: 'DONE',
    };
    this.isLoadMoreBtn = true;
    this.Api.updatevendorSettlement(vendorData).subscribe(
      (data) => {
        this.isLoadMoreBtn = false;
        this.showRestraurant(name, dateVal);
        alert(data.status);
      },
      (error) => {
        this.isLoadMoreBtn = false;
        // // alert(error.message);
        this.restraurantsSettlement = [];
        this.restraurantsSettlementlength = false;
        // //console.log('error::::::', error);
      }
    );
  }

  showBoys(name, dateVal, endDate?: any) {
    // //console.log(name, dateVal, endDate);
    if (!endDate || dateVal == endDate) {
      let vendorData: any = {
        deliveryBoyId: name,
        date: dateVal,
      };
      this.isLoadMoreBtn = true;

      this.Api.getBoysSettlement(vendorData).subscribe(
        (data) => {
          this.boysSettlement = data['data'];
          this.isLoadMoreBtn = false;
          this.boySettlementlength = data['data'] ? true : false;
        },
        (error) => {
          this.isLoadMoreBtn = false;
          this.boysSettlement = null;
          this.boySettlementlength = false;
          // alert(error.message);
          // //console.log('error::::::', error);
        }
      );
    } else {
      let vendorData: any = {
        deliveryBoyId: name,
        fromDate: dateVal,
        toDate: endDate,
      };
      this.isLoadMoreBtn = true;
      this.Api.getBoysbetweenSettlement(vendorData).subscribe(
        (data) => {
          this.boysSettlement = data['data'];
          this.isLoadMoreBtn = false;
          this.boySettlementlength = data['data'] ? true : false;
        },
        (error) => {
          this.isLoadMoreBtn = false;
          this.boysSettlement = null;
          this.boySettlementlength = false;
          // alert(error.message);

          // //console.log('error::::::', error);
        }
      );
    }
  }

  updateBoySettlement(id, amount) {
    let boyData: any = {
      settlementId: id,
      paymentMode: 'CASH',
      status: 'DONE',
      boyAmount: amount,
    };
    this.isLoadMoreBtn = true;
    this.Api.updateboySettlement(boyData).subscribe(
      (data) => {
        this.boysSettlement = null;
        this.boySettlementlength = false;
        alert(data['status']);
        this.isLoadMoreBtn = false;
      },
      (error) => {
        this.isLoadMoreBtn = false;
        this.boysSettlement = null;
        this.boySettlementlength = false;
        //  // alert(error.message);
        // //console.log('error::::::', error);
      }
    );
  }

  showMisc(date) {
    //console.log(date);

    let miscData: any = {
      date: date,
    };
    this.isLoadMoreBtn = true;
    this.Api.miscSettlement(miscData).subscribe(
      (data) => {
        this.miscSettlement = data['data'];
        this.isLoadMoreBtn = false;
      },
      (error) => {
        this.isLoadMoreBtn = false;
        this.miscSettlement = null;
        //  // alert(error.message);
        // //console.log('error::::::', error);
      }
    );
  }
}
