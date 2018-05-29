import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  registration:boolean;
  editOnAdd:boolean;
  editOnUpdate:boolean;
  constructor(
    private settingsservice : SettingsService,
    public flashmessages : FlashMessagesService,
    public router : Router
  ) { }

  ngOnInit() {
   this.registration = this.settingsservice.getSettings().allowRegistration
   this.editOnAdd = this.settingsservice.getSettings().allowEditOnAdd
   this.editOnUpdate = this.settingsservice.getSettings().allowEditOnUpdate
  }
  onSubmit(){
  this.settingsservice.updateSettings(this.registration, this.editOnAdd, this.editOnUpdate)
  this.flashmessages.show('Settings saved!', { cssClass: 'alert alert-success', timeout: 3000 })
  this.router.navigate(['/'])
  }

}
