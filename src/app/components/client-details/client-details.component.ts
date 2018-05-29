import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { ClientsService } from '../../services/clients.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance:boolean = false;
  editBalance:boolean = false;
  constructor(
    private clientservice : ClientsService,
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
    if (this.client.balance > 0) this.hasBalance = true
  }
  onUpdateBalance(){
    this.clientservice.updateBalance(this.id, this.client)
    this.flashmessages.show('Balance Updated!', { cssClass: 'alert alert-success', timeout: 3000 })
    this.editBalance = !this.editBalance
    this.route.navigate(['client-details/'+this.id+'/'+this.client.lastName])
  }
  onDelete(){
    this.clientservice.deleteClient(this.id)
    this.flashmessages.show('Client Deleted!', { cssClass: 'alert alert-success', timeout: 3000 })
    this.route.navigate(['/'])
  }

}
