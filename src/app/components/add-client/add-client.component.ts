import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientsService } from '../../services/clients.service';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  isDisabledOnAdd:boolean;
  membertype:string[] = ['VIP', 'PRO', 'Regular']
  selectedPlan:string
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    membership: '',
    location: {
      address: '',
      state: '',
      zip: 75074
    },
    balance: 0
  }
  
  constructor(
    private clientservice : ClientsService,
    private settingsservice : SettingsService,
    public route : Router,
    public flashmessages : FlashMessagesService
  ) { }

  ngOnInit() {
    this.isDisabledOnAdd = this.settingsservice.getSettings().allowEditOnAdd
  }
  setPlan(plan) {
    this.selectedPlan = plan
  }
  onSubmit({valid}){
    if (this.isDisabledOnAdd) this.client.balance = 0
    if (!valid) {
       this.flashmessages.show('All fields must be completed!', { cssClass: 'alert alert-danger', timeout: 3000 })
       this.route.navigate(['add-client'])
    } else {
       this.client.membership = this.selectedPlan
       this.clientservice.postClient(this.client)
       this.flashmessages.show('New client added!', { cssClass: 'alert alert-success', timeout: 3000 })
       this.route.navigate(['/'])
    }
   }
}
