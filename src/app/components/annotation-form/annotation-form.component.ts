import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnotationBk } from 'src/app/models/annotation-bk';
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
  modelid: number;

  constructor(
    private dashboard: DashboardService,
    private auth: AuthService,
    private active: ActivatedRoute,
    private router: Router
  ) { }

  sendAnnotation(form: NgForm, close: boolean): void {
    if (form.value.Annotation_iId === 0) {
      this.dashboard.postAnnotation(form)
        .subscribe(res => {
          if (res.status === 'OK') {
            if (close) {
              this.router.navigateByUrl('/dashboard/annotazioni');
            } else {
              const item: AnnotationBk = res.item as AnnotationBk;
              this.bind(item);
            }
          }
        });
    } else {
      this.dashboard.putAnnotation(form)
        .subscribe(res => {
          if (res.status === 'OK') {
            if (close) {
              this.router.navigateByUrl('/dashboard/annotazioni');
            } else {
              const item: AnnotationBk = res.item as AnnotationBk;
              this.bind(item);
            }
          }
        });
    }
  }

  getAnnotation(id: number): void {
    this.dashboard.getAnnotation(id)
      .subscribe(res => {
        console.log(res);
        const item = res.item as AnnotationBk;
        this.bind(item);
      });
  }

  ngOnInit(): void {
    if (!this.auth.notExpired()) {
      this.router.navigateByUrl('login');
    } else {
      const id: number = parseInt(this.active.snapshot.paramMap.get('id'), 10);
      console.log('id', id);
      if (id > 0) {
        this.getAnnotation(id);
      }
    }
  }

  private bind(item: AnnotationBk): void {
    this.modelid = item.Annotation_iId;
    this.modelvalue = item.Annotation_sValue;
    this.modelcontent = item.Annotation_sContent;
  }

}
