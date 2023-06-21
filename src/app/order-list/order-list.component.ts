import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiUserProvider } from '../../providers/api-user/api-user';

import { Base64 } from 'js-base64';

@Component({
  selector: '[app-order-list]',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  modalRef: BsModalRef;
  faPlus = faPlus;
  faMinus = faMinus;
  isOpen = false;
  dropdownOpen = false;
  dropdownOpenSecond = false;
  deliveredClose: boolean = false;

  chotu_name: any = 'Select';
  chotu_Id: any;
  chotu_phone: any;
  orderId: any;

  showMore: boolean;

  boysArr: any = [];
  itemsArr: any = [];
  totalPrice: any;
  totalCount: any;
  totalDiscount: any;
  deliveryFee: any;
  tip: any;

  Order_name = 'Select';
  orderstatus: any = [];

  orderInput: any = [];

  orderUpdateInput: any = [];
  taxPercentage: any;

  updatePriceInput: number = 0;
  updatedeliveryCharges: any;

  updateDeliveryPriceInput: any;
  reason: any;
  isVisibleStatus: boolean;

  @Input() orderList: any;
  @Input() deliveryBoys: any;
  @Output() upadteOrder = new EventEmitter();

  role: any;

  constructor(
    private modalService: BsModalService,
    private Api: ApiUserProvider
  ) { }

  ngOnInit(): void {
    this.orderstatus = [
      { name: 'Confirmed', id: '2' },
      { name: 'Cooking', id: '6' },
      { name: 'Prepared', id: '8' },
      { name: 'Canceled', id: null },
      { name: 'Out of stock', id: '11' },
      { name: 'Not Delivered', id: '16' },
    ];

    this.isVisibleStatus = true;
    this.role = Base64.decode(sessionStorage.getItem('valid'));
    this.getTaxesFn()
  }

  valueChanged() {
    this.upadteOrder.emit('updated');
  }

  orderDetailsSelectedItemsPrice: any = [];

  opendelivered(
    template: TemplateRef<any>,
    order?: any,
    oderIDmain?: any,
    orderList?: any
  ) {
    this.orderInput = order;
    this.orderId = oderIDmain;
    this.orderDetailsSelectedItemsPrice = orderList.itemsPrice;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmDelivered() {
    //console.log(this.orderInput, "sdsdsd", this.reason,  this.orderDetailsSelectedItemsPrice)
    if (
      this.orderInput.id == '4' &&
      this.orderDetailsSelectedItemsPrice == null
    ) {
      alert('Please update Items price before Delivered');
    } else {
      if (this.orderInput.id) {
        let details = {
          id: this.orderId,
          status: this.orderInput.id,
          cancel_reason: this.reason,
        };
        this.updateAPI(details);
      } else {
        let details = {
          orderId: this.orderId,
          cancel_reason: this.reason,
        };
        this.cancelAPI(details);
      }
    }
  }

  openModal(
    template: TemplateRef<any>,
    id,
    name?: any,
    ordeId?: any,
    boy?: any
  ) {
    this.chotu_name = name;
    this.chotu_Id = id;
    this.orderId = ordeId;
    this.chotu_phone = boy.mobile;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    let details = {
      id: this.orderId,
      status: '12',
      deliveryBoy: this.chotu_Id,
    };
    this.updateAPI(details);
  }

  decline(): void {
    this.chotu_name = 'Select';
    this.modalRef.hide();
  }

  orderListOpenFn(id, orderList?: any) {
    if (!orderList.items_data) {
      this.Api.getOrderDetails(id).subscribe((data) => {
        let dataItems = data['data'];
        this.itemsArr = dataItems['items'];
        this.totalPrice = dataItems.itemsPrice;
        this.totalCount = dataItems.itemsPrice;
        this.deliveryFee = dataItems.deliveryFee;
        this.totalDiscount = dataItems.discountPrice;
        this.tip = dataItems.tip;
      });
    } else {
      this.itemsArr = orderList.items_data;
      this.totalPrice = orderList.itemsPrice;
      this.totalCount = orderList.itemsPrice;
      this.deliveryFee = orderList.deliveryFee;
      this.totalDiscount = orderList.discountPrice;
      this.tip = orderList.tip;
    }
  }

  updateAPI(details) {
    console.log(details, 'detailsdetails');
    this.Api.updateOrderFn(details).subscribe((data) => {
      // //console.log(data);

      this.valueChanged();
      this.modalRef.hide();

      if (details.deliveryBoy) {
        // //console.log(details)
        if (!this.orderList.items_data) {
          this.Api.getOrderDetails(this.orderList.id).subscribe((data) => {
            let oderData;
            oderData = '\n' + '';
            // //console.log(data['data'].items);

            data['data'].items.forEach((order) => {
              oderData += order.item.name + ' x' + order.quantity + '\n';
            });

            let orderMessage;
            orderMessage = 'Pickup: ' + this.orderList.vendor.name + '\n';
            orderMessage += '\n';
            orderMessage += 'Order ID: ' + this.orderList.id + '\n';
            orderMessage += 'Order: ' + oderData + '\n';
            if (this.orderList.extra_items) {
              orderMessage += 'Comments: ' + this.orderList.extra_items + '\n';
            }
            orderMessage += '\n';
            orderMessage += 'Phone: ' + this.orderList.order_by.mobile + '\n';
            orderMessage +=
              'Alternate number: ' + this.orderList.alt_mobile + '\n';
            orderMessage += 'Address: ' + this.orderList.address + '\n';
            orderMessage += 'Location: ' + this.orderList.location.name + '\n';
            orderMessage += '\n';
            orderMessage +=
              'Total Price: Rs. ' + this.orderList.finalPrice + '\n';

            // //console.log(orderMessage);

            // let encodedOrderMessage = encodeURI(orderMessage);
            // window.open('https://wa.me/+91' + this.chotu_phone + '/?text=' + encodedOrderMessage);
          });
        } else {
          let orderMessage;
          orderMessage = 'Order ID: ' + this.orderList.id + '\n';
          orderMessage += 'Order Items: ' + this.orderList.items_data + '\n';
          orderMessage +=
            'Pick up store: ' + this.orderList.pickup_store + '\n';
          if (this.orderList.extra_items) {
            orderMessage +=
              'Comments: ' + this.orderList.extra_items &&
              this.orderList.extra_items + '\n';
          }

          orderMessage += '\n';
          orderMessage += 'Phone: ' + this.orderList.order_by.mobile + '\n';
          orderMessage +=
            'Alternate number: ' + this.orderList.alt_mobile + '\n';
          orderMessage += 'Address: ' + this.orderList.address + '\n';
          orderMessage += 'Location: ' + this.orderList.location.name + '\n';
          orderMessage += '\n';
          orderMessage +=
            'Total Price: Rs. ' + this.orderList.finalPrice + '\n';
          // let encodedOrderMessage = encodeURI(orderMessage);
          // window.open('https://wa.me/+91' + this.chotu_phone + '/?text=' + encodedOrderMessage)
        }
      }
    });
  }

  cancelAPI(details) {
    this.Api.cancelOrderFn(details).subscribe((data) => {
      // //console.log(data);

      this.valueChanged();
      this.modalRef.hide();
    });
  }

  orderAssigned(data) {
    if (
      data.id == 3 ||
      data.id == 4 ||
      data.id == 11 ||
      data.id == 1 ||
      data.id == 8 ||
      data.id == 6
    ) {
      return true;
    }
  }

  percentage(num, per) {
    console.log(((num / 100) * per).toFixed(2), 'tooooooooo');
    return ((num / 100) * per).toFixed(2);
  }

  getTaxesFn() {
    this.Api.getTaxesFn().subscribe((data) => {
      if (data) {
        let values = data.data;

        this.taxPercentage = values.gstTax.replace(/%/g, '');
      }
    }),
      (error) => {
        alert(error.message);
      };
  }

  updateAmount() {
    let details = {
      id: this.orderUpdateInput.id,
      itemsPrice: this.updatePriceInput,
      status: '2',
      discountPrice: this.updatedeliveryCharges,
      additional_charge: Number(this.updateDeliveryPriceInput),
      tax: this.percentage(
        this.updatePriceInput > 0
          ? this.updatePriceInput
          : Number(this.updateDeliveryPriceInput),
        0
      ),
    };
    this.updateAPI(details);
  }

  openPrice(template: TemplateRef<any>, order?: any) {
    this.orderUpdateInput = order;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  isDisabled() {
    if (this.updatePriceInput || Number(this.updateDeliveryPriceInput)) {
      return false;
    }
    return true;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // Placed: 1
  // Confirmed: 2
  // canceled : 3
  // devivered : 4
  // On the way: 5
  // Cooking: 6
  // Payment Received: 7
  // Order Prepared : 8

  // not delevered : 16

  isVisibleStatusFn() {
    this.isVisibleStatus = true;
    // return false
  }

  getPrices(item) {
    if (item.quantity.indexOf('X') != -1) {
      return item.updated_item_price;
    }
    return item.quantity * item.price;
  }

  // this.orderstatus = [
  //   { "name": 'Confirmed', 'id': '2' },
  //   { "name": 'Cooking', 'id': '6' },
  //   { "name": 'Prepared', 'id': '8' },
  //   { "name": 'Canceled', 'id': null },
  //   { "name": 'Out of stock', 'id': '11' },
  //   { "name": 'Not Delivered', 'id': '16' },
  // ]

  retunStatus(order) {
    let list = [];

    if (this.role != 'ADMIN') {
      if (order.status.id == 1 || order.status.id == 10) {
        list.push(
          { name: 'Confirmed', id: '2' },
          { name: 'Canceled', id: null }
        );
      }

      if (order.status.id == 5) {
        list.push({ name: 'Not Delivered', id: '16' });
      }

      if (order.status.id == 2 && order.type != 'mis') {
        list.push({ name: 'Prepared', id: '8' });
      }
    }

    // Placed: 1
    // Confirmed: 2
    // canceled : 3
    // devivered : 4
    // On the way: 5
    // Cooking: 6
    // Payment Received: 7
    // Order Prepared : 8

    list.push(
      { name: 'Confirmed', id: '2' },
      { name: 'Canceled', id: null },
      { name: 'Prepared', id: '8' },
      { name: 'On the way', id: '5' },
      { name: 'Payment Received', id: '7' },
      { name: 'Delivered', id: '4' },
      { name: 'Not Delivered', id: '16' },
      { name: 'Cokking', id: '6' }
    );

    return list;
  }

  showBoy(orderList) {
    if (
      orderList.deliveryBoy ||
      orderList.status.id == 2 ||
      orderList.status.id == 1 ||
      orderList.status.id == 3 ||
      orderList.status.id == 4 ||
      orderList.status.id == 5 ||
      orderList.status.id == 8 ||
      orderList.status.id == 10 ||
      orderList.status.id == 11 ||
      orderList.status.id == 12 ||
      orderList.status.id == 16
    ) {
      return false;
    }

    return true;

    //   !orderList.deliveryBoy &&
    //   orderList.status.id != 1 &&
    //   orderList.status.id != 3 &&
    //   orderList.status.id != 4 &&
    //   orderList.status.id != 11 &&
    //  ( orderList.status.id != 2 )
  }
}
