import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainCanvasComponent} from './main-canvas/main-canvas.component'

const routes: Routes = [
  { path: '', component: MainCanvasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
