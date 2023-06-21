import { Component, OnInit, TemplateRef } from '@angular/core';

import { ApiUserProvider } from '../../providers/api-user/api-user';
import { Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-offers',
  templateUrl: './add-offers.component.html',
  styleUrls: ['./add-offers.component.css']
})
export class AddOffersComponent implements OnInit {
  public restraurants: any = [];
  public finalofferList: any = [];
  dashbaordOffers: any = [];
  CategoriesObj: any = [];
  faEdit = faEdit;
  faTrash = faTrash;
  faTimes =faTimes;
  isAdmin=!Number(localStorage.getItem('lid'))

  vendorId: any;
  isView: any;
  nrSelect: any;
  isViewItems: boolean;

  modalRef: BsModalRef;

  isMainOfferView: boolean;
  minOrder: any;
  offerPercentage: any;
  maxAmount: any;
  offerActive: boolean = true;

  offerID: any;

  isRes: boolean;
  isMain: boolean;

  mainofferID:any;
  offerCategory: string = '1';
  offerTitle: any;
  offerDescription: any;
  isLoading:boolean;
  getAllAnnouncements:any=[];
  isActive:number = 0;

  isShow:boolean;

  menuItems = [
    { name: 'Food', url: 'addvendor', id: '1' },
    { name: 'Vegtables/Fruites', url: 'addvendor', id: '21' },
    { name: 'Meat', url: 'addvendor', id: '20' },
    { name: 'Groceries', url: 'addvendor', id: '18' },
  ]
  selectVendorType:any;

  announcementDescription:any;
  announcementTitle:any;
  constructor(private router: Router, private Api: ApiUserProvider, private modalService: BsModalService) { }

  ngOnInit() {
    this.getDashboardOfferFn();
    if(!this.isAdmin){
     this.isActive=1
    }
    
    this.getCategoriesFn();
  }

  getrestarentsFn() {
    this.isShow = false;
    this.isLoading = true;
    let vendorData: any = {
      "offset": "0",
      "limit": "200",
      "category": this.selectVendorType,
      "locationid":localStorage.getItem('lid')
    }

    this.Api.getRestraurants(vendorData).subscribe(data => {
      this.restraurants = data['data'];
      this.isLoading = false;
      this.isShow = true;
    });
  }


  getOfferFn(id) {
    this.vendorId = id;
    this.Api.getVendorOffer(id)
      .subscribe(data => {
        // //console.log(data, "data:::::::::");
        this.isViewItems = true;
        if (data) {
          this.finalofferList = data.data;
          // //console.log(this.finalofferList, "cccc");

        }
      },
        (error) => {
          alert(error.error.message);
          // //console.log('error::::::', error);
        });
  }


  createOfferFn() {
    let details = {
      "vendorId": this.vendorId,
      "minOrder": this.minOrder,
      "offerPercentage": this.offerPercentage,
      "maxOfferAmount": this.maxAmount
    }

    // //console.log('create details', details);

    this.Api.createVendorOffer(details)
      .subscribe(data => {
        // //console.log(data, "data:::::::::");
        this.isActive = -1;
        alert(data.message);
        this.decline();
        this.getOfferFn(this.vendorId);
      },
        (error) => {
          this.isActive = -1;
          alert(error.error.message);
          // //console.log('error::::::', error);
        });
  }


  showItems(id) {
    this.getOfferFn(id);
  }


  deleteOffer() {


    // //console.log('offerID', this.offerID);

    this.Api.deleteVendorOffer(this.offerID)
      .subscribe(data => {
        // //console.log(data, "data:::::::::");
        alert(data.message);
        this.decline();
        this.getOfferFn(this.vendorId);
      },
        (error) => {
          alert(error.error.message);
          // //console.log('error::::::', error);
        });
  }

  openModel(template: TemplateRef<any>, isFrom?: any, offers?: any) {

    this.offerCategory = null;
    this.offerTitle = null;
    this.offerDescription = null;


    this.isView = isFrom;

    // //console.log(offers, "offers Data")

    if (this.isView == 'delete') {
      this.offerID = offers.id;
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    } else if (this.isView == 'new') {
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }


  }

  decline(): void {
    this.modalRef.hide();
  }


  getDashboardOfferFn() {
    this.Api.getDashboardOffer()
      .subscribe(data => {
        this.dashbaordOffers = data.data;

        // //console.log(this.dashbaordOffers);
      },
        (error) => {
          alert(error.error.message);
          // //console.log('error::::::', error);
        });

  }

  updateOfferActive(template: TemplateRef<any>, item) {
    // //console.log(item);
    this.mainofferID = item.id;
    this.offerCategory = item.categoryId;
    this.offerTitle = item.title;
    this.offerDescription = item.description;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }


  updateMainOfferFn(){


    let details = {
      "id": this.mainofferID,
      "title": this.offerTitle,
      "description": this.offerDescription,
      "categoryId":  "1"
    }
    // //console.log(details, "updateOfferActive details");

    this.Api.updateDashboard(details)
    .subscribe(data => {
     alert(data.message);
     this.offerDescription = '';
     this.offerTitle = '';
     this.offerCategory = '';
     this.decline();
     this.isMainOfferView = false;
     this.getDashboardOfferFn();
     this.isActive = -1;
    },
      (error) => {
        alert(error.error.message);
        // //console.log('error::::::', error);
      });

  }


  deleteOfferActive(item) {

    // //console.log(item.id, "item.categoryId");

    this.Api.deleteDashboardOffer(item.id)
      .subscribe(data => {
        alert(data.message);
        this.getDashboardOfferFn();
        
      },
        (error) => {
          alert(error.error.message);
          // //console.log('error::::::', error);
        });

  }

  updateGroup(offerId) {
    // //console.log(offerId);
  }

  addOfferFn(template: TemplateRef<any>) {
    this.offerDescription = '';
    this.offerTitle = '';
    this.offerCategory = '';

    this.mainofferID = '';
    this.getCategoriesFn();
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  createMainOfferFn() {
    let details = {
      "title": this.offerTitle,
      "description": this.offerDescription,
      "categoryId": "1"
    }
    // //console.log(details, "create details");

    this.Api.createDashboardOffer(details)
      .subscribe(data => {
        alert(data.message);
        this.offerDescription = '';
        this.offerTitle = '';
        this.offerCategory = '';

        this.getDashboardOfferFn();
        this.modalRef.hide();

      },
        (error) => {
          alert(error.error.message);
          this.offerCategory = null;
    this.offerTitle = null;
    this.offerDescription = null;
          // //console.log('error::::::', error);
        });
  }


  getCategoriesFn() {
    this.Api.getCategoriesFn()
      .subscribe(data => {
        this.CategoriesObj = data.data;

        // //console.log(this.CategoriesObj);
      },
        (error) => {
          alert(error.error.message);
          // //console.log('error::::::', error);
        });

  }


  getAnnouncementsFn(){
    this.isLoading = true;
    //console.log("getAnnouncementsFn")
    this.Api.getAllAnnouncements()
    .subscribe(data => {
      this.getAllAnnouncements = data.data;
//console.log(this.getAllAnnouncements);
this.isLoading = false;
    },
      (error) => {
        alert(error.error.message);
        // //console.log('error::::::', error);
      });
    }

    createAnnouncementsFn(){
      this.isLoading = true;
      //console.log("getAnnouncementsFn");
      let details ={
        title: this.announcementTitle,
        description: this.announcementDescription
    }
      this.Api.createAnnouncements(details)
      .subscribe(data => {
        this.isLoading = false;
        this.announcementTitle = null;
        this.announcementDescription = null;
       this.getAnnouncementsFn()
        // //console.log(this.dashbaordOffers);
      },
        (error) => {
          alert(error.error.message);
          // //console.log('error::::::', error);
        });
      }

      deleteAnnoun(id){
        this.isLoading = true;

        this.Api.deleteAnnouncements(id)
        .subscribe(data => {
          this.isLoading = false;
         this.getAnnouncementsFn()
          // //console.log(this.dashbaordOffers);
        },
          (error) => {
            alert(error.error.message);
            // //console.log('error::::::', error);
          });
        }

    

        createAnnouncementsOpen(template: TemplateRef<any>) {
          this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
        }

        

      }


