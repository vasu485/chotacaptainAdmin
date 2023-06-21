import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiUserProvider } from 'src/providers/api-user/api-user';

import {AgmMap, MapsAPILoader  } from '@agm/core';  

@Component({
  selector: 'app-executive-status',
  templateUrl: './executive-status.component.html',
  styleUrls: ['./executive-status.component.css']
})
export class ExecutiveStatusComponent implements OnInit {

  @ViewChild(AgmMap,{static: true}) public agmMap: AgmMap;  

  
  openModel: boolean;
  openModel1: boolean;
  isLoading:boolean;
  statusBoys:any = [];
  excutive:any = [];
  searchText:string='';

  ActiveCount:number = 0;
  InActiveCount:number = 0;

  orders:any;
  first_name:any;
  type:any;
  toDateDis:any;
  lat = 28.704060;
  long = 77.102493;
  googleMapType = 'satellite';

  orderList:any = [];


  selectDate:any;

  constructor(private Api: ApiUserProvider, private apiloader: MapsAPILoader) { }

  ngOnInit(): void {
    let dtToday = new Date();

    let  month = dtToday.getMonth() + 1;
    let  day = dtToday.getDate();
    let  year = dtToday.getFullYear();

    let m;
    let d;
    if(month < 10){
      m = '0' + month.toString();
    }else{
      m = month.toString();
    }
        
    if(day < 10){
      d = '0' + day.toString();
    }else{
      d = day.toString();
    }
       
        

    this.selectDate = year + '-' + m + '-' + d;   

this.toDateDis =  year + '-' + m + '-' + d; 
    this.currentOrdersStatusFn();
  }


  currentOrdersStatusFn() {
    this.isLoading = true;

    let details = {
      "date":[this.selectDate]
    }

    this.Api.currentOrdersStatusFn(details).subscribe(data => {

       let active = data['data'].filter(x => x.is_active == 1);

      active.sort((a, b) => a.delivered_orders.length - b.delivered_orders.length);


       let inactive = data['data'].filter(x => x.is_active == 0);

       inactive.sort((a, b) => a.delivered_orders.length - b.delivered_orders.length);

       this.InActiveCount = inactive.length;
       this.ActiveCount = active.length;
       this.statusBoys = active.concat(inactive);
       this.isLoading = false;
    });
  }


  showOrders(orders, first_name, type){

    if(orders.length > 0){
      this.openModel = true;
      this.orders = orders;
      this.first_name = first_name;
      this.type = type;
    }
  
  }

  closeFn(){
    this.openModel=false;
    this.openModel1 = false;
    this.orderList = [];
  }

  showLocation(excutive){

    //console.log(excutive)
    this.excutive = excutive;

    if(excutive.lat && excutive.lng){
      this.openModel1 = true;

     this.get(parseFloat( excutive.lat ), parseFloat( excutive.lng))  
    // this.agmMap.triggerResize(true);  
  


    }
   
  }


  get(lat, lng) {  
    this.apiloader.load().then(() => {  
      let geocoder = new google.maps.Geocoder;  
      let latlng = {  
          lat: lat,  
          lng: lng  
      };  
      geocoder.geocode({  
          'location': latlng,  
      }, function(results) {  
          if (results[0]) {  
              this.currentLocation = results[0].formatted_address;  
              //console.log(this.assgin);  
          } else {  
              //console.log('Not found');  
          }  
      });  
  }); 
}   


mapClicked($event: MouseEvent) {  
  // this.latitude = $event.coords.lat,  
  //     this.longitude = $event.coords.lng  
  // this.apiloader.load().then(() => {  
  //     let geocoder = new google.maps.Geocoder;  
  //     let latlng = {  
  //         lat: this.latitude,  
  //         lng: this.longitude  
  //     };  
  //     geocoder.geocode({  
  //         'location': latlng  
  //     }, function(results) {  
  //         if (results[0]) {  
  //             this.currentLocation = results[0].formatted_address;  
  //             //console.log(this.currentLocation);  
  //         } else {  
  //             //console.log('Not found');  
  //         }  
  //     });  
  // });  
}  


showOrderDetails(id){
  this.orderList = [];

this.Api.getOrderDetails(id)
      .subscribe((data) => {

        this.orderList = data['data'];
      },
      (error) => {
        // alert(error.message);
      });
}

}
