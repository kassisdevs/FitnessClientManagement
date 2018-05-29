import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { ClientsService } from '../../services/clients.service';
import { SettingsService } from '../../services/settings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  isDisabledOnEdit: boolean;
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
    private settingsservise : SettingsService,
    public route : Router,
    public router : ActivatedRoute,
    public flashmessages : FlashMessagesService
  ) { }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.id = params.get('id')
      this.clientservice.getClientDetails(this.id)
      .subscribe(client => this.client = client)
    })
    this.clientservice.getClientDetails(this.id)
    .subscribe(clientDetails => this.client = clientDetails)
    this.isDisabledOnEdit = this.settingsservise.getSettings().allowEditOnUpdate
  }
  setPlan(plan) {
    this.selectedPlan = plan
  }
  onSubmit({valid}){
    if (!valid) {
       this.flashmessages.show('All fields must be completed!', { cssClass: 'alert alert-danger', timeout: 3000 })
       this.route.navigate(['client-detail/'+this.id])
    } else {
       this.client.membership = this.selectedPlan
       this.clientservice.updateClient(this.id, this.client)
       this.flashmessages.show('Client updated!', { cssClass: 'alert alert-success', timeout: 3000 })
       this.route.navigate(['/'])
    }
   }

}
