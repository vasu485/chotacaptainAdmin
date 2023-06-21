import { Component, OnInit } from '@angular/core';
import { faHome, faBalanceScale } from '@fortawesome/free-solid-svg-icons';

import { Base64 } from 'js-base64';

import {
  faPlusSquare,
  faPencilAlt,
  faChartLine,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

import { Router } from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit {
  sidebarCollapse: boolean = true;
  faHome = faHome;
  faBalanceScale = faBalanceScale;
  faPlusSquare = faPlusSquare;
  faPencilAlt = faPencilAlt;
  faCaretDown = faCaretDown;

  selectTab: any;

  menus: any = [
    { name: 'Home', url: 'orderList', icon: 'faHome', hide: true },
    // { name: 'Call Order', url: 'addOrder', icon: 'faPlusSquare', hide: true },
    // {
    //   name: 'Order Misc',
    //   url: 'addMiscOrder',
    //   icon: 'faPlusSquare',
    //   hide: true,
    // },
    // {
    //   name: 'Appliance Repair',
    //   url: 'addServiceOrder',
    //   icon: 'faPlusSquare',
    //   hide: true,
    // },
    {
      name: 'Delivery Boys',
      url: 'addDeliveryBoys',
      icon: 'faHome',
      hide: true,
    },
    {
      name: 'Vendors',
      hide: true,
      url: 'addvendor',
      icon: 'faHome',
      items: [
        { name: 'Food', url: 'addvendor', id: '1' },
        { name: 'Vegtables/Fruites', url: 'addvendor', id: '21' },
        { name: 'Meat', url: 'addvendor', id: '20' },
      ],
    },
    {
      name: 'Order Items',
      url: 'addItems',
      icon: 'faHome',
      items: [
        { name: 'Food Items', url: 'addItems', id: '1' },
        { name: 'Vegtables/Fruites Items', url: 'addItems', id: '21' },
        { name: 'Meat Items', url: 'addItems', id: '20' },
      ],
      hide: true,
    },

    { name: 'Offers', url: 'offers', icon: 'faHome', hide: true },
    { name: 'Locations', url: 'locations', icon: 'faPlusSquare', hide: true },
    { name: 'Settlement', url: 'settlement', icon: 'faHome', hide: true },
    { name: 'Executive status', url: 'executive', icon: 'faHome', hide: true },
    { name: 'Partners', url: 'partners', icon: 'faHome', hide: true },
    { name: 'location Partners', url: 'locationPartners', icon: 'faHome', hide: true },
    { name: 'Delivery charges', url: 'deliverycharges', icon: 'faHome', hide: true },

    
    { name: 'Others', url: 'others', icon: 'faHome', hide: true },
  ];  

  constructor(private router: Router) {}

  ngOnInit(): void {
    let role = Base64.decode(sessionStorage.getItem('valid'));
    if (localStorage.getItem('lid') && localStorage.getItem('lid') !=='null' && localStorage.getItem('lid') !=='undefined'){
      this.menus=[
        { name: 'Home', url: 'orderList', icon: 'faHome', hide: true },
        // { name: 'Call Order', url: 'addOrder', icon: 'faPlusSquare', hide: true },
        // {
        //   name: 'Order Misc',
        //   url: 'addMiscOrder',
        //   icon: 'faPlusSquare',
        //   hide: true,
        // },
        // {
        //   name: 'Appliance Repair',
        //   url: 'addServiceOrder',
        //   icon: 'faPlusSquare',
        //   hide: true,
        // },
        {
          name: 'Delivery Boys',
          url: 'addDeliveryBoys',
          icon: 'faHome',
          hide: true,
        },
        {
          name: 'Vendors',
          hide: true,
          url: 'addvendor',
          icon: 'faHome',
          items: [
            { name: 'Food', url: 'addvendor', id: '1' },
            { name: 'Vegtables/Fruites', url: 'addvendor', id: '21' },
            { name: 'Meat', url: 'addvendor', id: '20' },
          ],
        },
        {
          name: 'Order Items',
          url: 'addItems',
          icon: 'faHome',
          items: [
            { name: 'Food Items', url: 'addItems', id: '1' },
            { name: 'Vegtables/Fruites Items', url: 'addItems', id: '21' },
            { name: 'Meat Items', url: 'addItems', id: '20' },
          ],
          hide: true,
        },
    
        { name: 'Settlement', url: 'settlement', icon: 'faHome', hide: true },
    
        
        { name: 'Others', url: 'others', icon: 'faHome', hide: true },
      ];
  }
    if (role === 'OPERATOR') {
      this.menus = [
        { name: 'Home', url: 'orderList', icon: 'faHome', hide: true },
        {
          name: 'Call Order',
          url: 'addOrder',
          icon: 'faPlusSquare',
          hide: true,
        },
        {
          name: 'Order Misc',
          url: 'addMiscOrder',
          icon: 'faPlusSquare',
          hide: true,
        },
        {
          name: 'Appliance Repair',
          url: 'addServiceOrder',
          icon: 'faPlusSquare',
          hide: true,
        },
        // { name: 'Delivery Boys', url: 'addDeliveryBoys', icon: 'faHome', hide:true, },
        {
          name: 'Executive status',
          url: 'executive',
          icon: 'faHome',
          hide: true,
        },
        // { name: 'Locations', url: 'locations', icon: 'faPlusSquare', hide:true, },
      ];
    } else if (role === 'EDITOR') {
      this.menus = [
        {
          name: 'Vendors',
          hide: true,
          url: 'addvendor',
          icon: 'faHome',
          items: [
            { name: 'Food', url: 'addvendor', id: '1' },
            { name: 'Vegtables/Fruites', url: 'addvendor', id: '21' },
            { name: 'Meat', url: 'addvendor', id: '20' },
          ],
        },
        {
          name: 'Delivery Boys',
          url: 'addDeliveryBoys',
          icon: 'faHome',
          hide: true,
        },

        {
          name: 'Order Items',
          url: 'addItems',
          icon: 'faHome',
          items: [
            { name: 'Food Items', url: 'addItems', id: '1' },
            { name: 'Vegtables/Fruites Items', url: 'addItems', id: '21' },
            { name: 'Meat Items', url: 'addItems', id: '20' },
          ],
          hide: true,
        },

        { name: 'Offers', url: 'offers', icon: 'faHome', hide: true },
        {
          name: 'Locations',
          url: 'locations',
          icon: 'faPlusSquare',
          hide: true,
        },
      ];
    } else if (role === 'FINANCE') {
      this.menus = [
        { name: 'Settlement', url: 'settlement', icon: 'faHome', hide: true },
      ];
    }else if(role === 'partner'){
      this.menus=[
        { name: 'Home', url: 'orderList', icon: 'faHome', hide: true },
        // { name: 'Call Order', url: 'addOrder', icon: 'faPlusSquare', hide: true },
        // {
        //   name: 'Order Misc',
        //   url: 'addMiscOrder',
        //   icon: 'faPlusSquare',
        //   hide: true,
        // },
        // {
        //   name: 'Appliance Repair',
        //   url: 'addServiceOrder',
        //   icon: 'faPlusSquare',
        //   hide: true,
        // },
        {
          name: 'Delivery Boys',
          url: 'addDeliveryBoys',
          icon: 'faHome',
          hide: true,
        },
        {
          name: 'Vendors',
          hide: true,
          url: 'addvendor',
          icon: 'faHome',
          items: [
            { name: 'Food', url: 'addvendor', id: '1' },
            { name: 'Vegtables/Fruites', url: 'addvendor', id: '21' },
            { name: 'Meat', url: 'addvendor', id: '20' },
          ],
        },
        {
          name: 'Order Items',
          url: 'addItems',
          icon: 'faHome',
          items: [
            { name: 'Food Items', url: 'addItems', id: '1' },
            { name: 'Vegtables/Fruites Items', url: 'addItems', id: '21' },
            { name: 'Meat Items', url: 'addItems', id: '20' },
          ],
          hide: true,
        },
    
        { name: 'Offers', url: 'offers', icon: 'faHome', hide: true },
        { name: 'Settlement', url: 'settlement', icon: 'faHome', hide: true },
        { name: 'Executive status', url: 'executive', icon: 'faHome', hide: true },
        { name: 'Delivery charges', url: 'deliverycharges', icon: 'faHome', hide: true },
    
        
        { name: 'Others', url: 'others', icon: 'faHome', hide: true },
      ];  
    }
  }

  menuToggle(eve: boolean) {
    this.sidebarCollapse = eve;
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

  openLocations() {
    this.router.navigate(['dashboard/locations']);
  }

  gotoLink(link, id?: any) {
    if (id) {
      this.router.navigate(['dashboard/' + link, id]);
    } else {
      this.router.navigate(['dashboard/' + link]);
    }
  }
}
