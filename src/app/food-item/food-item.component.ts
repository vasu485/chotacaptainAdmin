import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit {

  @Input() menu: any;
  @Output() valueChange = new EventEmitter();
  count: number;
  isNum: boolean;

  constructor() { }

  ngOnInit() {
  }

  valueChanged() {

    if (this.count > 0) {
      this.menu.count = this.count;
      this.menu.orderPrice = this.count * this.menu.updated_item_price;
      this.valueChange.emit(this.menu);
      this.count = null;
      this.isNum = false;
    }

  }
  onChange() {
    // //console.log( this.count > -1);
    this.isNum = this.count > 0 ? true : false;
  }

}
