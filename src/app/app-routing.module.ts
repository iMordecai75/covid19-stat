import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegDetailComponent } from './components/reg-detail/reg-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'regione/:id', component: RegDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
