import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SettingsService } from '../services/settings.service';



@Injectable()
export class RegisterGuard implements CanActivate {
  permitted:boolean
  constructor(
    private settingsservice : SettingsService,
    public router : Router,
  ) { }
  canActivate() : boolean {
      if(this.settingsservice.getSettings().allowRegistration){
        return true
      } else {
        this.router.navigate(['login'])
        return false
      }
  }

}
