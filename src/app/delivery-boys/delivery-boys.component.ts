import { Component, OnInit } from '@angular/core';
import { ApiUserProvider } from '../../providers/api-user/api-user';
import { Router } from '@angular/router';
import { TabDirective } from 'ngx-bootstrap/tabs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/compat';
import 'firebase/firestore';
firebase.initializeApp({
  apiKey: "AIzaSyCaB_jLyaiDvIuwcL3BZZqs8tCfb51B5Q0",
  authDomain: "chotacaptain-340ee.firebaseapp.com",
  projectId: "chotacaptain-340ee",
  storageBucket: "chotacaptain-340ee.appspot.com",
  messagingSenderId: "965145875425",
  appId: "1:965145875425:web:827b9a6447c83e53fef8a0"

})

@Component({
  selector: 'app-delivery-boys',
  templateUrl: './delivery-boys.component.html',
  styleUrls: ['./delivery-boys.component.css'],
})


export class DeliveryBoysComponent implements OnInit {
  
  boysArr: any = [];
  registerForm: FormGroup;
  submitted = false;
  terms: any;
  boyID: any;
  public isOpenBoy: boolean;
  isLoading: boolean;

  categories: any = [];

  selectedItems = [];

  isActive: number = 1;
  trackingId: any;
  locationListArr: any;
  displayItem=Number(localStorage.getItem('lid'))>0;
  location;
  constructor(
    private router: Router,
    private Api: ApiUserProvider,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.Api.getPartnerLocationsFn().subscribe(data => {
      this.locationListArr = data['data'];
   });
    this.getCategoriesFn();
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      aadhaar: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
        ],
      ],
      drivingLicense: ['', [Validators.required]],
      deliveryBoyAddress: ['', [Validators.required]],
      emergencyPhoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      boyCategory: [this.selectedItems, Validators.required],
      trackingId: ['']
    });

   // this.getBoys();
  }

  get f() {
    return this.registerForm.controls;
  }
  selectLoc(){
    this.displayItem=true
    this.getBoys()
  }
  getBoys() {
    this.isLoading = true;
    
    this.Api.getDeliveryBoys(this.location??localStorage.getItem("lid")).subscribe(
      (resp) => {
        this.boysArr = resp['data'];
        this.isLoading = false;
      },
      (error) => {
        // alert(error.message);
        // //console.log('error::::::', error);
        this.isLoading = false;
      }
    );

    // this.Api.getDeliveryBoys()
    //   .subscribe((data) => {
    //     this.boysArr = data['data'];
    //     res => // //console.log('HTTP response', res)
    //   });
  }

  showBoys(id) {
    return this.boysArr.filter((boy) => boy.is_active === id);
  }

  AddBoys() {
    if(!this.trackingId){
     firebase.firestore().collection('track').add({lat:1,lon:1}).then((re)=>{
      console.log(re)
      this.trackingId=re.id
      this.boyDetails()
     })
    }
    else{
      this.boyDetails()
    }
    
  }
  boyDetails(){
    let datsa = this.registerForm.controls;

    console.log(datsa, 'datsa.phone.value');

    this.isLoading = true;
    let details = {
      first_name: datsa.firstName.value,
      last_name: datsa.lastName.value,
      email: datsa.email.value,
      user_role: 'DELIVERY_BOY',
      mobile: datsa.phone.value,
      aadhaar: datsa.aadhaar.value,
      driving_license: datsa.drivingLicense.value,
      delivery_boy_address: datsa.deliveryBoyAddress.value,
      emergency_phone_number: datsa.emergencyPhoneNumber.value,
      boyCategory: datsa.boyCategory.value,
      trackingId: this.trackingId,
      locationid:this.location??localStorage.getItem("lid")
    };

    if (this.boyID) {
      details['id'] = this.boyID;
      this.Api.editBoy(details).subscribe(() => {
        this.isLoading = false;
        this.getBoys();
        this.registerForm.reset();
        this.isOpenBoy = false;
        this.boyID = null;
      }),
        (error) => {
          this.isLoading = false;
          // alert(error.message);
        };
    } else {
      this.Api.getSignUp(details).subscribe(
        (data) => {
          // //console.log(data.body.data.id, "new boyeeee");
          this.getItem(details, data.body.data.id);
          this.isOpenBoy = false;
        },
        (error) => {
          if (error.data && error.data.existed_user_role != 'DELIVERY_BOY') {
            let details1 = {
              id: error.data.id,
              user_role: 'delivery_boy',
            };
            this.Api.changeRole(details1).subscribe(() => {
              details['id'] = details1.id;
              this.Api.editBoy(details).subscribe(() => {
                alert('Details Updated.....');
                this.getBoys();
                this.registerForm.reset();
                this.isOpenBoy = false;
                this.boyID = null;
                this.isOpenBoy = false;
              }),
                (error) => {
                  // alert(error.message);
                  this.isOpenBoy = false;
                };
            }),
              (error) => {
                // alert(error.message);
                this.isOpenBoy = false;
              };
          } else {
            // alert(error.message);
          }
        }
      );
    }
  }

  getItem(data, addNew?: any) {
    // //console.log(data, "data");
    let details = {};
    if (!addNew) {
      details = {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        gender: 'male',
        is_active: data.is_active,
        user_role: 'delivery_boy',
      };
    } else {
      data.id = addNew;
      data.gender = 'male';
    }

    // //console.log('addNew::::::',data);

    // //console.log('addNewKaadhu::::::',details);

    this.Api.editBoy(!addNew ? details : data).subscribe(
      (data) => {
        // //console.log(data, "data");
        alert('Boy Data Updated.....');
        this.getBoys();
        this.registerForm.reset();
      },
      (error) => {
        // alert(error.message);
        // //console.log('error::::::', error);
      }
    );
  }

  editBoy(boy) {
    this.isOpenBoy = true;
    let datsa = this.registerForm.controls;
    datsa.firstName.setValue(boy.first_name);
    datsa.lastName.setValue(boy.last_name);
    datsa.email.setValue(boy.email);
    datsa.phone.setValue(boy.mobile);
    datsa.aadhaar.setValue(boy.aadhaar);
    datsa.drivingLicense.setValue(boy.driving_license);
    datsa.deliveryBoyAddress.setValue(boy.delivery_boy_address);
    datsa.emergencyPhoneNumber.setValue(boy.emergency_phone_number);
    datsa.boyCategory.setValue(boy.boyCategory);
    datsa.trackingId.setValue(boy.trackingId);
    this.trackingId=boy.trackingId


    this.boyID = boy.id;
  }

  getCategoriesFn() {
    this.isLoading = true;
    this.Api.getCategoriesFn().subscribe(
      (data) => {
        this.isLoading = false;
        this.categories = data.data;

        // //console.log(this.CategoriesObj);
      },
      (error) => {
        this.isLoading = false;
        alert(error.error.message);
        // //console.log('error::::::', error);
      }
    );
  }
}
