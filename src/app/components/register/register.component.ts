import { Component } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { UserForm } from '../../models/user-form.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'selenium-webdriver';
interface userData {
  authtoken: string;
  username: string;
}

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public inputData = new UserForm('', '', '', '', '');
  private body: {};
  constructor(
    private toastr:ToastrService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) {
  }
  register() {
    this.body = {
      username: this.inputData.username,
      password: this.inputData.password,
      firstName: this.inputData.firstName,
      lastName: this.inputData.lastName,
      role:"common"
    }
    this.authService.register(this.body)
      .subscribe(data => {
        this.authService.login(data)
        .subscribe(succResp=>{
          this.toastr.success("Добре дошли в творческия сайт!")
         this.authService.setUserStat(succResp);
         this.router.navigateByUrl("/home")
        },
       error=>{
         this.toastr.error("Неуспешна регистрация")
       });
      }
      )
  }
}
