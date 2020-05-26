import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestingComponent } from '../app/testing/testing.component';


const routes: Routes = [
  {
		path: '',
    redirectTo: 'test',
    pathMatch:'full'
  },
  {
    path:'test',
    component: TestingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
