import { Component, OnInit, TemplateRef } from '@angular/core';

import { ApiUserProvider } from '../../providers/api-user/api-user';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css'],
})
export class AddItemsComponent implements OnInit {
  public details: any = [];
  public menu: any = [];
  public menuList: any = [];
  public finalMenuList: any = [];
  public imageUrl: string;
  public restraurants: any = [];
  public orderDetails: any = [];
  nrSelect: any;
  faEdit = faEdit;
  vendorId: any;
  isView: any;
  isViewgroup: any;
  isViewItems: boolean;
  isLoading: boolean;

  public typeoption: any = [
    { id: 0, name: 'v' },
    { id: 1, name: 'nv' },
  ];
  name: any;
  price: any;
  ratingCount = 5;
  itemType: any;
  itemGroup: any;
  itemActive: boolean = true;

  itemGroupTypes: any = [];
  groupName: any;
  groupId: any;
  groupActive: boolean = true;

  idItem: any;

  terms: any;
  modalRef: BsModalRef;

  categoryId: any;
  message: any;
  openCount: any;
  closeCount: any;
  totalCount: any;

  priceQuantity: any = [];
  priceQuantityEdit: any = [];

  public deliveryArea: any = [];
  selectedActivelink:any;
  menuItems = [
    { name: 'Food', url: 'addvendor', id: '1' },
    { name: 'Vegtables/Fruites', url: 'addvendor', id: '21' },
    { name: 'Meat', url: 'addvendor', id: '20' },
    { name: 'Groceries', url: 'addvendor', id: '18' },
  ]
  locationListArr: any;
  displayItems=Number(localStorage.getItem('lid'))>0;;
  location;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private Api: ApiUserProvider,
    private modalService: BsModalService,
    private route: ActivatedRoute
  ) {

    this.form = this.fb.group({
      img: [null],
    });

  }

  ngOnInit() {
    // this.route.paramMap.subscribe((params) => {
    //   this.categoryId = params.get('id');
    //   this.restraurants = [];
    //   this.itemGroupTypes = [];
    //   this.orderDetails = [];
    //   this.finalMenuList = [];
    //   this.isViewItems = false;
    //   this.vendorId = null;
    //   this.nrSelect = null;

    //   this.getrestarentsFn();
    // });
    this.Api.getPartnerLocationsFn().subscribe(data => {
      this.locationListArr = data['data'];
   });
  }
  selectLoc(){
    this.displayItems=true
  }

  gotoVendorList(id){
   this.categoryId = id;
      this.restraurants = [];
      this.itemGroupTypes = [];
      this.orderDetails = [];
      this.finalMenuList = [];
      this.isViewItems = false;
      this.vendorId = null;
      this.nrSelect = null;

      this.getrestarentsFn();
  }

  getrestarentsFn() {
    this.isLoading = true;
    let vendorData: any = {
      offset: '0',
      limit: '200',
      category: this.categoryId,
      locationid:this.location??localStorage.getItem("lid")
    };

    this.Api.getRestraurants(vendorData).subscribe((data) => {
      this.restraurants = data['data'];
      this.message = data['message'];
      this.openCount = data['openCount'];
      this.closeCount = data['closeCount'];
      this.totalCount = data['totalCount'];

      this.isLoading = false;
    });
  }

  getMenuFn(id) {
    this.vendorId = id;
    // this.finalMenuList = null;
    this.getItemGroup(this.vendorId);
    this.isLoading = true;
    this.Api.getMenuFn(id).subscribe(
      (data) => {
        let datacontent = data['data'];
        //console.log(datacontent, "datadatadatadatadata")
        this.isViewItems = true;
        this.isLoading = false;
          if (data) {
            this.finalMenuList = datacontent['menu'];
          }
      },
      (error) => {
        alert(error.error.message);
        this.isLoading = true;
        // //console.log('error::::::', error);
      }
    );

    // //console.log(this.finalMenuList);
  }

  showItems(id) {
    this.getMenuFn(id);
  }

  openModel(
    template: TemplateRef<any>,
    isFrom?: any,
    groupId?: any,
    items?: any
  ) {
    this.isView = isFrom;

    if (isFrom == 'edit') {
      this.idItem = items.id;
      this.name = items.name;
      this.price = items.price;
      this.ratingCount = items.rating;
      this.itemType = items.type;
      this.itemGroup = groupId.id;
      this.itemActive = items.is_active;
      this.priceQuantityEdit = items.price_quantity;
    } else {
      this.name = null;
      this.price = null;
      this.ratingCount = null;
      this.itemType = null;
      this.itemGroup = null;
      this.itemActive = true;
      this.priceQuantityEdit =null;
    }

    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  decline(): void {
    this.modalRef.hide();
  }

  getItemGroup(id) {
    this.Api.getItemGroup(id).subscribe(
      (data) => {
        this.itemGroupTypes = data['data'];
        // //console.log(this.itemGroupTypes, " this.itemGroupTypes:::");
      },
      (error) => {
        // alert(error.message);
        // //console.log('error::::::', error);
      }
    );
  }

  isActiveItem(groupId?: any, items?: any) {
    this.idItem = items.id;
    this.name = items.name;
    this.price = items.price;
    this.ratingCount = items.rating;
    this.itemType = items.type;
    this.itemGroup = groupId.id;
    this.itemActive = items.is_active = !items.is_active;

    this.updateItem();
  }

  opengroupModel(template?: TemplateRef<any>, isFrom?: any, group?: any) {
    this.isViewgroup = isFrom;
    // //console.log(group)
    if (this.isViewgroup == 'edit') {
      this.groupName = group.group;
      this.groupId = group.id;
    } else {
      this.groupName = null;
      this.groupId = null;
    }
    // //console.log(this.groupName, this.groupId, this.groupActive);
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  isActive(group) {
    this.groupActive = !this.groupActive;
    this.groupName = group.group;
    this.groupId = group.id;
  }

  createGroupItem() {
    let details = {
      vendorId: this.vendorId,
      name: this.groupName,
    };
    this.Api.createItemGroup(details).subscribe(
      (data) => {
        this.groupName = null;
        this.getMenuFn(this.vendorId);
        this.modalRef.hide();
      },
      (error) => {
        // alert(error.message);
        // //console.log('error::::::', error);
      }
    );
  }

  updateGroupItem() {
    let details = {
      vendorId: this.vendorId,
      name: this.groupName,
      id: this.groupId,
      is_active: true,
    };

    // //console.log(details);
    this.Api.updateItemGroup(details).subscribe(
      (data) => {
        this.groupName = null;
        this.getMenuFn(this.vendorId);
        this.modalRef.hide();
      },
      (error) => {
        // alert(error.message);
        // //console.log('error::::::', error);
      }
    );
  }

  groupInactive(group) {
    let details = {
      vendorId: this.vendorId,
      name: group.group,
      id: group.id,
      is_active: (group.is_active = !group.is_active),
    };

    // //console.log('Active', details);
    this.Api.updateItemGroup(details).subscribe(
      (data) => {
        this.groupName = null;
        this.getMenuFn(this.vendorId);
      },
      (error) => {
        // alert(error.message);
        // //console.log('error::::::', error);
      }
    );
  }

  createItem() {
    let details = {
      vendorId: this.vendorId,
      name: this.name,
      price: this.price,
      item_groupId: this.itemGroup,
      rating: '2',
      type: this.itemType,
    };

    // //console.log(details, "createItem");

    this.Api.createItem(details).subscribe(
      (data) => {
        this.deliveryArea = data['data'];
        this.name = null;
        this.price = null;
        this.ratingCount = null;
        this.itemType = null;
        this.itemGroup = null;

        this.getMenuFn(this.vendorId);
        this.modalRef.hide();
      },
      (error) => {
        // alert(error.message);
        // //console.log('error::::::', error);
      }
    );
  }

  createMeatVegItem() {
    let meatDetails = {
      vendorId: this.vendorId,
      name: this.name,
      item_groupId: this.itemGroup,
      rating: '4',
      type: this.itemType,
      price_quantity: this.priceQuantity,
    };

    

    this.Api.createMeatVegItem(meatDetails).subscribe(
      (data) => {
        this.deliveryArea = data['data'];
        this.name = null;
        this.price = null;
        this.ratingCount = null;
        this.itemType = null;
        this.itemGroup = null;

        this.getMenuFn(this.vendorId);
        this.modalRef.hide();
      },
      (error) => {
        // alert(error.message);
        // //console.log('error::::::', error);
      }
    );
  }

  updateItem() {
    let details = {
      id: this.idItem,
      name: this.name,
      price: this.price,
      item_groupId: this.itemGroup,
      vendorId: this.vendorId,
      createdOn: '2020-02-23 12:47:16',
      rating: '2',
      type: this.itemType,
      is_active: this.itemActive ? 1 : 0,
    };

    // //console.log(details, "updateItem");

    this.Api.updateItem(details).subscribe(
      (data) => {
        this.name = null;
        this.price = null;
        this.ratingCount = null;
        this.itemType = null;
        this.itemGroup = null;

        this.getMenuFn(this.vendorId);
        this.modalRef?.hide();
      },
      (error) => {
        // alert(error.message);
        // //console.log('error::::::', error);
      }
    );
  }

  updateMeatVegItem() {
    let details = {
      id: this.idItem,
      name: this.name,
      price: this.price,
      item_groupId: this.itemGroup,
      vendorId: this.vendorId,
      createdOn: '2020-02-23 12:47:16',
      rating: '2',
      type: this.itemType,
      is_active: this.itemActive ? 1 : 0,
      price_quantity: this.priceQuantity
    };

    // //console.log(details, "updateItem");

    this.Api.updateMeatVegItem(details).subscribe(
      (data) => {
        this.name = null;
        this.price = null;
        this.ratingCount = null;
        this.itemType = null;
        this.itemGroup = null;

        this.getMenuFn(this.vendorId);
        this.modalRef.hide();
      },
      (error) => {
        // alert(error.message);
        // //console.log('error::::::', error);
      }
    );
  }

  receiveNotification(priceQuantity: any) {
    const usersByLikes = priceQuantity.map((item) => {
      return (
        item.quantity &&
        item.price && { quantity: item.quantity, price: item.price }
      );
    });

    const prices = usersByLikes.filter((x) => x);
    this.priceQuantity = prices;
  }

  createItemHandler() {
    if (this.categoryId != 1) {
      this.createMeatVegItem();
    } else {
      this.createItem();
    }
  }

  updateItemHandler(){
    if (this.categoryId != 1) {
      this.updateMeatVegItem();
    } else {
      this.updateItem();
    }
  }

  createDisabled() {
    if (
      this.categoryId == 1 &&
      (!this.name || !this.price || !this.itemType || !this.itemGroup)
    ) {
      return true;
    }

    if (
      this.categoryId != 1 &&
      !this.name &&
      this.priceQuantity.length == 0 &&
      !this.itemType &&
      !this.itemGroup
    ) {
      return true;
    }

    return false;
  }

 

  selectedFiles: FileList;
  selectedId: any;
  currentFileUpload: File;
  form: FormGroup;
  uploadForm: FormGroup;
  fileToUpload: any;
  imageUrlNew: any;

  
  uploadImage(event, id, media) {

    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      img: file,
    });

    

    //console.log(media, "imageimageimageimageimageimage", )

    let reader = new FileReader();

    reader.onload = (event: any) => {
      this.imageUrlNew = event.target.result;
      media.image = this.imageUrlNew;
    };
    reader.readAsDataURL(file);
    this.form.get('img').updateValueAndValidity();
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.selectedId = id;

}

submit() {
  const payload = new FormData();
  payload.append('itemId', this.selectedId);
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


  this.Api.itemImageUpload(files).subscribe(
    (data) => {
      
      this.getMenuFn(this.vendorId);
      //console.log(data, ' this.types:::');
    },
    (error) => {
      this.isLoading = false;
      alert('Upload failed.....');
    }
  );
}


}
