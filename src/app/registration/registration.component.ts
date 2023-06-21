import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ApiUserProvider } from '../../providers/api-user/api-user';


@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  invalidName = false;
  invalidPassword = false;
  modalRef: BsModalRef;

  otp: any;
  serverOTP: any;
  userResponceId: any;
  userResponceToken: any;

  alertText: any;
  validOTP: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private modalService: BsModalService,
    private Api: ApiUserProvider) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(otp: any, error) {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {

      let datsa = this.registerForm.controls;

      let details = {
        "first_name": datsa.firstName.value,
        "last_name": datsa.lastName.value,
        "email": datsa.email.value,
        "user_role": "admin",
        "mobile": datsa.phone.value
      }
      this.signUp(otp, details, error);

      // this.router.navigate(['dashboard']);
    }
  }

  cancel() {
    this.router.navigate(['login']);
  }

  openOTP(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

  }

  confirmOTP(otp) {


    // //console.log(otp.value, "this.otp:::::", this.serverOTP);


    

    if (otp.value == this.serverOTP) {
      this.modalRef.hide();
      let datsa = this.registerForm.controls;
    sessionStorage.setItem('userMobile', datsa.phone.value);
     sessionStorage.setItem('jwt', this.userResponceToken);
     sessionStorage.setItem('userId', this.userResponceId);
      this.router.navigate(['dashboard/orderList']);
    } else {
      this.validOTP = "Please enter valid OTP"
    }

  }

  decline(): void {
    this.modalRef.hide();
  }


  signUp(otp, details, temp) {
    let datsa = this.registerForm.controls;
    this.Api.getSignUp(details)
      .subscribe(resp => {
        // //console.log(resp, "success::::::::");
        const keys = resp.headers.get('token');
        this.userResponceToken = 'Bearer ' + keys
        this.userResponceId = resp['body']['data'].id;

        this.getOTP(datsa.phone.value, otp);

      },
        (error) => {
          // //console.log('error::::::', error.message);
          this.alertText = error.message;
          this.openError(temp);
        });

  }

  getOTP(mobileNumTo, otpValue) {
    let mobileNumToURL = {
      "mobile": mobileNumTo
    }
    this.Api.getOtp(mobileNumToURL)
      .subscribe((data) => {
        // //console.log(data['data'].otp, "success");
        this.serverOTP = data['data'].otp;
        this.openOTP(otpValue);
      },
        (error) => {
          this.openError(error.message)
          // //console.log('error::::::', error.message);
        });
  }


  openError(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  gotoRegister(){
    this.router.navigate(['login']);
  }

}
