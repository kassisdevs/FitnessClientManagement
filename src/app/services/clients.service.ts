import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Client } from '../interfaces/client.interface';
import { Observable } from 'rxjs';

@Injectable()
export class ClientsService {
  clients: FirebaseListObservable<any[]>
  client: FirebaseObjectObservable<any>
  
  constructor(
    public db : AngularFireDatabase
  ) {
    this.clients = this.db.list('/clients/clients') as FirebaseListObservable<Client[]>
   }

   getClient(){
     return this.clients
   }
   postClient(client: Client){
     this.clients.push(client)
   }
   getClientDetails(id:string){
     this.client = this.db.object('/clients/clients/'+id) as FirebaseObjectObservable<Client>
     return this.client
   }
   updateBalance(id:string, client:Client) {
     this.clients.update(id, client)
   }
   deleteClient(id:string){
     this.clients.remove(id)
   }
   updateClient(id:string, client:Client) {
     this.clients.update(id, client)
   }

}
