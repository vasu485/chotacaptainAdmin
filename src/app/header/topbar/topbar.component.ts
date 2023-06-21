import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Base64 } from 'js-base64';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  faSignOut = faSignOutAlt;

  @Output() menuToggle = new EventEmitter<boolean>();
  didMenu = true;

  role:any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.role = Base64.decode(sessionStorage.getItem('valid'));
  }

  slideChange() {
    sessionStorage.setItem('userMobile', '');
    sessionStorage.setItem('jwt', '');
    sessionStorage.setItem('userId', '');
    localStorage.setItem('key', '');
    this.router.navigate(['login']);
  }


}
