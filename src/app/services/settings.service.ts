import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/settings.interface';
@Injectable()
export class SettingsService {
  settings:Settings = {
    allowRegistration: true,
    allowEditOnAdd: true,
    allowEditOnUpdate: true
  }

  constructor() { }
  getSettings(){
    return this.settings
  }
  updateSettings(register, add, update) {
    this.settings.allowRegistration = register
    this.settings.allowEditOnAdd = add
    this.settings.allowEditOnUpdate = update
  }
}
