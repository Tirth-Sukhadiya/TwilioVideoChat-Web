import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import { HomeComponent } from './home/home.component';
import { ParticipantsComponent } from './participants/participants.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SettingsComponent } from './settings/settings.component';
import { DeviceSelectComponent } from './settings/device-select.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VideoChatService } from './services/videochat.service';
import { DeviceService } from './services/device.service';
import { StorageService } from './services/storage.service';


@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    HomeComponent,
    ParticipantsComponent,
    RoomsComponent,
    SettingsComponent,
    DeviceSelectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [VideoChatService,DeviceService,StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
