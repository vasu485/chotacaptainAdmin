import { Component, OnInit } from '@angular/core';
import { ApiUserProvider } from 'src/providers/api-user/api-user';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  locationArr:any = [];
  editLocationArr:any = [];
  isActiveLocation:any;
  openModel: boolean;

  name:any;
  lname:any;
  mobile:any;
  charge:any;
  location:any;
  locationListArr: any;


  constructor(private Api: ApiUserProvider) { }

  ngOnInit() {
   this.getLocationsFn();
   this.getLocationsListFn()
  }

getLocationsFn() {
    
    this.Api.getPartners().subscribe(data => {
       this.locationArr = data['data'];
    });
  }

  getLocationsListFn() {

    this.Api.getPartnerLocationsFn().subscribe(data => {
       this.locationListArr = data['data'];
    });
  }


  updateLocationsFn(detailsLoc) {
    this.Api.updateLocations(detailsLoc).subscribe(data => {
       // //console.log(data);

    });
  }

  updateLocationsFn1(detailsLoc) {
    this.Api.createPartner(detailsLoc).subscribe(data => {
       // //console.log(data);
       this.closeFn();
       this.getLocationsFn()
    });
  }


  isActive(location, index){
    let details: any = {
      "id": location.id,
      "name": location.name,
      "charge": location.charge,
      "is_active": location.is_active == 1 ? 0 : 1
    }
    this.locationArr[index].is_active = details.is_active;
    this.updateLocationsFn(details)
  }

  isEdit(location, index){
      this.openModel = true;
  }


  closeFn(){
    this.editLocationArr = null;
      this.openModel = false;
  }

  isUpdate(){
    let details: any = {
      "first_name": this.name,
      "last_name":this.lname,
      "mobile":this.mobile,
      "privilege":1,
      "user_role":"partner",
      "locationid":this.location
      
      
    }
    this.updateLocationsFn1(details)
  }

  isUpdateActive(){
    this.isActiveLocation = this.isActiveLocation == 1 ? 0 : 1;
  }

}