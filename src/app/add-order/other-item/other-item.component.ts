import { Component, OnInit, Input, EventEmitter, Output, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'other-item',
  templateUrl: './other-item.component.html',
  styleUrls: ['./other-item.component.css'],
})
export class OtherItemComponent implements OnInit {
  @Input() menu: any;
  @Output() submitHandlerOutput = new EventEmitter();
  isSubbmitted: boolean = true;

  count: number;

  items: any = [];

  localMenu: any = [];

  numberCount: any;
  submitted = false;
  dynamicForm: FormGroup;

  itemId:any;
  addForm: FormGroup;
  rows: FormArray;
  itemForm: FormGroup;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, 
    private formBuilder: FormBuilder,
    private fb: FormBuilder) {

      this.addForm = this.fb.group({
        items: [null, Validators.required],
      });
      this.rows = this.fb.array([]);
    }

  ngOnInit() {
    this.localMenu = this.menu;

    this.addForm.addControl('rows', this.rows);

    this.itemId = this.menu.id;
  }

  setAmount(items) {
    let Ampunt = 0;
    items.forEach((element) => {
      Ampunt = Ampunt + element.count * element.price;
    });
    return Ampunt;
  }


  

  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.tickets as FormArray; }

    
  openModal(template: TemplateRef<any>) {


    this.addForm.addControl('rows', this.rows);
    this.menu.price_quantity.forEach((element) => {
      this.onAddRow(element);
    });

    this.modalRef = this.modalService.show(template);
  }


  createItemFormGroup(element?:any): FormGroup {


    return this.fb.group({
      type: [element.quantity],
      price: [element.price],
      quantity: [null],
      itemId: this.itemId
    });
  }

  onAddRow(element?:any) {
    this.rows.push(this.createItemFormGroup(element));
  }


  addItems(){

    const items = this.rows.value.filter( item => item.quantity != null);
    //console.log(items);

    if(items.length > 0){
      this.menu.items = items;

    this.menu.count =  (this.menu.items.map(item => {
      return item.quantity > 0 && item.quantity
    })).reduce(function(acc, val) { return acc + val; }, 0);

    let orderPrice =  this.menu.items.map(element => {
      return element.quantity > 0 && (element.quantity*element.price)
    });

    this.menu.orderPrice = orderPrice.reduce(function(acc, val) { return acc + val; }, 0);

    this.submitHandlerOutput.emit(this.menu);

  }

    while (this.rows.length !== 0) {
      this.rows.removeAt(0)
    }
    this.itemId = null;
    this.modalRef.hide()
  }
 
}


