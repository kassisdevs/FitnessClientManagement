import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string;
  password:string;
  constructor(
    private authservice : AuthService,
    public route : Router,
    public flashmessages : FlashMessagesService
  ) { }

  ngOnInit() {
  }
  onSubmit(){
    this.authservice.registerUser(this.email, this.password)
    .then(response => {
      this.flashmessages.show('You have logged in successfully!', { cssClass: 'alert alert-success', timeout: 3000 })
      this.route.navigate(['/'])
    })
    .catch(error => {
      this.flashmessages.show(error.message, { cssClass: 'alert alert-danger', timeout: 3000 })
      this.route.navigate(['register'])
    })
  }

}
