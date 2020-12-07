import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Annotations } from 'src/app/models/annotations';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.scss']
})
export class AnnotationsComponent implements OnInit {

  annotations: Annotations[];

  constructor(
    private auth: AuthService,
    private dashboard: DashboardService,
    private router: Router
  ) { }

  sendAnnotation(form: NgForm) {

  }

  ngOnInit(): void {
    if (!this.auth.notExpired()) {
      this.router.navigateByUrl('login');
    } else {
      this.dashboard.getAnnotations()
        .subscribe((res: Annotations[]) => {
          this.annotations = res;
        });
    }
  }

}
