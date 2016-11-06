import './rxjs-extensions';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule}    from '@angular/http';

import {AppComponent} from './app.component';
import {TaskService} from './task.service';
import {FormComponent} from './form.component';

@NgModule({
  imports:      [ HttpModule, BrowserModule, FormsModule],
  declarations: [AppComponent, FormComponent],
  providers: [TaskService],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
