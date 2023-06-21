import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiUserProvider } from 'src/providers/api-user/api-user';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css'],
})
export class OthersComponent implements OnInit {
  nrdate: any;
  isIndex: number = -1;

  isLoading: boolean;

  mainMenuItems: any = [
    { name: 'Get Reports', value: 0 },
    { name: 'Change Roles', value: 1 },
    { name: 'Add Subscriber', value: 2 },
    { name: 'Group Notifications', value: 3 },
    { name: 'Taxes & Terms', value: 4 },
    { name: 'Payment Methods', value: 5 },
  ];

  paymentMethods: any = [
    { name: 'COD & ONLINE', value: 0 },
    { name: 'COD', value: 1 },
    { name: 'ONLINE', value: 2 },
  ];

  menuItems: any = [
    { name: 'Operator', value: 'operator' },
    { name: 'Editor', value: 'editor' },
    { name: 'Boy', value: 'delivery_boy' },
    { name: 'User', value: 'user' },
    { name: 'Finance', value: 'finance' },
  ];

  durations: any = [
    { name: '1 Month', value: '1' },
    { name: '2 Months', value: '2' },
    { name: '3 Months', value: '3' },
    { name: '4 Months', value: '4' },
    { name: '5 Months', value: '5' },
    { name: '6 Months', value: '6' },
    { name: '9 Months', value: '9' },
    { name: '12 Months', value: '12' },
  ];

  subscribeTypes: any = [
    { name: 'Unsubscribe', value: '0' },
    { name: 'All', value: '2' },
    { name: 'Food', value: '1' },
  ];

  formSubscribe = new FormGroup({
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    months: new FormControl('1', Validators.required),
    prime_category: new FormControl('', Validators.required),
  });

  get f() {
    return this.formSubscribe.controls;
  }

  selectUsers: any = [
    { name: 'All', value: 'all' },
    { name: 'Users', value: 'user' },
    { name: 'Vendors', value: 'vendor' },
    { name: 'Boys', value: 'delivery_boy' },
  ];

  formNotifications = new FormGroup({
    title: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    selectUser: new FormControl('', Validators.required),
  });

  formPaymentMethods = new FormGroup({
    selectPayment: new FormControl('', Validators.required),
  });


  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    status: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  formtaxes = new FormGroup({
    tax: new FormControl('2.6%', [Validators.required]),
    gstTax: new FormControl('5%', [Validators.required]),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(private Api: ApiUserProvider) { }

  get firstname() {
    return this.form.get('firstName');
  }
  ngOnInit() {


  }


  clickHandler(index) {
    if (index == 4) {
      this.getTaxesFn();
    } else if (index == 5) {
      this.getPaymentsFn();
    }
  }

  onSubmitFormSubscribe() {
    //console.log(this.form.value);
    this.isLoading = true;
    let details = {
      mobile: this.formSubscribe.value.mobile,
      months: this.formSubscribe.value.months,
      prime_category: this.formSubscribe.value.prime_category,
    };
    this.Api.addPrimecustomerFn(details).subscribe((data) => {
      this.formSubscribe.reset();
      this.formSubscribe.controls.months.setValue('1');
      this.isLoading = false;
      alert(data.message);
    }),
      (error) => {
        this.isLoading = false;
        alert(error.message);
      };
  }

  onSubmitformNotifications() {
    //console.log(this.form.value);
    this.isLoading = true;
    let details = {
      title: this.formNotifications.value.title,
      message: this.formNotifications.value.message,
      selectUsers: this.formNotifications.value.selectUser,
    };

    this.Api.pushGroupFCMNotificationsFn(details).subscribe((data) => {
      this.formNotifications.reset();
      this.isLoading = false;

      alert(data.message);
    }),
      (error) => {
        this.isLoading = false;
        alert(error.message);
      };
  }


  onSubmitformPaymentMethods() {
    //console.log(this.form.value);
    this.isLoading = true;
    let details = {
      paymentMode: this.formPaymentMethods.value.selectPayment,
    };

    this.Api.updatePaymentMethods(details).subscribe((data) => {
      // this.formPaymentMethods.reset();
      this.isLoading = false;

      alert(data.message);
    }),
      (error) => {
        this.isLoading = false;
        alert(error.message);
      };
  }

  getPaymentsFn() {
    this.Api.getPaymentMethods().subscribe((data) => {
      this.isLoading = false;
      if (data) {
        let values = data.data;
        this.formPaymentMethods.controls.selectPayment.setValue(values.paymentMode);
      }
    }),
      (error) => {
        this.isLoading = false;
        alert(error.message);
      };
  }

  onSubmit() {
    //console.log(this.form.value);
    this.checkUserExistedOrNot();
  }

  checkUserExistedOrNot() {
    this.isLoading = true;
    let details = { mobile: this.form.value.firstName };

    this.Api.checkUserExistedOrNotFn(details).subscribe((data) => {
      //console.log("Details Updated.....", data.status);
      this.isLoading = false;
      if (data.data) {
        this.changeRole(data.data);
      } else {
        // alert(data.message+' Please fill the details..');
        this.isLoading = false;
        this.signupFn();
      }
    }),
      (error) => {
        alert(error.message + 'xnxnxnxnxn');
      };
  }

  changeRole(data) {
    //console.log(this.form.value);
    let details = {
      id: data.id,
      user_role: this.form.value.role,
      is_active: this.form.value.status,
      email: this.form.value.email,
    };
    this.Api.changeRole(details).subscribe((data) => {
      this.form.reset();
      alert(data.message);
    }),
      (error) => {
        alert(error.message);
      };
  }

  signupFn() {
    //console.log(this.form.value);

    let details = {
      first_name: this.form.value.role,
      last_name: 'Guest',
      user_role: this.form.value.role,
      mobile: this.form.value.firstName,
      email: this.form.value.email,
      privilege: 'write',
    };

    this.Api.signupFn(details).subscribe((data) => {
      // //console.log("Details Updated.....", data);

      this.form.reset();
      alert(data.message);
    }),
      (error) => {
        alert(error.message);
      };
  }

  getReportsFn(nrdate) {
    //console.log(nrdate, "nrdate")
    // window.open('http://159.89.171.183/api/v1/getTodayTotalReport/2021-07-03');
    this.Api.getReportsFn(nrdate);
  }

  onSubmitformtaxes() {
    //console.log(this.form.value);
    this.isLoading = true;
    let details = {
      id: 1,
      tax: 0 + '%',
      gstTax: this.formtaxes.value.gstTax + '%',
      heading: this.formtaxes.value.title,
      content: this.formtaxes.value.description,
    };

    this.Api.taxesFn(details).subscribe((data) => {
      // this.formtaxes.reset();
      this.isLoading = false;

      alert(data.message);
    }),
      (error) => {
        this.isLoading = false;
        alert(error.message);
      };
  }

  getTaxesFn() {
    this.Api.getTaxesFn().subscribe((data) => {
      this.isLoading = false;
      if (data) {
        let values = data.data;
        // this.formtaxes.controls.tax.setValue(values.tax.replace(/%/g, ''));
        this.formtaxes.controls.gstTax.setValue(values.gstTax.replace(/%/g, ''));
        this.formtaxes.controls.title.setValue(values.heading);
        this.formtaxes.controls.description.setValue(values.content);
      }
    }),
      (error) => {
        this.isLoading = false;
        alert(error.message);
      };
  }
}
