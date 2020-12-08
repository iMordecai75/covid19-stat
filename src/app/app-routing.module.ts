import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnotationsComponent } from './components/annotations/annotations.component';
import { ChartsComponent } from './components/charts/charts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegDetailComponent } from './components/reg-detail/reg-detail.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'regione/:id', component: RegDetailComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'logout',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard] },
  { path: 'dashboard/:component', component: DashboardComponent, canActivate: [LoginGuard] },
  { path: 'dashboard/:component/:id', component: DashboardComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
