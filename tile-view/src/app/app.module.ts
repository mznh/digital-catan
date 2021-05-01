import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainCanvasComponent } from './main-canvas/main-canvas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugComponent } from './debug/debug.component';

@NgModule({
  declarations: [
    AppComponent,
    MainCanvasComponent,
    DebugComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
