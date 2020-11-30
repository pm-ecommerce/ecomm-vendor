import { AuthService } from './../../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiResponse } from './../../../shared/api-response';
import { Login } from './../../../entities/logininfo';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";

// import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service: AuthService, private toastr: ToastrService) {
  }

  invalidLogin = false;

  signIn(credentials: Login) {
    const login = new Login(credentials);

    const subs$ = this.service.signIn(login)
      .subscribe(
        (response) => {
          if (response) {
            // let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            // this.toastr.success('Welcome to your dashboard.');
            window.location.reload();
          } else {
            // this.toastr.error('Unable to verify your login information.');
            this.invalidLogin = true;
          }
          subs$.unsubscribe();
        }, (error: ApiResponse<any>) => {
          // this.toastr.error(error.message || 'Unable to verify your login information.');
          this.toastr.error(error.message || 'Unable to verify your login information.');
          subs$.unsubscribe();
        }
      );
  }

  ngOnInit() {
  }

}
