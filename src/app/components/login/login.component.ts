import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  modelpassword: string;
  modelusername: string;
  showerrmsg: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  sendLogin(form: NgForm): void {
    this.auth.login(form)
      .subscribe(
        (res: AuthResponse) => {
          if (res.error) {
            this.showerrmsg = res.msg;
          } else {
            this.router.navigateByUrl('dashboard');
          }
        },
        error => {
          this.showerrmsg = error;
        }
      );
  }

  ngOnInit(): void {
    this.auth.logout();
  }

}
