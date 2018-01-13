import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { UserComponent } from '../user/user.component';
import { Router } from '@angular/router';
import { itemsPerPage } from '../pagination/pagination.component';
import 'rxjs/add/operator/map';

//services
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
//models
import { User } from '../../models/user.model'


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  public users: User[];
  public size: number;
  public currentPage: number;
  public shownPages: User[];
  public noitems: boolean;
  constructor(
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }


  ngOnInit() {
    if (this.router.url == "/admin/commonusers") {
      this.listNoAdminUsers();
    } else if (this.router.url == "/admin/special") {
      this.listAdminUsers();
    }
  }

  listNoAdminUsers() {
    this.adminService.getNotAdmins()
      .subscribe(success => {
        this.users = [];
        this.shownPages = [];
        success.map(el => { this.users.push(el) })
        this.size = this.users.length;
        this.takeCurrentPage(1);
        if (this.users.length == 0) {
          this.noitems = true;
        }
      }, error => {
        console.log(error)
      })
  }

  listAdminUsers() {
    this.adminService.getAdmins()
      .subscribe(success => {
        this.users = [];
        this.shownPages = [];
        success.map(el => { this.users.push(el) })
        this.size = this.users.length;
        this.takeCurrentPage(1);
        if (this.users.length == 0) {
          this.noitems = true;
        }
      }, error => {
       this.toastr.error(error.message);
      })
  }
  refresh($event) {
    if (this.router.url == "/admin/commonusers") {
      this.listNoAdminUsers();
    } else if (this.router.url == "/admin/special") {
      this.listAdminUsers();
    }
  }


  takeCurrentPage(page) {
    this.currentPage = Number(page);
    let start = (this.currentPage * itemsPerPage) - 2;
    let end = start + itemsPerPage;
    this.shownPages = this.users.slice(start, end);
  }


}
