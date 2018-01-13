//modules
import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { inputValidate, validUsername } from '../../services/validation.service';
import { ToastrService } from 'ngx-toastr';
//models
import { UserForm } from '../../models/user-form.model'
//services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public logData = new UserForm('', '');
  public message: string;
  public valid: boolean;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {
    this.valid = validUsername;
  }

  login() {
    this.authService.login(this.logData)
      .subscribe(data => {
        this.authService.setUserStat(data);
        this.toastr.success("Здравейте, " + localStorage.username)
        this.router.navigateByUrl("/home");
      },
      err => {
        this.toastr.error("Несъществуващ потребител / грешна парола");
      })
  }
}
