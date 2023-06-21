import { Component, TemplateRef, OnDestroy, OnInit } from '@angular/core';
import { faArrowDown, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiUserProvider } from '../../providers/api-user/api-user';
import { Router } from '@angular/router';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-order-content',
  templateUrl: './order-content.component.html',
  styleUrls: ['./order-content.component.css']
})
export class OrderContentComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  orderList: any = [];
  boyName: string;
  faPlusSquare = faPlusSquare;
  faArrowDown = faArrowDown;
  isLoading: boolean;
  searhId: any;
  location;
  isAdmin=!Number(localStorage.getItem('lid'))

  registerForm: FormGroup;
  submitted = false;
  orderCallBool: boolean;
  setInterValCall: any;
  boysArr: any = [];

  isActiveOrder: boolean = true;
  openModel: boolean;


  isLoadMoreBtn:boolean;
  totalOrderCount: any;

  headerNames: any = {
    food: 'Food',
    misc: 'Misc',
    delivered: 'Delivered',
    canceled: 'Canceled',
    noStock: 'Out of Stock',
    normal: 'normal',
    miscorder: 'mis',
    allOrders: 'All Open',
    prepared: "Prepared"
  }

  showType:any=[null,null];
  locations:any =[];
  locationName:any;

  isDisabledLoc:boolean;
  // this.orderstatus = [
  //   { "name": 'Confirmed', 'id': '2' },
  //   { "name": 'Cooking', 'id': '6' },
  //   { "name": 'Prepared', 'id': '8' },
  //   { "name": 'Canceled', 'id': null },
  //   { "name": 'Out of stock', 'id': '11' },
  //   { "name": 'Not Delivered', 'id': '16' },
  // ]

  headerText: string;

  settlementForm: FormGroup;

  private updateSubscription: Subscription;

  orderSearch: any = [];

  delverdOrCanceled:number;
  offset:number = 0;
  limit:number = 15;
  orderLength:number;

  selectDate:any;
  selectEndDate:any;
  isLoadDateVisible:boolean;

  menuItems = [
    { name: 'Food', url: 'addvendor', id: '1' },
    { name: 'Vegtables/Fruites', url: 'addvendor', id: '21' },
    { name: 'Meat', url: 'addvendor', id: '20' },
    { name: 'Groceries', url: 'addvendor', id: '18' },
    {name: 'Misc ', id:null}
  ]
  locationArr: any;
  locationListArr: any;

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder,
    private Api: ApiUserProvider, private router: Router) { }

  ngOnInit() {
    this.Api.getPartnerLocationsFn().subscribe(data => {
      this.locationListArr = data['data'];
   });
    this.getOrdersFn(true, this.headerNames.allOrders);
    this.getBoys();
    this.getLocationsFn();
    this.getLocations()
    this.headerText = this.headerNames.allOrders;

    // this.updateSubscription = interval(3*1000).subscribe(
    //   (val) => { this.refressOpenOrder()});

    // this.setInterValCall = setInterval(() => {
    //   if (!this.orderCallBool) {
    //     this.refressOpenOrder();
    //     // //console.log("refresh");
    //   }
    // }, 3 * 1000);


    this.settlementForm = this.formBuilder.group({
      Hoteltitle: ['', Validators.required],
      date: ['', Validators.required],
      percentage: ['', Validators.required],
    });

    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });


  }
  get f() { return this.registerForm.controls; }

  get settlementF() { return this.settlementForm.controls; }


  openModal(template: TemplateRef<any>) {
    this.submitted = false;
    this.orderCallBool = true;
    this.registerForm.reset();
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.boyName = this.boyName;

    this.orderList.push({
      'id': 'B011',
      'Vendor': 'Bawarchi',
      'Items': [{ 'item': 'Chiken biryani', 'Qty': 2, 'price': 200 }, { 'item': 'Chiken biryani', 'Qty': 2, 'price': 200 }, { 'item': 'Chiken biryani', 'Qty': 2, 'price': 200 }],
      'Price': '950',
      'Payment': 'Cash',
      'Status': 'Placed',
      'Phone': '845612378',
      'Address': 'Kphb, Hyderabad',
      'Delivery_boy': [{ 'name': 'Rajesh', 'id': 2 }, { 'name': 'Kajesh', 'id': 2 }, { 'name': 'majesh', 'id': 2 }],
      'Order_Placed': '11:20:23 20/02/20',
      'Order_Confirmed': '11:23:23 20/02/20',
      'Order_Delivered': '11:50:23 20/02/20'
    });


    // this.modalRef.hide();
  }

  decline(): void {
    this.boyName = 'select';
    this.modalRef.hide();
    this.orderCallBool = false;
  }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  openSettlement(Settlement: TemplateRef<any>) {
    this.orderCallBool = true;
    this.submitted = false;
    this.settlementForm.reset();
    this.modalRef = this.modalService.show(Settlement, { class: 'modal-lg' });
  }


  closeSettlement(): void {
    this.modalRef.hide();
    this.orderCallBool = false;
  }

  onsettlementFormReset() {
    this.submitted = false;
    this.settlementForm.reset();
  }

  onSetlement() {
    this.submitted = true;
    this.orderCallBool = true;
    // stop here if form is invalid
    if (this.settlementForm.invalid) {
      return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  getOrdersFn(flag, type?: any, canceled?: any) {
    // //console.log('loading refreshhhhh');
    this.isLoadMoreBtn = false;
    this.isLoadDateVisible = false;
    this.isLoading = true;
    let sendData = {
      "offset": 0,
      "limit": 1000,
      "is_active": flag,
      "status":1,
      "partnerid":Number(localStorage.getItem("lid"))

    }
    this.Api.getAdminAllOrders(sendData)
      .subscribe(data => {
        let orderData = data['data'];


        if (type != this.headerNames.allOrders && flag) {

            this.orderList = orderData.filter(x => x.type == type);
            this.totalOrderCount = this.orderList.length;

        } else {
          this.orderList = orderData;
          this.orderList = orderData.filter(x => x.status?.id != 16);
          this.totalOrderCount = this.orderList.length;
        }

        if (type && !flag) {
          this.orderList = orderData.filter(x => x.status?.id == type);
          this.totalOrderCount = this.orderList.length;
        }

        this.isLoading = false;
        // //console.log(this.orderList);
      },
        (error) => {
          // alert(error.message);
          this.isLoading = false;
          this.router.navigate(['login']);
        });
  }

  refressOpenOrder() {
    // //console.log("refresh");

    if (this.headerText == "Food") {
      let sendData = {
        "offset": 0,
        "limit": "10000",
        "is_active": true,
        "partnerid":Number(localStorage.getItem("lid"))

      }
      this.Api.getAdminAllOrders(sendData)
        .subscribe(data => {
          this.totalOrderCount = data['order_count']
          let ordersData;
          ordersData = data['data'];
          ordersData = data['data'].filter(x => x.type == this.headerNames.normal && x.status.id != 3);

          if (ordersData.length == 0) {
            this.orderList = [];
          }

          if (ordersData.length > 0 && ordersData.length != this.orderList.length) {
            let orderLength = ordersData.length - this.orderList.length;
            for (let i = 0; i < orderLength; i++) {
              this.orderList.unshift(ordersData[((orderLength) - i) - 1]);
            }
          }
        },
          (error) => {
            // alert(error.message);
            this.router.navigate(['login']);
          });
    }

    if (this.headerText == "Misc") {
      let sendData = {
        "offset": 0,
        "limit": "10000",
        "is_active": true
      }
      this.Api.getAdminAllOrders(sendData)
        .subscribe(data => {
          this.totalOrderCount = data['order_count']
          let ordersData;
          ordersData = data['data'];
          ordersData = data['data'].filter(x => x.type == this.headerNames.miscorder && x.status.id != 3);
          if (ordersData.length == 0) {
            this.orderList = [];
          }
          if (ordersData.length > 0 && ordersData.length != this.orderList.length) {
            let orderLength = ordersData.length - this.orderList.length;
            for (let i = 0; i < orderLength; i++) {
              this.orderList.unshift(ordersData[((orderLength) - i) - 1]);
            }
          }
        },
          (error) => {
            // alert(error.message);
            this.router.navigate(['login']);
          });
    }

    if (this.headerText == this.headerNames.allOrders) {
      let sendData = {
        "offset": 0,
        "limit": "10000",
        "is_active": true,
        "partnerid":Number(localStorage.getItem("lid"))

      }
      this.Api.getAdminAllOrders(sendData)
        .subscribe(data => {
          this.totalOrderCount = data['order_count']
          let ordersData;
          ordersData = data['data'];
          this.orderList.forEach((placedItem, index) => {
            ordersData.forEach(newItem => {
              if (placedItem.id == newItem.id) {
                if (placedItem.status.id != newItem.status.id) {
                  placedItem.status = newItem.status;
                }
              }
            });
          });


          if (ordersData.length == 0) {
            this.orderList = [];
          }

          if (ordersData.length > 0 && ordersData.length > this.orderList.length) {
            let orderLength = ordersData.length - this.orderList.length;
            for (let i = 0; i < orderLength; i++) {
              this.orderList.unshift(ordersData[((orderLength) - i) - 1]);
            }
          } else {
            // //console.log(this.orderList);
          }
        },
          (error) => {
            // alert(error.message);
            this.router.navigate(['login']);
          });
    }

  }



  getBoys() {
    this.Api.getDeliveryBoys(localStorage.getItem("lid"))
      .subscribe((data) => {
        this.boysArr = data['data'];
      });
  }
  getLocations(){
    this.Api.getPartnerLocationsFn().subscribe(data => {
      this.locationArr = data['data'];
   });
  }


  addOrder() {
    this.router.navigate(['dashboard/addOrder']);
  }

  addVendor() {
    this.router.navigate(['dashboard/addvendor']);

  }

  addDeliveryBoys() {
    this.router.navigate(['dashboard/addDeliveryBoys']);
  }

  addItems() {
    this.router.navigate(['dashboard/addItems']);
  }

  openOffers() {
    this.router.navigate(['dashboard/offers']);
  }

  updateOrderts(inputs) {
    //console.log(inputs, "inputsinputsinputsinputsinputs")
    this.updateOrdersFn();

    if(this.openModel){
      this.getOrder(this.searhId);
    }

  }

nullValues(num){
  this.isActiveOrder = false;
  this.selectDate = null;
  this.selectEndDate = null;
  this.orderList = [];
  this.offset = 0;
  this.limit = 15;
  this.getOrdersLoadmoreFn(num);
}

  showDelvered() {
    this.headerText = this.headerNames.delivered;
    this.nullValues(4)
  }

  noStpckPrders() {
    this.headerText = this.headerNames.noStock;
    this.nullValues(11)
  }

  canceledDelvered() {

    this.headerText = this.headerNames.canceled;
    this.nullValues(3)
  }

  notDelvered(){
    this.headerText = "Not Delivered Orders"
    this.nullValues(16)
  }


  showFoodOrders(id?:any) {

    this.headerText = this.headerNames.food;
    this.getOrdersItems(id);
  }

  showMisc() {
    this.headerText = this.headerNames.misc;
    this.getOrdersFn(true, this.headerNames.miscorder)
  }

  showAllOrders() {
    this.headerText = this.headerNames.allOrders;
    this.getOrdersFn(true, this.headerNames.allOrders)
  }


  preparedOrders(){
    this.headerText = "Prepared";
    this.getOrdersFn(true, this.headerNames.prepared)
  }



  ngOnDestroy() {
    clearInterval(this.setInterValCall);
    // //console.log('ChildComponent:OnDestroy');
  }

  getOrder(id) {
    this.Api.getOrderDetails(id)
      .subscribe((data) => {
        this.orderSearch = data['data'];
        this.openModel = true;
      },
      (error) => {
        // alert(error.message);
      });
  }

  closeFn(){
    this.orderSearch = null;
    this.openModel = false;
  }



  getOrdersLoadmoreSubmit(){
    this.orderList=[]
    this.offset = 0;
    this.getOrdersLoadmoreFn(this.delverdOrCanceled)
  }

  getOrdersLoadmore(){
    this.offset = this.offset + 15;
    this.getOrdersLoadmoreFn(this.delverdOrCanceled)
  }

  getOrdersLoadmoreFn(type?: any) {
    this.isLoadDateVisible = true;
    this.delverdOrCanceled = type;
    this.isLoadMoreBtn = true;
    this.isLoading = true;

   
    let dateArr = this.selectDate && this.selectEndDate ? [this.selectDate,this.selectEndDate] : [];

    let sendData = {
      "offset": this.offset,
      "limit": this.limit,
      "is_active": false,
      "dates":dateArr,
      "statusId":type,
      "partnerid":Number(localStorage.getItem("lid"))

    }

    this.Api.getAdminAllOrders(sendData)
      .subscribe(data => {
        this.totalOrderCount = data['order_count']
        let orderData = data['data'];
        if(orderData.length == 0){
          this.isLoadMoreBtn = false
        }
        this.orderList.push(...orderData.filter(x => x.status.id == type));
        this.isLoading = false;
      },
        (error) => {
          // alert(error.message);
          this.isLoading = false;
          this.router.navigate(['login']);
        });
  }


  catgoryId:any;

  getOrdersItems(id?: any) {
    // //console.log('loading refreshhhhh');
    this.isLoadMoreBtn = false;
    this.isLoadDateVisible = false;
    this.isLoading = true;
    let sendData = {
      "offset": 0,
      "limit": 1000,
      "is_active": true,
      "partnerid":Number(localStorage.getItem("lid"))


    }
      if(id){
        this.catgoryId = id;
      }
        

    this.Api.getAdminAllOrders(sendData)
      .subscribe(data => {

        let orderData = data['data'];
          this.orderList = orderData.filter(x => x.categoryId == this.catgoryId);
          this.totalOrderCount = this.orderList.length;
        this.isLoading = false;
        // //console.log(this.orderList);
      },
        (error) => {
          // alert(error.message);
          this.isLoading = false;
          this.router.navigate(['login']);
        });
  }


  
  filterdOrders(id?:any, name?:any, extra?:any){
    this.isDisabledLoc = false;
    this.locationName="";
    this.headerText = name;
    this.showType = [id, extra];
    this.getOrdersFilterFn(id, extra);
  }

  getOrdersFilterFn(id?:any, extraId?:any, location?:any) {
    //console.log('loading extraId', extraId);
    this.isLoadMoreBtn = false;
    this.isLoadDateVisible = false;
    this.isLoading = true;
    let sendData = {
      "offset": 0,
      "limit": 1000,
      "is_active": 1,
      "statusId":id || '',
      "partnerid":location.id??localStorage.getItem("lid")
    }
    this.Api.getAdminAllOrders(sendData)
      .subscribe(data => {
        let orderData = data['data'];
        this.orderList = orderData;

        if (id) {
          this.orderList = orderData.filter(x => x.status.id == id)
          let orderList = extraId ? orderData.filter(x => x.status.id == extraId) : [];
          if(orderList){
            this.orderList.push(...orderList)
          }

          
        } 

        //console.log(this.orderList, "this.orderList")

        // if(location){
        //   this.orderList =  this.orderList.filter(x => x.location.id == location.id);
        // }

        //console.log(this.orderList, "this.orderList")
       

        this.totalOrderCount = this.orderList.length;
        this.isLoading = false;
      },
        (error) => {
          // alert(error.message);
          this.isLoading = false;
          this.router.navigate(['login']);
        });
  }


  updateOrdersFn() {
    //console.log(this.headerText, "this.headerText")
    if (this.headerText == "Misc") {
      this.showMisc();
    } else if (this.headerText == "Food" || this.headerText == "Meat" || this.headerText == "Vegtables/Fruites" ) {
      this.getOrdersItems()
    } else if (this.headerText == "Delivered") {
      this.showDelvered()
    } else if (this.headerText == "Canceled") {
      this.canceledDelvered();
    } else {

      //console.log(this.showType);
      // this.showAllOrders();
      this.getOrdersFilterFn(this.showType[0], this.showType[1]);
    }

  }


  getLocationsFn() {

    this.Api.getLocationsFn().subscribe(data => {
       this.locations = data['data'];
    });
  }

  showLocations(location){
    this.locationName=location.name;

    //console.log(this.showType, "this.showType")

    this.getOrdersFilterFn(this.showType[0], this.showType[1], location);

  }


}


