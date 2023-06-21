import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'boy-name',
  templateUrl: './boy-name.component.html',
  styleUrls: ['./boy-name.component.css']
})
export class BoyNameComponent implements OnInit {
  @Input() boy: any;
  @Output() valueChange = new EventEmitter();

  @Output() editBoy = new EventEmitter();
  isOpen:boolean;


  constructor() { }

  ngOnInit() {
  }

  isActive() {
    this.boy.is_active = this.boy.is_active == 1 ? 0 : 1;
    this.valueChange.emit(this.boy);
  }

  Edit(boy){
    this.editBoy.emit(boy);
  }

}
