import { Component, OnInit } from '@angular/core';

import { ApiUserProvider } from '../../providers/api-user/api-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  public details: any = [];
  public menu: any = [];
  public menuList: any = [];
  public finalMenuList: any = [];
  public courseType: any = [];
  public imageUrl: string;
  public restraurants: any = [];
  public orderDetails: any = [];
  nrSelect: any;

  vendorId: any;
  vendorDeliveryCharge: any;
  serviceLocationId: any;
  discountPrice: any;
  totalPrice: number = 0;
  paymentMethod: any;
  addAddress: any;
  finalPrice: any;
  serviceCharge: any;

  alternate: any;
  comments: any;

  addName: any;
  addPhone: any;

  minOrder: any;
  offerPercentage: any;
  maxOfferAmount: any;

  taxPercentage: any;

  public deliveryArea: any = [];

  addItems: any = [];
  totalPriceChel: number = 0;
  isLoading: boolean;

  orderCategorySelectId: any;

  orderCategoryList: any = [
    { name: 'Food', id: '1' },
    { name: 'Vegtables/Fruites', id: '21' },
    { name: 'Meat', id: '20' },
    { name: 'Groceries', id: '18' },
  ];

  constructor(private router: Router, private Api: ApiUserProvider) { }

  ngOnInit() {
    // ;
    this.getTaxesFn();
    this.getLocation();
  }

  orderCategorySelect() {
    this.nrSelect = null;
    this.finalMenuList = [];
    this.orderDetails = [];
    this.restraurants = [];
    this.getrestarentsFn();
  }
  getMenuFn(id) {
    this.vendorId = id;
    this.vendorDeliveryCharge = id;
    this.Api.getMenuFn(id).subscribe((data) => {
      this.isLoading = false;
      this.finalMenuList = data['data']['menu'];
      this.finalMenuList.forEach((element, index) => {
        element.manul_id = index + 1;
        this.courseType.push(element);
      });
    });
  }

  getLocation() {
    this.Api.getLocations().subscribe((data) => {
      this.deliveryArea = data['data'];
    });
  }

  getrestarentsFn() {
    this.isLoading = true;
    let vendorData: any = {
      offset: '0',
      limit: '200',
      category: this.orderCategorySelectId,
    };

    this.Api.getRestraurants(vendorData).subscribe((data) => {
      this.restraurants = data['data'];
      this.isLoading = false;
    });
  }

  viewList(id) {
    this.isLoading = true;
    const getOffers = this.restraurants.filter(
      (restraurant) => restraurant.id == id
    )[0];

    if (getOffers.offer.length > 0) {
      this.minOrder = getOffers.offer ? getOffers.offer[0].minOrder : 0;
      this.offerPercentage = getOffers.offer
        ? getOffers.offer[0].offerPercentage
        : 0;
      this.maxOfferAmount = getOffers.offer
        ? getOffers.offer[0].maxOfferAmount
        : 0;
    }

    this.getMenuFn(id);

    this.vendorDeliveryCharge = getOffers.is_free_delivery;
  }

  getItem(order) {
    // //console.log(this.orderDetails, 'this.orderDetails');
    //console.log(order.items, 'getItemgetItemgetItem');
    if (this.orderDetails.indexOf(order) == -1) {
      this.orderDetails.push(order);
    } else {
      this.orderDetails[this.orderDetails.indexOf(order)] = order;
    }

    this.totalPriceChel = 0;
    this.orderDetails.forEach((element) => {
      this.totalPriceChel = this.totalPriceChel + parseInt(element.orderPrice);
    });
  }

  placeOrder() {
    let Items: any = [];
    this.isLoading = true;
    //console.log(this.orderDetails, ' this.orderDetails:::::::::');

    if (this.orderCategorySelectId == 1) {
      this.orderDetails.forEach((element) => {
        this.totalPrice = this.totalPrice + parseInt(element.orderPrice);
        Items.push({
          itemId: element.id,
          quantity: element.count,
          price: element.updated_item_price,
        });
      });
    } else {
      this.orderDetails.forEach((element) => {
        element.items.forEach((item) => {
          Items.push({
            itemId: item.itemId,
            // quantity: item.quantity,
            quantity: `(${item.type}) X ${item.quantity}`,
            price: item.updated_item_price * item.quantity,
          });
        });
        this.totalPrice = this.totalPrice + parseInt(element.orderPrice);
      });
    }

    //console.log(Items, ' Items:::::::::');

    this.discountPrice =
      this.totalPrice >= this.minOrder
        ? (this.totalPrice / 100) * parseInt(this.offerPercentage)
        : 0;
    this.discountPrice =
      this.discountPrice && this.discountPrice >= parseInt(this.maxOfferAmount)
        ? this.maxOfferAmount
        : this.discountPrice;

    this.discountPrice = Math.round(this.discountPrice);
    this.serviceCharge = !this.vendorDeliveryCharge
      ? this.deliveryArea[this.serviceLocationId - 1].charge
      : 0;

    this.finalPrice =
      this.totalPrice + parseInt(this.serviceCharge) - this.discountPrice;

    if (Items.length == 0) {
      alert('Please select Items..');
    } else {
      let orderData = {
        vendorId: this.vendorId,
        price: this.totalPrice,
        paymentMode: this.paymentMethod,
        address: this.addAddress,
        lat: null,
        lng: null,
        items: Items || this.orderDetails.items,
        finalPrice: this.finalPrice,
        itemsPrice: this.totalPrice,
        deliveryFee: this.serviceCharge,
        locationId: this.serviceLocationId,
        discountPrice: this.discountPrice ? this.discountPrice : 0,
        extra_items: this.comments,
        alt_mobile: this.alternate,
        newUser: {
          first_name: this.addName,
          last_name: this.addName,
          mobile: this.addPhone,
        },
        tax: this.percentage(this.totalPrice, this.taxPercentage),
        taxPercentage: this.taxPercentage,
      };

      //console.log(orderData, 'orderData::::');

      // //console.log('this.restraurants:::', this.restraurants);

      this.Api.createOrder(orderData).subscribe(
        (data) => {
          alert(data.message);
          this.isLoading = false;
          this.router.navigate(['dashboard/orderList']);
        },
        (error) => {
          this.isLoading = false;
          // alert(error.message);
          // //console.log('error::::::', error);
        }
      );
    }
  }

  remove(item, index) {
    this.orderDetails.splice(index, 1);
  }

  addQuantity(menu) {
    //console.log(menu, "addQuantity")
  }

  percentage(num, per) {
    console.log(num, per);

    return ((num / 100) * per).toFixed(2);
  }

  getTaxesFn() {
    this.Api.getTaxesFn().subscribe((data) => {
      this.isLoading = false;
      if (data) {
        let values = data.data;

        this.taxPercentage = values.gstTax.replace(/%/g, '');
      }
    }),
      (error) => {
        this.isLoading = false;
        alert(error.message);
      };
  }
}
