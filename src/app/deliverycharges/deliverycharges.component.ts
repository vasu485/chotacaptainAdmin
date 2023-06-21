import { Component, OnInit } from '@angular/core';
import { ApiUserProvider } from 'src/providers/api-user/api-user';

@Component({
  selector: 'app-deliverycharges',
  templateUrl: './deliverycharges.component.html',
  styleUrls: ['./deliverycharges.component.css']
})
export class DeliverychargesComponent implements OnInit {
  locationArr:any = [];
  editLocationArr:any = [];
  isActiveLocation:any;
  openModel: boolean;

  name:any;
  lat;
  lon;
  charge:any;
  isEditMode=false;
  id: any;


  constructor(private Api: ApiUserProvider) { }

  ngOnInit() {
   this.getLocationsFn();
  }

getLocationsFn() {

    this.Api.getDeliveryChargesFn().subscribe(data => {
       this.locationArr = data['data'];
    });
  }


  updateLocationsFn(detailsLoc) {
    this.Api.updateLocations(detailsLoc).subscribe(data => {
       // //console.log(data);

    });
  }

  updateLocationsFn1(detailsLoc) {
    this.Api.createDeliveryCharges(detailsLoc).subscribe(data => {
       // //console.log(data);
       this.closeFn();
       this.getLocationsFn()
    });
  }
  updatePartnerLocation(detailsLoc) {
    this.Api.updateDeliveryCharge(detailsLoc).subscribe(data => {
       // //console.log(data);
       this.closeFn();
       this.getLocationsFn()
    });
  }


  isActive(location, index){
    let details: any = {
      "id": location.id,
      "name": location.name,
      "lat":location.lat,
      "lon":location.lon,
      "is_active": location.is_active == 1 ? 0 : 1
    }
    this.locationArr[index].is_active = details.is_active;
    this.updateLocationsFn(details)
  }

  isEdit(location, index){

    this.isEditMode=location?true:false;
    this.editLocationArr = location;
    this.lat =  this.editLocationArr.cost;
    this.name=this.editLocationArr.distance;
    this.id=location.id
   
      this.openModel = true;
  }


  closeFn(){
    this.editLocationArr = null;
      this.openModel = false;
  }

  create(){

    let details: any = {
      "distance": this.name,
      cost:this.lat,
    
     
      
    }
    this.updateLocationsFn1(details)

  }
  isUpdate(){
    let details: any = {
      "distance": this.name,
      cost:this.lat,
     
      id:this.id
      
      
    }
    this.updatePartnerLocation(details)
  }


  isUpdateActive(){
    this.isActiveLocation = this.isActiveLocation == 1 ? 0 : 1;
  }

}
