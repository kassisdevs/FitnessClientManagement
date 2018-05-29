import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// Angular Fire
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
// App Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
// App Services
import { ClientsService } from './services/clients.service';
import { AuthService } from './services/auth.service';
import { SettingsService } from './services/settings.service';
// App Guard
import { Authguard } from './guards/authguard.service';
import { RegisterGuard } from './guards/register.service';

export const firebaseConfig = {
    apiKey: "AIzaSyAdRXNLMlsblSFLc7wX2y5Z4lF81fQ6ETg",
    authDomain: "fitnesspanel-e2fb3.firebaseapp.com",
    databaseURL: "https://fitnesspanel-e2fb3.firebaseio.com",
    projectId: "fitnesspanel-e2fb3",
    storageBucket: "fitnesspanel-e2fb3.appspot.com",
    messagingSenderId: "548064190243"
}
const appRoute : Routes = [
  { path:"", component:DashboardComponent, canActivate:[Authguard] },
  { path:"login", component:LoginComponent },
  { path:"register", component:RegisterComponent, canActivate:[RegisterGuard] },
  { path:"add-client", component:AddClientComponent,  canActivate:[Authguard] },
  { path:"client-details/:id/:lastName", component:ClientDetailsComponent,  canActivate:[Authguard] },
  { path:"edit-client/:id", component:EditClientComponent,  canActivate:[Authguard] },
  { path:"settings", component:SettingsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    PageNotFoundComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    FlashMessagesModule,
    NoopAnimationsModule
  ],
  providers: [
    AngularFireDatabase,
    AngularFireAuth,
    ClientsService,
    AuthService,
    Authguard,
    SettingsService,
    RegisterGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
