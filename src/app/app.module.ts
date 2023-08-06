import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PasswordGeneratorComponent} from './password-generator/password-generator.component';
import {FormsModule} from "@angular/forms";
import {CopyClipboardDirective} from './shared/copy-clipboard.directive';
import {ToastComponent} from './shared/toast/toast.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    PasswordGeneratorComponent,
    CopyClipboardDirective,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
