import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnotationBk } from 'src/app/models/annotation-bk';
import { ApiResponse } from 'src/app/models/api-response';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.scss']
})
export class AnnotationsComponent implements OnInit {

  annotations: AnnotationBk[];

  constructor(
    private auth: AuthService,
    private dashboard: DashboardService,
    private router: Router
  ) { }

  newAnnotation(): void {
    this.router.navigateByUrl('/dashboard/annotazione/0');
  }

  ngOnInit(): void {
    if (!this.auth.notExpired()) {
      this.router.navigateByUrl('login');
    } else {
      this.dashboard.getAnnotations()
        .subscribe((res: ApiResponse) => {
          this.annotations = res.items as AnnotationBk[];
        });
    }
  }

}
