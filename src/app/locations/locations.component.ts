import { Component, OnInit } from '@angular/core';
import { ApiUserProvider } from '../../providers/api-user/api-user';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locationArr:any = [];
  editLocationArr:any = [];
  isActiveLocation:any;
  openModel: boolean;

  name:any;
  charge:any;


  constructor(private Api: ApiUserProvider) { }

  ngOnInit() {
   this.getLocationsFn();
  }

getLocationsFn() {

    this.Api.getLocationsFn().subscribe(data => {
       this.locationArr = data['data'];
    });
  }


  updateLocationsFn(detailsLoc) {
    this.Api.updateLocations(detailsLoc).subscribe(data => {
       // //console.log(data);

    });
  }

  updateLocationsFn1(detailsLoc) {
    this.Api.updateLocations(detailsLoc).subscribe(data => {
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
      this.editLocationArr = location;
      this.name =  this.editLocationArr.name;
      this.charge =  this.editLocationArr.charge;
      this.isActiveLocation = this.editLocationArr.is_active;
      this.openModel = true;
  }


  closeFn(){
    this.editLocationArr = null;
      this.openModel = false;
  }

  isUpdate(){
    let details: any = {
      "id": this.editLocationArr.id,
      "name": this.name,
      "charge": this.charge == 0 ? '0' : this.charge,
      "is_active": this.isActiveLocation
    }
    this.updateLocationsFn1(details)
  }

  isUpdateActive(){
    this.isActiveLocation = this.isActiveLocation == 1 ? 0 : 1;
  }

}
