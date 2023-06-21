import { Component, OnInit } from '@angular/core';

import { ApiUserProvider } from '../../providers/api-user/api-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service-order',
  templateUrl: './add-service-order.component.html',
  styleUrls: ['./add-service-order.component.css'],
})
export class AddServiceOrderComponent implements OnInit {
  public details: any = [];
  public menu: any = [];
  public menuList: any = [];
  public finalMenuList: any = [];
  public courseType: any = [];
  public imageUrl: string;
  public restraurants: any = [];
  public orderDetails: any = [];
  nrSelect: any;
  addOrder: any;
  vendorId: any;
  serviceLocationId: any;
  discountPrice: any;
  totalPrice: number = 0;
  paymentMethod: any;
  addAddress: any;
  finalPrice: any;
  serviceCharge: any;
  alternate: any;

  addName: any;
  addPhone: any;

  minOrder: any;
  offerPercentage: any;
  maxOfferAmount: any;

  public deliveryArea: any = [];

  addItems: any = [];
  totalPriceChel: number = 0;
  isLoadMoreBtn: boolean;

  categories: any = [];
  categoriesId: any;

  preferredTimeObj: any = [
    { name: '09 AM - 06 PM', id: '0' },
    { name: '09 AM - 01 PM', id: '1' },
    { name: '01 PM - 06 PM', id: '3' },
  ];

  preferredTime: any;
  constructor(private router: Router, private Api: ApiUserProvider) {}

  ngOnInit() {
    this.isLoadMoreBtn = true;
    this.getLocation();
    this.getEnabledCategories();
  }

  getLocation() {
    this.Api.getLocations().subscribe((data) => {
      this.deliveryArea = data['data'];
      this.isLoadMoreBtn = false;
    });
  }

  getItem(order) {
    if (this.orderDetails.indexOf(order) == -1) {
      this.orderDetails.push(order);
    } else {
      this.orderDetails[this.orderDetails.indexOf(order)] = order;
    }

    // //console.log(this.orderDetails);
    this.totalPriceChel = 0;

    this.orderDetails.forEach((element) => {
      // //console.log(element.orderPrice)
      this.totalPriceChel = this.totalPriceChel + parseInt(element.orderPrice);
    });
  }

  placeOrder() {
    this.serviceCharge = this.deliveryArea[this.serviceLocationId - 1].charge;
    let orderData = {
      discountPrice: '0',
      deliveryFee: 0,
      paymentMode: this.paymentMethod,
      locationId: this.serviceLocationId,
      address: this.addAddress,
      alt_mobile: this.alternate,
      lat: null,
      lng: null,
      items_data: this.addOrder,
      preferredTime: this.preferredTime,
      subCategory: this.categoriesId,
      categoryId: '4',
      newUser: {
        first_name: this.addName,
        last_name: this.addName,
        mobile: this.addPhone,
      },
      taxPercentage: 0,
      tax: 0,
    };

    this.Api.getTaxesFn().subscribe((data) => {
      if (data) {
        let values = data.data;
        orderData.taxPercentage = values.tax.replace(/%/g, '');

        this.Api.createMisOrder(orderData).subscribe(
          (data) => {
            alert(data.message);
            this.router.navigate(['dashboard/orderList']);
            this.isLoadMoreBtn = false;
          },
          (error) => {
            this.isLoadMoreBtn = false;
          }
        );
      }
    }),
      (error) => {
        this.isLoadMoreBtn = false;
        alert(error.message);
      };
  }

  getEnabledCategories() {
    this.Api.getSubCategories(4).subscribe((data) => {
      console.log(data, 'data:::');
      this.categories = data['data'];
    });
  }
}
