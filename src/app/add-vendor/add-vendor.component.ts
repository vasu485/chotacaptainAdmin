import { Component, OnInit, TemplateRef } from '@angular/core';

import { ApiUserProvider } from '../../providers/api-user/api-user';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css'],
})
export class AddVendorComponent implements OnInit {
  public details: any = [];
  public menu: any = [];
  public menuList: any = [];
  public finalMenuList: any = [];
  public courseType: any = [];
  public imageUrl: string;
  public restraurants: any = [];
  public orderDetails: any = [];
  public acceptNotDeliver: boolean;

  public types: any = [];
  nrSelect: any;
  terms: any;
  faEdit = faEdit;

  modalRef: BsModalRef;

  addName: any;
  addPhone: any;
  description: any;
  address: any;
  open_time: Date;
  close_time: Date;
  rating: boolean;
  typeVal: any = [];

  idVendor: any;

  minOrder: any;
  offerPercentage: any;
  maxOfferAmount: any;

  openT: string = 'AM';
  closeT: string = 'PM';
  public deliveryArea: any = [];

  isView: any;

  vendorData: any;
  percentageChotu: any;
  payableItemTax: any;
  originalItemTax: any;


  name: any;

  deliveryTime: any;
  freeDelivery: boolean;
  isLoading: boolean;
  validOpentime = true;
  validClosetime = true;
  public files: any[];

  showVendors: boolean;
  media: any;
  mediaImage: any;
  public sortRestraurants: any = [];

  form: FormGroup;
  uploadForm: FormGroup;

  fileToUpload: any;
  imageUrlNew: any;

  categoryId: any;

  message: any;
  openCount: any;
  closeCount: any;
  totalCount: any;
  selectedActivelink: any;

  license: any;
  mobile: any;

  lat: any;
  lng: any;

  menuItems = [
    { name: 'Food', url: 'addvendor', id: '1' },
    { name: 'Vegtables/Fruites', url: 'addvendor', id: '21' },
    { name: 'Meat', url: 'addvendor', id: '20' },
    { name: 'Groceries', url: 'addvendor', id: '18' },
  ];
  locationListArr: any;
  location;
  displayItems=Number(localStorage.getItem('lid'))>0;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private Api: ApiUserProvider,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      img: [null],
    });
  }

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   //console.log(params.get('id'), "sdsdsdsdsd");// OUTPUT 1534
    //   this.categoryId = params.get('id');
    //   this.getRestarnent();
    // });

    // this.getRestarnent();
    this.Api.getPartnerLocationsFn().subscribe(data => {
      this.locationListArr = data['data'];
   });
    this.getTags();
  }
  selectLoc(){
    this.displayItems=true
  }

  gotoVendorList(id) {
    this.categoryId = id;
    this.getRestarnent();
  }

  isValid(event: boolean): void {
    this.validOpentime = event;
  }

  isValidClose(event: boolean): void {
    this.validClosetime = event;
  }

  formatAMPM(date) {
    let hours = date.getHours();
    if (hours == null) {
      return null;
    }

    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  updateTaxOnItems(data, details?: any) {

    console.log(data, details)


    let vendor = {
      "vendorId": details?.id || data.data.vendorId
    }


    this.Api.updateTaxOnItems(vendor).subscribe(
      (datas) => {
        this.isLoading = false;
        this.deliveryArea = data['data'];
        this.addName = null;
        this.addPhone = null;
        this.description = null;
        this.address = null;
        this.open_time = null;
        this.close_time = null;
        this.rating = null;
        this.idVendor = null;
        this.typeVal = null;
        this.license = null;
        this.mobile = null;
        this.lat = null;
        this.lng = null;
        this.acceptNotDeliver = false;
        this.payableItemTax = null;
        this.originalItemTax = null;
        this.percentageChotu = null;

        this.modalRef.hide();

        this.getRestarnent();

        alert(data.message);
      },
      (error) => {
        this.isLoading = false;
      }
    );
    // http://159.89.171.183/api/v1/admin/updateNewItemPriceBasedOnVendorOriginalItemTax
  }

  addVendor() {
    this.isLoading = true;
    let details = {
      name: this.addName,
      description: this.description,
      address: this.address,
      open_time: this.formatAMPM(this.open_time),
      close_time: this.formatAMPM(this.close_time),
      tags: this.typeVal,
      website: 'NULL',
      rating: this.rating ? '5' : '0',
      categoryId: this.categoryId,
      sub_categoryId: null,
      media: this.media,
      license_no: this.license || null,
      mobile: this.mobile,
      lat: this.lat || '123456',
      lng: this.lng || '123456',
      accept_NotDeliveredOrders: this.acceptNotDeliver ? 1 : 0,
      // payable_item_tax: this.payableItemTax,
      original_item_tax: this.originalItemTax,
      percentage_to_chotu: this.percentageChotu + '%',
      locationid:Number(this.location)??localStorage.getItem("lid")
    };

    //console.log(details, 'details');
    this.Api.createVendorFn(details).subscribe(
      (data) => {

        this.updateTaxOnItems(data);

      },
      (error) => {
        // alert(error.message);
        this.isLoading = false;
        // //console.log('error::::::', error);
      }
    );
  }

  getRestarnent() {
    this.isLoading = true;
    let data = {
      offset: '0',
      limit: '2000',
      category: this.categoryId,
      locationid:this.location??localStorage.getItem('lid')
    };
    this.Api.getRestraurants(data).subscribe(
      (data) => {
        this.isLoading = false;
        this.restraurants = data['data'];
        this.message = data['message'];
        this.openCount = data['openCount'];
        this.closeCount = data['closeCount'];
        this.totalCount = data['totalCount'];

        this.sortRestraurants = this.restraurants.map((person) => ({
          vendorId: person.id,
          name: person.name,
        }));
      },
      (error) => {
        // alert(error.message);
        // //console.log('error::::::', error);
      }
    );
  }

  isActive(data) {
    // //console.log(data)
    let dataq = {
      id: data.id,
      is_active: data.is_active == 0 ? 1 : 0,
    };

    // //console.log(dataq);
    this.Api.updateVendorFn(dataq).subscribe(
      (data) => {
        alert(data.message);
        this.getRestarnent();
      },
      (error) => { }
    );
  }

  formatDate(date) {
    let AMPM = date.split(' ')[1];
    let totalHours = date.split(' ')[0].split(':');

    let hrs = Number(totalHours[0]);
    let mns = Number(totalHours[1]);

    if (AMPM === 'PM') {
      hrs = hrs != 12 ? hrs + 12 : hrs;
    }
    var d = new Date();

    d.setHours(hrs);
    d.setMinutes(mns);

    return d;
  }

  opendelivered(
    template: TemplateRef<any>,
    isFrom?: any,
    id?: any,
    vendor?: any
  ) {
    //console.log(vendor, 'vendor::::')
    this.isView = isFrom;
    this.vendorData = vendor;

    if (this.isView == 'edit') {
      this.idVendor = id;
      this.addName = this.vendorData.name;
      this.description = this.vendorData.description;
      this.address = this.vendorData.address;

      this.open_time = this.formatDate(this.vendorData.open_time);
      this.close_time = this.formatDate(this.vendorData.close_time);

      this.rating = this.vendorData.rating ? true : false;

      this.percentageChotu = this.vendorData.percentage_to_chotu;

      // this.payableItemTax = this.vendorData.payable_item_tax;

      this.originalItemTax = this.vendorData.original_item_tax;


      this.freeDelivery = this.vendorData.is_free_delivery;


      this.mediaImage = this.vendorData.media;

      this.deliveryTime = this.vendorData.delivery_time || vendor.delivery_time;

      this.license = this.vendorData.license_no || null;

      this.mobile = this.vendorData.mobile;

      this.acceptNotDeliver =
        this.vendorData.accept_NotDeliveredOrders == 1 ? true : false;

      this.lat = this.vendorData.lat;
      this.lng = this.vendorData.lng;

      if (this.vendorData.tags) {
        let dataArr: any = [];
        this.vendorData.tags.forEach((element) => {
          dataArr.push(element.id);
        });
        this.typeVal = dataArr;
      }
    } else {
      this.addName = null;
      this.addPhone = null;
      this.description = null;
      this.address = null;
      this.open_time = null;
      this.close_time = null;
      this.rating = null;
      this.idVendor = null;
      this.typeVal = null;
      this.percentageChotu = null;
      this.payableItemTax = null;

      this.originalItemTax = null;
      this.freeDelivery = null;
      this.deliveryTime = null;
      this.license = null;
      this.mobile = null;
      this.acceptNotDeliver = false;
    }

    //console.log(this.mobile, "this.mobile")
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  editVendor() {
    let details = {
      id: this.idVendor,
      name: this.addName,
      description: this.description ? this.description : null,
      address: this.address ? this.address : null,
      open_time: this.formatAMPM(this.open_time),
      close_time: this.formatAMPM(this.close_time),
      rating: this.rating ? '5' : '0',
      tags: this.typeVal,
      percentage_to_chotu: this.percentageChotu + '%',
      // payable_item_tax: this.payableItemTax,
      original_item_tax: this.originalItemTax,

      delivery_time: this.deliveryTime,
      is_free_delivery: this.freeDelivery,
      license_no: this.license || null,
      mobile: this.mobile,
      lat: this.lat,
      lng: this.lng,
      accept_NotDeliveredOrders: this.acceptNotDeliver ? 1 : 0,
    };

    let error: string = '';
    if (!details.name) {
      error = 'Name is Required';
    } else if (!details.open_time || !this.openT) {
      error += 'Open time is Required';
    } else if (!details.close_time || !this.closeT) {
      error += 'Close time is Required';
    }
    // //console.log('edit details', details);

    if (!error) {
      this.isLoading = true;
      this.Api.updateVendorFn(details).subscribe(
        (data) => {

          this.updateTaxOnItems(data, details);

          // this.isLoading = false;
          // this.getRestarnent();
          // alert(data.message);
          this.decline();
        },
        (error) => {
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
      alert(error);
    }
  }

  decline(): void {
    this.idVendor = null;
    this.modalRef.hide();
  }

  isDisabled() {
    return true;
  }

  getTags() {
    this.Api.getTypesDetails().subscribe(
      (data) => {
        this.types = data['data'];
        // //console.log(this.types, " this.types:::");
      },
      (error) => {
        // alert(error.message);
        // //console.log('error::::::', error);
      }
    );
  }

  selectedFiles: FileList;
  selectedId: any;
  currentFileUpload: File;

  uploadImage(event, id) {
    //console.log(event, '-------XXXXXXXX--------', id)
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      img: file,
    });

    const restraurant = this.restraurants.filter(
      (restraurant) => restraurant.id == id
    )[0];

    let reader = new FileReader();

    reader.onload = (event: any) => {
      this.imageUrlNew = event.target.result;
      restraurant.media = this.imageUrlNew;
    };
    reader.readAsDataURL(file);
    this.form.get('img').updateValueAndValidity();
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.selectedId = id;
  }

  submit() {
    const payload = new FormData();
    payload.append('vendorId', this.selectedId);
    payload.append('image', this.currentFileUpload);

    if (payload.append) {
      this.onUpload(payload);
    }
  }

  onUpload(files: any) {
    this.isLoading = true;
    this.selectedFiles = null;
    this.currentFileUpload = null;
    this.selectedId = null;
    this.Api.vendorImageUpload(files).subscribe(
      (data) => {
        this.isLoading = false;
        this.getRestarnent();
        //console.log(data, ' this.types:::');
      },
      (error) => {
        this.isLoading = false;
        alert('Upload failed.....');
      }
    );
  }

  sortVendors() {
    this.isLoading = true;
    let display_order = this.sortRestraurants.map((person, index) => ({
      vendorId: person.vendorId,
      display_order: index,
    }));

    let details = {
      displaySequence: display_order,
    };

    this.Api.displaySequence(details).subscribe(
      (data) => {
        this.getRestarnent();
        //console.log(data.status, ' this.types:::');
      },
      (error) => {
        this.isLoading = false;
        // alert(error.message);
      }
    );
  }
}
