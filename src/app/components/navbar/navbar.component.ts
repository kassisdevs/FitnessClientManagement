import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean;
  registerAllowed:boolean;
  userEmail:string;
  constructor(
    private authservice : AuthService,
    private settingsservice : SettingsService,
    public router : Router,
    public flashmessages : FlashMessagesService
  ) { }

  ngOnInit() {
    this.authservice.checkStatus()
    .subscribe(status => {
      if (status && status.uid) {
        this.isLoggedIn = true
        this.userEmail = status.email
      } else {
        this.isLoggedIn = false
      }
    })
    this.registerAllowed = this.settingsservice.getSettings().allowRegistration
  }
  logOut(){
    this.authservice.logOut()
    this.flashmessages.show('you have logged out successfully!', { cssClass: 'alert alert-success', timeout: 3000 })
    this.router.navigate(['login'])
  }

}
