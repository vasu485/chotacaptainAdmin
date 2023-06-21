import { EventEmitter, Output, Input } from '@angular/core';
import { OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'price-quantity',
  templateUrl: './price-quantity.component.html',
  styleUrls: ['./price-quantity.component.css'],
})
export class PriceQuantityComponent implements OnInit {
  addForm: FormGroup;
  rows: FormArray;
  itemForm: FormGroup;

  @Input() itemPrices: any;
  @Output() notify = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
    });
    this.rows = this.fb.array([]);
  }

  ngOnInit() {
    this.addForm.addControl('rows', this.rows);

    //console.log(this.itemPrices?.length, "length")
    if (this.itemPrices) {
      this.itemPrices.forEach((element, index) => {
        this.onAddRow(element);
      });
    } else {
      this.onAddRow({quantity:null, price: null});
    }
  }

  onAddRow(element?:any) {
    this.rows.push(this.createItemFormGroup(element || {quantity:null, price: null}));
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(element?:any): FormGroup {
    return this.fb.group({
      quantity: [element.quantity, Validators.required],
      price: [element.updated_item_price, Validators.required],
    });
  }

  isDisabled() {
    this.notify.emit(this.rows.value);
    return this.rows.status == 'VALID' ? false : true;
  }
}
