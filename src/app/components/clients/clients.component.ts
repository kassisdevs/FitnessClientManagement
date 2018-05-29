import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../interfaces/client.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients:Client[];
  totalBalance:number = 0;
  constructor(
    public clientservice: ClientsService
  ) { }

  ngOnInit() {
    this.clientservice.getClient()
    .subscribe(clients => {
      this.clients = clients
      this.clients.forEach(client =>
      this.totalBalance += Number(client.balance))
    })
  }
  
}
