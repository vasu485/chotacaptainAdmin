import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminapnachotu';
  constructor() {
    const config = {
      apiKey: "AIzaSyDbCK6eY-9JFRqaztzjcH11W53sLffBsAU",
      authDomain: "apnachotuuser.firebaseapp.com",
      projectId: "apnachotuuser",
      storageBucket: "apnachotuuser.appspot.com",
      messagingSenderId: "70027341330",
      appId: "1:70027341330:web:ad71bd6f6e9f740730b2cb",
      measurementId: "G-02BZBED8NT"
    };
   
  }
}
