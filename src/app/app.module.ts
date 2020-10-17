import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppMaterial } from './app.material.module';
import { DisplayComponent } from './components/display/display.component';
import { HttpClientModule } from '@angular/common/http';
import { UserCreateComponent } from './components/user-create/user-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DisplayComponent,
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterial,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [UserCreateComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
