import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-annotation-form',
  templateUrl: './annotation-form.component.html',
  styleUrls: ['./annotation-form.component.scss']
})
export class AnnotationFormComponent implements OnInit {

  modelvalue: string;
  modelcontent: string;

  constructor(
    private dashboard: DashboardService,
    private auth: AuthService,
    private router: Router
  ) { }

  sendAnnotation(form: NgForm): void {
    this.dashboard.postAnnotation(form)
      .subscribe(res => { });
  }

  ngOnInit(): void {
    if (!this.auth.notExpired()) {
      this.router.navigateByUrl('login');
    }
  }

}
