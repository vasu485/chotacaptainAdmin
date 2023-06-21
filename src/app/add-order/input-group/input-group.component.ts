import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.css'],
})
export class InputGroupComponent implements OnInit {
  @Output() countChange = new EventEmitter();
  @Input() numberCount: any;

  

  count: number;
  isNum: boolean;


  constructor() {}

  ngOnInit() {}

 

  // valueChanged() {
  //   this.countChange.emit(this.count);
  //   this.count = null;
  // }



  onChange() {
    this.countChange.emit(this.numberCount);
    this.isNum = this.count > 0 ? true : false;
  }

}
