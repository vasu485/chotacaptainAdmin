import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiUserProvider } from '../../providers/api-user/api-user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Base64 } from 'js-base64';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  modalRef: BsModalRef;
  registerForm: FormGroup;
  registerOTPForm: FormGroup;
  submitted = false;
  invalidName = false;
  invalidPassword = false;
  isOTPScreen = false;
  alertText: any;
  OTPNumber: any;
  invalidPasswordText: any;

  userResponceId: any;
  userResponceToken: any;
  role: any;

  isLoading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private Api: ApiUserProvider,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]\d*$/),
        ],
      ],
    });

    this.registerOTPForm = this.formBuilder.group({
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  get h() {
    return this.registerOTPForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.invalidName = false;
    this.isLoading = true;

    let userDetails = this.registerForm.controls;
    // stop here if form is invalid
    let mobile = {
      mobile: userDetails.firstName.value,
    };

    if (this.registerForm.invalid) {
      this.isLoading = false;
      return;
    } else {
      this.checkUserExistedOrNot(userDetails.firstName.value);
      // this.goLogin(mobile);
    }
  }

  onSubmitOTP() {
    this.submitted = true;
    this.invalidName = false;
    this.invalidPassword = false;
    this.invalidPasswordText = '';
    let userDetails = this.registerOTPForm.controls;
    // stop here if form is invalid

    // // //console.log('userDetails.password.value', userDetails.password.value);
    // // //console.log(this.OTPNumber, "this.OTPNumber::::")

    localStorage.setItem('key', '');

    if (this.registerOTPForm.invalid) {
      // //console.log('invalid::::');
      return;
    } else {
      if (this.OTPNumber == userDetails.password.value) {
        // //console.log('goooooooooooo');
        let userDetails = this.registerForm.controls;
        sessionStorage.setItem('userMobile', userDetails.firstName.value);
        sessionStorage.setItem('userName', Base64.encode(this.role));

        sessionStorage.setItem('jwt', this.userResponceToken);
        sessionStorage.setItem('userId', this.userResponceId);

        sessionStorage.setItem('valid', Base64.encode(this.role));

        if (this.role === 'EDITOR') {
          this.router.navigate(['dashboard/addvendor']);
        } else if (this.role === 'FINANCE') {
          this.router.navigate(['dashboard/settlement']);
        } else {
          this.router.navigate(['dashboard/orderList']);
        }
      } else {
        // //console.log('invalid')
        this.invalidPassword = true;
        this.invalidPasswordText = 'Please Enter Valid OTP';
      }
    }
  }

  checkUserExistedOrNot(mobile) {
    let mobileNumber = { mobile: mobile };
    this.Api.checkUserExistedOrNotFn(mobileNumber).subscribe((data) => {
      //console.log("Details Updated.....", data);
      let details = data?.data;
      if (
        (details?.is_active == 1 &&
          (details?.existed_user_role == 'ADMIN' ||
            details?.existed_user_role == 'EDITOR')) ||
        details?.existed_user_role == 'OPERATOR' ||
        details?.existed_user_role == 'FINANCE'||
        details?.existed_user_role == 'partner'
      ) {
        this.goLogin(mobileNumber);
      } else {
        this.isLoading = false;
        alert('Your not not authorized to login. Please contact to ADMIN');
      }
    }),
      (error) => {
        this.isLoading = false;
        alert(error.message + 'xnxnxnxnxn');
      };
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  gotoRegister() {
    this.router.navigate(['registration']);
  }

  goLogin(login) {
    this.alertText = '';
    this.Api.getLogin(login).subscribe(
      (data) => {
        if (
          data.body.status == 'success' &&
          (data.body.data.user_role == 'ADMIN' ||
            data.body.data.user_role == 'EDITOR' ||
            data.body.data.user_role === 'OPERATOR' ||
            data.body.data.user_role === 'partner' ||
            data.body.data.user_role === 'FINANCE')
        ) {
          const keys = data.headers.get('token');
          this.userResponceToken = 'Bearer ' + keys;
          this.userResponceId = data.body.data.id;
          localStorage.setItem('lid',data.body.data.locationid)
          this.getOTP(data.body.data.mobile);
          this.role = data.body.data.user_role;
        } else {
          this.submitted = true;
          this.alertText = 'Your not authorized to Login!';
        }
      },
      (error) => {
        this.submitted = true;
        this.alertText = error.message;
      }
    );
  }

  // getOTP(mobileNumTo) {
  //   let mobileNumToURL = {
  //     "mobile": mobileNumTo
  //   }
  //   this.Api.getOtp(mobileNumToURL)
  //     .subscribe((data) => {
  //       // //console.log(data['data'].otp, "success");
  //       this.OTPNumber = data['data'].otp;
  //       this.isOTPScreen = true;
  //       this.submitted = false;
  //       let set = Number(this.OTPNumber) - 2012 - 18;
  //       localStorage.setItem("key", set.toString());
  //     },
  //       (error) => {
  //         // //console.log('error::::::', error.message);
  //         this.alertText = error.message;

  //       });
  // }

  getOTP(mobileNumTo) {
    let mobileNumToURL = {
      mobile: mobileNumTo,
    };
    this.Api.encriptOTPFn(mobileNumToURL).subscribe(
      (data) => {
        this.isLoading = false;

        this.OTPNumber = Base64.decode(data['data'].otp);
        //console.log(this.OTPNumber)
        this.isOTPScreen = true;
        this.submitted = false;
        let set = Number(this.OTPNumber) - 2012 - 18;
        localStorage.setItem('key', set.toString());
      },
      (error) => {
        this.isLoading = false;

        this.alertText = error.message;
      }
    );
  }

  encriptOTPFn;
}
