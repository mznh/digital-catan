import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainCanvasComponent} from './main-canvas/main-canvas.component'
import { DebugComponent} from './debug/debug.component'

const routes: Routes = [
  { path: '', component: MainCanvasComponent},
  { path: 'debug', component: DebugComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
