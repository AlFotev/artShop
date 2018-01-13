import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input("userData") userdata: User;
  @Output() updateEvent = new EventEmitter<boolean>();
  public id: string;
  public adminOrNot: string;
  public username: string;
  public firstName: string;
  public lastName: string;
  public role: string;
  public admin: boolean;
  public updated: boolean;
  constructor(private authService: AuthService,
    private adminService: AdminService,
    private toastr: ToastrService) {
    this.updated = false;
  }

  ngOnInit() {
    this.id = this.userdata["_id"];
    this.username = this.userdata.username;
    this.firstName = this.userdata.firstName;
    this.lastName = this.userdata.lastName;
    this.role = this.userdata.role;
    if (this.role == "admin") {
      this.adminOrNot = "Отнеми администраторските права";
      this.admin = true;
    } else {
      this.adminOrNot = "Направи администратор";
      this.admin = false;
    }
  }

  promoteOrRevoke() {
    let id = this.id
    if (!this.admin) {
      console.log("hahah")
      this.adminService.assignAdmin(id)
        .subscribe(success => {
          this.adminService.updateUser("promote", id, this.username, this.firstName, this.lastName)
            .subscribe(yes => {
              this.toastr.success(`Потребител ${this.username} вече е администратор`)
              if (this.updated) {
                this.updated = false;
                this.updateEvent.emit(this.updated);
                return;
              } else {
                this.updated = true;
                this.updateEvent.emit(this.updated);
                return;
              }
            })
        }, error => {
          this.toastr.error("Възникна грешка в процеса");
        })

    } else {
      this.adminService.revokeAdmin(id)
        .subscribe(success => {
          this.adminService.updateUser("revoke", id, this.username, this.firstName, this.lastName)
            .subscribe(yes => {
              this.toastr.success(`Потребител ${this.username} повече не е администратор`);
              if (this.updated) {
                this.updated = false;
                this.updateEvent.emit(this.updated);
                return;
              } else {
                this.updated = true;
                this.updateEvent.emit(this.updated);
                return;
              }
            })
        }, error => {
          this.toastr.error("Възникна грешка в процеса");
        })
    }
  }

  deleteUser(){
      let id = this.id;
      this.adminService.deleteUser(id)
      .subscribe(success=>{
        this.toastr.success(`Потребител ${this.username} успешно изтрит!`)
        if (this.updated) {
          this.updated = false;
          this.updateEvent.emit(this.updated);
          return;
        } else {
          this.updated = true;
          this.updateEvent.emit(this.updated);
          return;
        }
      },err=>{
        this.toastr.error(`Потребител ${this.username} не беше изтрит!`)
      })
  }

}
