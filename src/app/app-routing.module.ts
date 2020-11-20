import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from './components/charts/charts.component';
import { HomeComponent } from './components/home/home.component';
import { RegDetailComponent } from './components/reg-detail/reg-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'regione/:id', component: RegDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
